import { useState, useEffect, useContext } from 'react'
import WORDS_DATA from './wordsData'

const WordGuess = ({ setFinished, setStart, setReward }) => {
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
        setWord(WORDS_DATA[Math.floor(Math.random() * WORDS_DATA.length)].split(''))
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
            setReward(Reward/attemp)
        } else {
            setMessage('Try again')
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
                <div>
                    <h1>Word Guess</h1>
                    <p>Press start to play</p>
                    <button onClick={handlePlay}>Start</button>
                </div>
            }
            {(playStart) &&
                <div>
                    <h1>Word Guess</h1>
                    <p>Guess the word</p>
                    <p>Attemp: {attemp}</p>
                    {
                        inputsWord.map((item, index) => (
                            <div key={index}>
                                {item.map((input, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={input.value}
                                        disabled
                                        style={{
                                            backgroundColor: input.inPosition ? 'green' : input.inWord ? 'yellow' : 'red'
                                        }}
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
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDownCapture={handleKeyPress}
                                        maxLength="1"
                                    />
                                ))}
                            </div>
                            <p>{message}</p>
                            <button onClick={handleEnter}>Enter</button>
                        </>
                    }
                </div>
            }
            {win &&
                <div>
                    <p>Win</p>
                    <p>palabra: {word}</p>
                    <button onClick={() => setFinished(true)}>Finish</button>
                </div>
            }
        </>
    )
}

export default WordGuess