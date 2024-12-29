import { useState } from 'react';

export const InputWord = () => {
    const [inputWord, setInputWord] = useState([]);

    const handleChange = (e) => {
        setInputWord(e.target.value);
    }

    const handleEnter = () => {
        onEnter(inputWord);
    }

    return (
        <form action="">
            <input type="text" onChange={handleChange} value={inputWord} />
            <button type="button" onClick={handleEnter}>Enter</button>
        </form>
    )
}