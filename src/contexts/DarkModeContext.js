import { createContext, useState } from "react";

//1) initial state with default values:
const initialState = {
  darkMode: false,
  toggleDarkMode: () => {},
};

//2)  create the context:
const DarkModeContext = createContext();

//3) create the wrapper component:
const DarkModeContextWrapper = (props) => {
  //props
  const [darkMode, setDarkMode] = useState(false);

  //method:
  const toggleDarkMode = () => {
    setDarkMode((mode) => !mode);
  };
  return (
    <>
      {/* //4) */}
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {props.children}
      </DarkModeContext.Provider>
    </>
  );
};

//5)
export { DarkModeContext};
export default DarkModeContextWrapper;
