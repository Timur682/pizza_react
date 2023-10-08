import {createContext, useEffect, useState} from "react";

const initialState = {
    isLoggedIn: false,
};
//2) create the context:
const AuthContext = createContext(initialState);
//3) create the wrapper:
const AuthContextProvider = (props) => {
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            const username = user.username;
            const token = user.token;
            login(username, token);
        }
    } );

    //props:
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(undefined);
    const [username, setUsername] = useState(undefined);
    //methods:
    //called after successful login:
    const login = (username, token) => {
        setUsername(username);
        setToken(token);
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };
    const logout = () => {
        setIsLoggedIn(false);
        setToken(undefined);
        setUsername(undefined);
    };
    return (
        <>
            <AuthContext.Provider
                value={{ isLoggedIn, token, username, login, logout }}
            >
                {props.children}
            </AuthContext.Provider>
        </>
    );
};
export { AuthContextProvider,  };
export default AuthContext;