import React, { createContext, useState } from "react";


const initialValue = {
    tickerSelect: {
        ticker: "",
        bonds: []
    },
    brokerSelect: {
        brokerId: ""
    }
}


export const SelectDataContext = createContext(initialValue)

const SelectDataProvider = ({ children }) => {

    const [state, setState] = useState(initialValue);

    return (
        <SelectDataContext.Provider value={{ state, setState }}>
            {children}
        </SelectDataContext.Provider>
    )
}

export default SelectDataProvider;