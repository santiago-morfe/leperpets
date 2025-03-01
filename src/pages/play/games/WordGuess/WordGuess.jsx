import { useState, useEffect } from 'react'
import WORDS_DATA from './wordsData'
import styles from './WordGuess.module.css'

const WordGuess = ({ setFinished, setStart, setReward, handleSurrender }) => {
    const Reward = 400
    const [playStart, setplayStart] = useState(false)
    const [win, setWin] = useState(false)
    const [message, setMessage] = useState('')
    const [word, setWord] = useState([])
    const [attemp, setAttem] = useState(1)
    const [inputsWord, setInputsWord] = useState([])
    const [lastImputsWord, setLastImputsWord] = useState([
        { value: '', inWord: false, inPosition: false },
        { value: '', inWord: false, inPosition: false },
        { value: '', inWord: false, inPosition: false },
        { value: '', inWord: false, inPosition: false },
        { value: '', inWord: false, inPosition: false },
    ])

    const handlePlay = () => {
        setplayStart(true)
        setStart(true)
    }

    const handleChange = (e, index) => {
        const newLastImputsWord = [...lastImputsWord]
        // verificar que sea una letra (solo se pueden ingresar letras) o estar vacio
        if (!e.target.value.match(/[a-zA-Z]/) && e.target.value) {
            return
        }
        // si es minuscula camviar a mayuscula
        if (e.target.value.match(/[a-z]/)) {
            e.target.value = e.target.value.toUpperCase()
        }
        newLastImputsWord[index].value = e.target.value.slice(0, 1) // Solo permite una letra
        setLastImputsWord(newLastImputsWord)

        // Mueve el foco al siguiente input automáticamente
        if (e.target.value && index < lastImputsWord.length - 1) {
            document.getElementById(`input-${index + 1}`).focus()
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEnter()
        }
        // si presiona las tecas de flecha izquierda o derecha
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault()
            const index = Number(e.target.id.split('-')[1])
            if (e.key === 'ArrowLeft' && index > 0) {
                document.getElementById(`input-${index - 1}`).focus()
            } else if (e.key === 'ArrowRight' && index < lastImputsWord.length - 1) {
                document.getElementById(`input-${index + 1}`).focus()
            }
        }
    }

    useEffect(() => {
        const newWord = WORDS_DATA[Math.floor(Math.random() * WORDS_DATA.length)].split('')
        // comvertir a mayuscula
        setWord(newWord.map(letter => letter.toUpperCase()))
    }, [])

    useEffect(() => {
        if (playStart && !win) {
            document.getElementById('input-0').focus()
        }
    }, [playStart, win, attemp])

    // funcion para verificar si la palabra fue adivinada
    const checkWin = () => {
        if (lastImputsWord.every((input, index) => input.value === word[index])) {
            return true
        } else {
            return false
        }
    }

    const handleEnter = () => {
        if (lastImputsWord.some(input => !input.value)) {
            setMessage('Complete la palabra')
            return
        }
        setAttem(attemp + 1)
        const newInputsWord = lastImputsWord.map((input, index) => {
            if (word.includes(input.value) && word[index] === input.value) {
                return {
                    ...input,
                    inPosition: true
                }
            } else if (word.includes(input.value)) {
                return {
                    ...input,
                    inWord: true,
                }
            } else {
                return {
                    ...input
                }
            }
        })
        // agregar el nuevo intento a la lista de intentos
        setInputsWord([...inputsWord, newInputsWord])
        if (checkWin()) {
            setWin(true)
            setReward(Reward / attemp)
        } else {
            setMessage('sigue intentando')
        }
        setLastImputsWord([
            { value: '', inWord: false, inPosition: false },
            { value: '', inWord: false, inPosition: false },
            { value: '', inWord: false, inPosition: false },
            { value: '', inWord: false, inPosition: false },
            { value: '', inWord: false, inPosition: false },
        ])
    }

    return (
        <>
            {(!playStart && !win) &&
                <div className={styles.container}>
                    <h1>Word Guess</h1>
                    <p>Presiona Start para comenzar</p>
                    <button onClick={handlePlay}>Start</button>
                </div>
            }
            {(playStart) &&
                <div className={styles.container}>
                    <h1>Word Guess</h1>
                    <p> Advinar la palabra</p>
                    <p>intentos: {attemp}</p>
                    {
                        inputsWord.map((item, index) => (
                            <div key={index}>
                                {item.map((input, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={input.value}
                                        disabled
                                        className={input.inPosition ? styles.inPosition : input.inWord ? styles.inWord : styles.notInWord}
                                    />
                                ))}
                            </div>
                        ))
                    }
                    {!win &&
                        <>
                            <div>
                                {lastImputsWord.map((input, index) => (
                                    <input
                                        key={index}
                                        id={`input-${index}`}
                                        type="text"
                                        value={input.value}
                                        pattern="[a-zA-Z]"
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDownCapture={handleKeyPress}
                                        maxLength="1"
                                    />
                                ))}
                            </div>
                            <p>{message}</p>
                            <button onClick={handleEnter}>Enter</button>
                            <button onClick={handleSurrender}>rendirse</button>

                        </>
                    }
                    {win &&
                        <div>
                            <p>ganaste</p>
                            <p>palabra: {word}</p>
                            <button onClick={() => setFinished(true)}>teminar</button>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default WordGuess