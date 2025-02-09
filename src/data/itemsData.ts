interface ItemData {
    [key: number]: {
        id: number
        name: string
        description: string
        price: number
        baseValue: number
    }
}

const ITEMS_DATA: ItemData = [
    {
        "id": 1,
        "name": "lubricante",
        "description": "Lubricante de alta calidad",
        "price": 50,
        "baseValue": 15
    },
    {
        "id": 2,
        "name": "Filete de carne",
        "description": "Filete de carne de res",
        "price": 100,
        "baseValue": 30
    },
    {
        "id": 3,
        "name": "Chatarra espacial",
        "description": "Chatarra espacial",
        "price": 10,
        "baseValue": 5
    },
    {
        "id": 4,
        "name": "Croquetas",
        "description": "Croquetas para mascotas",
        "price": 20,
        "baseValue": 10
    },
    {
        "id": 5,
        "name": "Pez dorado",
        "description": "Pez dorado",
        "price": 5,
        "baseValue": 1
    },
    {
        "id": 6,
        "name": "Baca",
        "description": "Baca de gorda",
        "price": 30,
        "baseValue": 10
    },
    {
        "id": 7,
        "name": "pocion",
        "description": "pocion para resusitar",
        "price": 100,
        "baseValue": 0
    }

]

export default ITEMS_DATA;