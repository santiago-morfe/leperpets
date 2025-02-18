interface Pet {
  id: number
  type: string
  family: string
  compatibility: Compatibility
}

interface Compatibility {
  [key: string]: number
}

const PETS_DATA: Array<Pet> = [
  {
    "id": 1,
    "type": "perro",
    "family": "animales",
    "compatibility": {
      "filete de carne": 1,
      "croquetas": 2
    }
  },
  {
    "id": 2,
    "type": "gato",
    "family": "animales",
    "compatibility": {
      "filete de carne": 3,
      "pez dorado": 2,
      "croquetas": 1
    }
  },
  {
    "id": 3,
    "type": "pterodáctilo",
    "family": "dinosaurios",
    "compatibility": {
      "filete de carne": 2,
      "pez dorado": 1,
      "baca": 3
    }
  }
]

export default PETS_DATA;