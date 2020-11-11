import React, { useContext, useState } from "react"
import Select from 'react-select';

import PokemonPreview from "./PokemonPreview"
import {Context} from "./../Context"

import "./../css/PokemonList.css"
import { type_options, generation_options } from "./../dropdownOptions"
import capitalize from "./../utils"


function PokemonList(props) {
    const { pokemon, setPage, prevUrl, nextUrl, setType, type, setGen, gen } = useContext(Context)

    const beginningUrl = "https://pokeapi.co/api/v2/pokemon"
    const endingUrl = "https://pokeapi.co/api/v2/pokemon?offset=1030&limit=20"

    const monz = pokemon.map(poke =>  {
        return (<PokemonPreview key={poke.name} pokemon={poke} />)
    })

    function filterType(selectedOption) {
        setType(selectedOption)
        setGen({ value: 'none', label: 'None'})
        if(selectedOption.value === "none") {
            setPage(beginningUrl)
        } else {
            setPage(`https://pokeapi.co/api/v2/type/${selectedOption.value}`)
        }
    }

    function filterGen(selectedOption) {
        setGen(selectedOption)
        setType({ value: 'none', label: 'None'})
        if(selectedOption.value === "none") {
            setPage(beginningUrl)
        } else {
            setPage(`generation-${selectedOption.value}`)
        }
    }

    return (
        <div>
            <div className="select-container">
                <label id='filter-label'>Filter By Type:</label>
                <Select
                    className="type-select"
                    options={type_options}
                    onChange={filterType}
                    value={type}
                />
                <label id='filter-label'>Filter By Generation:</label>
                <Select
                    className="gen-select"
                    options={generation_options}
                    onChange={filterGen}
                    value={gen}
                />
            </div>
        
            <div className="pokemon-list">
                {monz}
            </div>

            {
                type.value != "none" || gen.value != "none" ?
                <></> :
                <div id="pagination">
                    {prevUrl && <button className="page-buttons" onClick={() => setPage(beginningUrl)}>First</button>}
                    {prevUrl && <button className="page-buttons" onClick={() => setPage(prevUrl)}>Previous</button>}
                    {nextUrl && <button className="page-buttons" onClick={() => setPage(nextUrl)}>Next</button>}
                    {nextUrl && <button className="page-buttons" onClick={() => setPage(endingUrl)}>Last</button>}
                </div>
            }
            
        </div>
    )
}

export default PokemonList