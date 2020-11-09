import React, { useContext, useState } from "react"
import Select from 'react-select';

import PokemonPreview from "./PokemonPreview"
import {Context} from "./../Context"

import "./../css/PokemonList.css"
import capitalize from "../utils";


const type_options = [
    { value: 'none', label: 'None'},
    { value: 'normal', label: 'Normal' },
    { value: 'fire', label: 'Fire' },
    { value: 'water', label: 'Water' },
    { value: 'grass', label: 'Grass' },
    { value: 'electric', label: 'Electric' },
    { value: 'ice', label: 'Ice' },
    { value: 'fighting', label: 'Fighting' },
    { value: 'poison', label: 'Poison' },
    { value: 'ground', label: 'Ground' },
    { value: 'flying', label: 'Flying' },
    { value: 'psychic', label: 'Psychic' },
    { value: 'bug', label: 'Bug' },
    { value: 'rock', label: 'Rock' },
    { value: 'ghost', label: 'Ghost' },
    { value: 'dark', label: 'Dark' },
    { value: 'dragon', label: 'Dragon' },
    { value: 'steel', label: 'Steel' },
    { value: 'fairy', label: 'Fairy' },
];

const generation_options = [
    { value: 'none', label: 'None'},
    { value: 'i', label: 'I'},
    { value: 'ii', label: 'II'},
    { value: 'iii', label: 'III'},
    { value: 'iv', label: 'IV'},
    { value: 'v', label: 'V'},
    { value: 'vi', label: 'VI'},
    { value: 'vii', label: 'VII'},
    { value: 'viii', label: 'VIII'},
]

function PokemonList(props) {
    const { pokemon, setPage, prevUrl, nextUrl, setType, type, setGen, gen } = useContext(Context)

    const beginningUrl = "https://pokeapi.co/api/v2/pokemon"
    const endingUrl = "https://pokeapi.co/api/v2/pokemon?offset=1030&limit=20"

    const monz = pokemon.map(poke =>  {
        return (<PokemonPreview key={poke.name} pokemon={poke} />)
    })

    function filterType(selectedOption) {
        setType(selectedOption.value)
        if(selectedOption.value === "none") {
            setPage(beginningUrl)
            setGen("none")
        } else {
            setPage(`https://pokeapi.co/api/v2/type/${selectedOption.value}`)
            setGen("none")
        }
    }

    function filterGen(selectedOption) {
        setGen(selectedOption.value)
        if(selectedOption.value === "none") {
            setType("none")
            setPage(beginningUrl)
        } else {
            setType("none")
            setPage("generation_filter")
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
                />
                <label id='filter-label'>Filter By Generation:</label>
                <Select
                    className="gen-select"
                    options={generation_options}
                    onChange={filterGen}
                />
            </div>
        
            <div className="pokemon-list">
                {monz}
            </div>

            {
                type != "none" ?
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