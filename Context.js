import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [favorites, setFavorites] = useState([])
    
    function addFavorite(newItem) {
        setFavorites(prevItems => [...prevItems, newItem])
    }
    
    function removeFavorite(id) {
        setFavorites(prevItems => prevItems.filter(item => item.id !== id))
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