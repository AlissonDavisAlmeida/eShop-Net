export interface CartItem {
    productID: number
    name: string
    price: number
    pictureURL: string
    brand: string
    type: string
    quantity: number
}

export interface Cart {
    id: number
    buyerID: string
    items: CartItem[]
}