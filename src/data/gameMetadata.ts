interface GameMetadata {    
    [key: string]: {
        title: string
        description: string
        difficulty: string
        energy: number
        tags: Array<string>
    }
}

const GAME_METADATA: GameMetadata = {
    "GameTest": {
        "title": "Game Test",
        "description": "A simple test game",
        "difficulty": "Easy",
        "energy": 5,
        "tags": ["test", "game"]
    },
    "WordGuess": {
        "title": "Word Guess",
        "description": "A simple word guessing game",
        "difficulty": "Easy",
        "energy": 5,
        "tags": ["word", "guessing", "game"]
    }
}

export default GAME_METADATA;