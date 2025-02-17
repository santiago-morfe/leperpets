interface GameMetadata {    
    [key: string]: {
        title: string
        description: string
        difficulty: string
        energyCost: number
        tags: Array<string>
    }
}

const GAME_METADATA: GameMetadata = {
    "GameTest": {
        "title": "Game Test",
        "description": "A simple test game",
        "difficulty": "Easy",
        "energyCost": 20,
        "tags": ["test", "game"]
    },
    "WordGuess": {
        "title": "Word Guess",
        "description": "A simple word guessing game",
        "difficulty": "Easy",
        "energyCost": 20,
        "tags": ["word", "guessing", "game"]
    }
}

export default GAME_METADATA