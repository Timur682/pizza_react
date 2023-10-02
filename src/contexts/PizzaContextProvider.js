import {createContext, useState} from "react";

const initialState = {
    pizza: [],
    setPizzas: () => {},
};
//2) create the context:
const Context = createContext(initialState);
//3) create the wrapper:
const PizzaContextProvider = (props) => {
    //state:
    const [pizza, setPizzas] = useState([]);
    return (
        <>
            <Context.Provider
                value={{ pizza, setPizzas }}
            >
                {props.children}
            </Context.Provider>
        </>
    );
};
export { PizzaContextProvider, Context };
export default Context;