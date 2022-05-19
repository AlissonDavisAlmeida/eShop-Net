import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Cart } from "../../interfaces/Cart.interface";

interface StoreContextValue {
    cart?: Cart
    setCart?: (cart: Cart) => void
    removeItem?: (productID: number, quantity: number) => void
}

export const StoreContext = createContext<StoreContextValue>({})

export function useStoreContext() {

    const context = useContext<StoreContextValue>(StoreContext)

    return context
}


export function StoreProvider({ children }: PropsWithChildren<any>) {

    const [cart, setcart] = useState<Cart>();

    useEffect(()=>{
    }, [])

    const setCart = (cart: Cart) => {
        setcart(cart)
    }

    const removeItem = (productID: number, quantity: number) => {

        if(!cart) return

        const items = [...cart.items]

        const itemIndex = items.findIndex(i=> i.productID === productID)

        if(itemIndex >=0){
            items[itemIndex].quantity -= quantity
            if(items[itemIndex].quantity === 0){
               items.splice(itemIndex, 1)
            }

          
        }

        setcart(prevState =>{
            return {
                ...prevState!,
                items
            }
        })
    }

    


    return (
        <StoreContext.Provider value={{

            cart,
            setCart,
            removeItem,
            
        }
        }>
            {children}
        </StoreContext.Provider>
    )
}