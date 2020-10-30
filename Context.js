import React, { useState } from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [favorites, setFavorites] = useState([])
    
    function addFavorite(newId) {
        setFavorites(prevIds => [...prevIds, newId])
    }
    
    function removeFavorite(id) {
        setFavorites(prevIds => prevIds.filter(item => item !== id))
    }
    
    return (
        <Context.Provider value={{
            favorites,
            addFavorite,
            removeFavorite
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}