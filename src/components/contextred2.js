import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext2 = createContext();
const CartDispatchContext2 = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD2":
            return [...state,
            {
                id: action.id, name: action.name, size: action.size, price: action.price,
                quantity: action.quantity, image: action.image
            }]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;

        case "DROP":
            let empArray = []
            return empArray

        default:
            console.log("error in reducer");
    }

}

export const CartProvider2 = ({ children }) => {

    const [state, dispatch2] = useReducer(reducer, [])
    return (
        <CartDispatchContext2.Provider value={dispatch2}>
            <CartStateContext2.Provider value={state}>
                {children}
            </CartStateContext2.Provider>
        </CartDispatchContext2.Provider>

    )
}

export const useCart2 = () => useContext(CartStateContext2);
export const useDispatchCart2 = () => useContext(CartDispatchContext2);