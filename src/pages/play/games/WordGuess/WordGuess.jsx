import { useState, useEffect,  useContext } from 'react'
import WORDS_DATA from './wordsData'

const WordGuess = ({ setFinished, setStart}) => {
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
        newLastImputsWord[index].value = e.target.value
        setLastImputsWord(newLastImputsWord)
    }

    useEffect(() => {
        setWord(WORDS_DATA[Math.floor(Math.random() * WORDS_DATA.length)].split(''))
    }, [])

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
            {(playStart && !win) &&
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
                        <div>
                            <input type="text" value={lastImputsWord[0].value} onChange={(e) => handleChange(e, 0)} />
                            <input type="text" value={lastImputsWord[1].value} onChange={(e) => handleChange(e, 1)} />
                            <input type="text" value={lastImputsWord[2].value} onChange={(e) => handleChange(e, 2)} />
                            <input type="text" value={lastImputsWord[3].value} onChange={(e) => handleChange(e, 3)} />
                            <input type="text" value={lastImputsWord[4].value} onChange={(e) => handleChange(e, 4)} />
                        </div>
                    }

                    <p>{message}</p>
                    <button onClick={handleEnter}>Enter</button>
                </div>
            }
            {(!playStart && !win) &&
                <div>
                    <h1>Word Guess</h1>
                    <p>Press start to play</p>
                    <button onClick={handlePlay}>Start</button>
                </div>
            }
            {win &&
                <div>
                    <h1>Word Guess</h1>
                    <p>Win</p>
                    <button onClick={() => setFinished(true)}>Finish</button>
                </div>
            }
        </>
    )
}

export default WordGuess