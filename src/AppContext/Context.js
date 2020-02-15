import React, { createContext,  useState} from 'react'

export const context = createContext();


export const AppProvider = (props)=> {
   const [Token, SetToken] = useState('test');
    return(
        <context.Provider value={[Token, SetToken]}>
            {props.children}
        </context.Provider>
    )




}