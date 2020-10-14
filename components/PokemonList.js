import React, { useEffect, useState } from "react"
import PokemonPreview from "./../components/PokemonPreview"

function PokemonList() {
    const [pokemon, setPokemon] = useState([])
    const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    const [nextUrl, setNextUrl] = useState("")
    const [prevUrl, setPrevUrl] = useState("")
    const [loading, setLoading] = useState("")

    useEffect(() => {
        fetch(currentUrl)
            .then(res => res.json())
            .then(data => {
                setPrevUrl(data.previous)
                setNextUrl(data.next)
                setPokemon(data.results.map(p => p))
            })
    }, [currentUrl])

    function prevPage () {
        setCurrentUrl(prevUrl)
    }

    function nextPage () {
        setCurrentUrl(nextUrl)
    }

    const monz = pokemon.map(poke =>  {
        return (<PokemonPreview key={poke.name} pokemon={poke} />)
    })

    return (
        <div>
            <div className="pokemon-list">
                {monz}
            </div>
            <div id="pagination">
                {prevUrl && <button id="previous" onClick={prevPage}>Previous</button>}
                {nextUrl && <button id="next" onClick={nextPage}>Next</button>}
            </div>
        </div>
    )
}

export default PokemonList