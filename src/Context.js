import React, { useState } from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [favorites, setFavorites] = useState([])
    
    function addFavorite(name, id) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        setFavorites(prevFavs => [...prevFavs, {name: name, url: url}])
    }
    
    function removeFavorite(name) {
        setFavorites(prevFavs => prevFavs.filter(item => item.name !== name))
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