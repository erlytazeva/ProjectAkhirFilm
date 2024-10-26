import { TOOGLE_THEME } from "../Action/ThemeAction";


const nilaiDefault = {
    type : "light",
};

const ThemeReducer = (state= nilaiDefault, action)=> {
    switch (action.type){
        case TOOGLE_THEME:
        return {
            ...state,
            theme : state.theme === "light" ? "dark" : "light",
        };
    default:
        return state;
    }
};
export default ThemeReducer;