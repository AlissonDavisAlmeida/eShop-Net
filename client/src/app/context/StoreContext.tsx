import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Cart } from "../../interfaces/Cart.interface";

interface StoreContextValue {
    cart: Cart | null
    setCart: (cart: Cart) => void
    removeItem: (productID: number, quantity: number) => void
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined)

export function useStoreContext() {

    const context = useContext(StoreContext)

    return context ? context : null
}


export function StoreProvider({ children }: PropsWithChildren<any>) {

    const [cart, setcart] = useState<Cart | null>(null);

    useEffect(()=>{
        
    }, [])

    const setCart = (cart: Cart) => {

    }

    const removeItem = (productID: number, quantity: number) => {

        if(!cart) return

        let items = [...cart.items]

        const itemIndex = items.findIndex(i=> i.productID === productID)

        if(itemIndex >=0){
            items[itemIndex].quantity -= quantity
            if(items[itemIndex].quantity === 0){
                items = items.splice(itemIndex, 1)
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
            removeItem
        }
        }>
            {children}
        </StoreContext.Provider>
    )
}