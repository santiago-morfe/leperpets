import { useState, useContext } from 'react'
// import { useParams } from 'react-router-dom'
// import { PetsContext } from '../../../../contexts/PetsContext'
// import { InputWord } from './components/InputWord'

// juego de palabras para adivinar la palabra
// en cada intento cuales de las letras de la entrada pertenesen a la palabra y cuales estan en la posision corecta
// si la palabra es adivinada se gana el juego
// si se agotan los intentos se pierde el juego
// la palabra es siempre de 5 letras

const WordGuess = () => {
    const [playStart, setplayStart] = useState(false)
    const [win, setWin] = useState(false)
    const [message, setMessage] = useState('')
    const [word, setWord] = useState(['a', 'p', 'p', 'l', 'e'])
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
    }

    const handleChange = (e, index) => {
        const newLastImputsWord = [...lastImputsWord]
        newLastImputsWord[index].value = e.target.value
        setLastImputsWord(newLastImputsWord)
    }

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
            {playStart &&
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
        </>
    )
}

export default WordGuess