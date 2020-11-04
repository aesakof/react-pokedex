import React, { useContext } from "react"
import Select from 'react-select';

import PokemonPreview from "./PokemonPreview"
import {Context} from "./../Context"

const options = [
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

function PokemonList(props) {
    const { pokemon, setPage, prevUrl, nextUrl } = useContext(Context)

    const beginningUrl = "https://pokeapi.co/api/v2/pokemon"
    const endingUrl = "https://pokeapi.co/api/v2/pokemon?offset=1030&limit=20"

    const monz = pokemon.map(poke =>  {
        return (<PokemonPreview key={poke.name} pokemon={poke} />)
    })

    function handleChange(selectedOption) {
        console.log(`Option selected:`, selectedOption);
    };

    return (
        <div>
            <div className="select-container">
                <label id='filter-label'>Filter By Type:</label>
                <Select
                    className="type-select"
                    options={options}
                />
            </div>

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