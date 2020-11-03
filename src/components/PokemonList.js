import React, { useEffect, useState, useContext } from "react"
import PokemonPreview from "./PokemonPreview"
import {Context} from "./../Context"


function PokemonList(props) {
    const { pokemon, setPage, prevUrl, nextUrl } = useContext(Context)

    const beginningUrl = "https://pokeapi.co/api/v2/pokemon"
    const endingUrl = "https://pokeapi.co/api/v2/pokemon?offset=1030&limit=20"

    const monz = pokemon.map(poke =>  {
        return (<PokemonPreview key={poke.name} pokemon={poke} />)
    })

    return (
        <div>
            <div className="pokemon-list">
                {monz}
            </div>
            <div id="pagination">
                {prevUrl && <button className="page-buttons" onClick={() => setPage(beginningUrl)}>First</button>}
                {prevUrl && <button className="page-buttons" onClick={() => setPage(prevUrl)}>Previous</button>}
                {nextUrl && <button className="page-buttons" onClick={() => setPage(nextUrl)}>Next</button>}
                {nextUrl && <button className="page-buttons" onClick={() => setPage(endingUrl)}>Last</button>}
            </div>
        </div>
    )
}

export default PokemonList