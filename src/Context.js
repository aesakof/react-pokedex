import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [pokemon, setPokemon] = useState([])
    const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    const [nextUrl, setNextUrl] = useState()
    const [prevUrl, setPrevUrl] = useState()
    const [favorites, setFavorites] = useState([])
    const [type, setType] = useState("none")
    
    useEffect(() => {
        fetch(currentUrl)
            .then(res => res.json())
            .then(data => {
                if(type === "none") {
                    setPrevUrl(data.previous)
                    setNextUrl(data.next)
                    setPokemon(data.results.map(p => p))
                } else {
                    setPokemon(data.pokemon.map(p => p.pokemon))
                }
                
            })
    }, [currentUrl])

    function setPage(url) {
        setCurrentUrl(url)
    }

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
            removeFavorite,
            nextUrl,
            prevUrl,
            setPage,
            pokemon,
            setType,
            type
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}