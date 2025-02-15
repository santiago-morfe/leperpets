import GAME_METADATA from '../../../data/gameMetadata.ts'
import { useState,useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const GamesList = () => {
    const [ isVisible, setIsVisible ] = useState(false)
    const gameListRef = useRef(null)
    const { petId } = useParams()

    const handleClick = (e) => {
        if (gameListRef.current && !gameListRef.current.contains(e.target)) {
            setIsVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <div ref={gameListRef}>
            <button onClick={() => setIsVisible(!isVisible)}>jugar</button>
            {isVisible && (
                <ul>
                    {Object.keys(GAME_METADATA).map((gameId) => (
                        <li key={gameId}>
                            <Link to={`/play/${petId}/${gameId}`}>{GAME_METADATA[gameId].title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default GamesList