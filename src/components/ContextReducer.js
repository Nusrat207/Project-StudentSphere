import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state,
            {
                id: action.id, name: action.name, meal:action.meal, price: action.price, shop: action.shop,
                quantity: action.quantity, image: action.image, time:action.time
            }]

       // case "REMOVE":
       //     let newArr = [...state]
       //     newArr.splice(action.index, 1)
       //     return newArr;
       case "REMOVE":
    return state.filter(item => 
        item.id !== action.id || 
        item.name !== action.name || 
        item.meal !== action.meal || 
        item.price !== action.price || 
        item.shop !== action.shop || 
        item.quantity !== action.quantity || 
        item.image !== action.image ||
        item.time !== action.time
    );

        case "DROP":
            let empArray = []
            return empArray

        case "UPDATE":
            return state.map((food) => {
                if (food.id === action.id) {
                    return {
                        ...food,
                        name: action.name,
                        price: action.price,
                        shop: action.shop,
                        quantity: action.quantity,
                        image: action.image
                    };
                }
                return food;
            });

        default:
            console.log("error in reducer");
    }

}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>

    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);