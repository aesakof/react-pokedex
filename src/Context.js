import React, { useState, useEffect } from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [pokemon, setPokemon] = useState([])
    const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    const [nextUrl, setNextUrl] = useState()
    const [prevUrl, setPrevUrl] = useState()
    const [favorites, setFavorites] = useState([])
    const [type, setType] = useState("none")
    const [gen, setGen] = useState("none")
    
    useEffect(() => {
        if(currentUrl === "generation_filter") {
            const { genStart, genEnd } = genBoundaries(gen)
            let genList = []
            for(let i = genStart; i <= genEnd; i++) {
                genList = [...genList, { "name": i, "url": `https://pokeapi.co/api/v2/pokemon/${i}/`}]
            }
            setPokemon(genList)

        } else {
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
        }
        
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
            type,
            gen,
            setGen
        }}>
            {children}
        </Context.Provider>
    )
}

function genBoundaries(gen) {
    let genStart, genEnd = 0
    switch(gen) {
        case "i":
            genStart = 1
            genEnd = 151
            break
        case "ii":
            genStart = 152
            genEnd = 251
            break
        case "iii":
            genStart = 252
            genEnd = 386
            break
        case "iv":
            genStart = 387
            genEnd = 493
            break
        case "v":
            genStart = 494
            genEnd = 649
            break
        case "vi":
            genStart = 650
            genEnd = 721
            break
        case "vii":
            genStart = 722
            genEnd = 809
            break
        case "viii":
            genStart = 810
            genEnd = 898
            break
    }
    return { genStart, genEnd }
}

export {ContextProvider, Context}