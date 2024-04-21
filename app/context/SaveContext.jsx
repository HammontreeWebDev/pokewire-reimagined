import React, { createContext, useContext, useState } from 'react';

const SaveContext = createContext();

// Hook for easy access to the context
export const useSave = () => {
    const context = useContext(SaveContext);
    if (!context) {
        throw new Error('useSave must be used within a SaveProvider');
    }
    return context;
}

export const SaveProvider = ({ children }) => {
    const [saveState, setSaveState] = useState(false);

    return (
        <SaveContext.Provider value={{ saveState, setSaveState }}>
            {children}
        </SaveContext.Provider>
    );
};
