import React, { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"

import typeColors from "../typeColors"
import capitalize from "../utils"

import {Context} from "./../Context"

import "./../css/PokemonDetail.css"


function PokemonDetail() {
    const {pokemonId} = useParams()
    const history = useHistory();

    const [pokemonInfo, setPokemonInfo] = useState(null)
    const [types, setTypes] = useState([])
    const [speciesData, setSpeciesData] = useState(null)
    const [abilities, setAbilities] = useState([])
    const [moves, setMoves] = useState([])

    const {favorites, addFavorite, removeFavorite} = useContext(Context)

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                fetch(data.species.url)
                    .then(res => res.json())
                    .then(speciesData => setSpeciesData(speciesData))
                
                for(let i = 0; i < data.abilities.length; i++) {
                    fetch(data.abilities[i].ability.url)
                        .then(res => res.json())
                        .then(abilitiesData => setAbilities(prevAbilities => {
                            for(let j = 0; j < abilitiesData.effect_entries.length; j++) {
                                if(abilitiesData.effect_entries[j].language.name === "en") {
                                    const ability = {
                                        name: abilitiesData.name,
                                        effect: abilitiesData.effect_entries[j].effect
                                    }
                                    return [...prevAbilities, ability]
                                }
                            }
                        }))
                }

                for(let i = 0; i < data.moves.length; i++) {
                    fetch(data.moves[i].move.url)
                        .then(res => res.json())
                        .then(movesData => setMoves(prevMoves => {
                            const flavorText = () => {
                                for(let j = 0; j < movesData.flavor_text_entries.length; j++){
                                    if(movesData.flavor_text_entries[j].language.name === "en" && movesData.flavor_text_entries[j].version_group.name === "ultra-sun-ultra-moon") {
                                        return movesData.flavor_text_entries[j].flavor_text
                                    }
                                }
                            }

                            const move = {
                                name: movesData.name,
                                power: movesData.power,
                                pp: movesData.pp,
                                type: movesData.type.name,
                                accuracy: movesData.accuracy,
                                flavorText: flavorText(),
                            }
                            return [...prevMoves, move]
                        }))
                }

                for(let i = 0; i < data.types.length; i++) {
                    setTypes(prevTypes => {
                        const t = data.types[i].type.name
                        return [...prevTypes, t]
                    })
                }

                setPokemonInfo(data)
            })
    }, [])

    function backgroundStyle(types) {
        if(types.length === 1) {
            return {backgroundColor: typeColors[types[0]]}
        } else {
            const color1 = typeColors[types[0]] 
            const color2 = typeColors[types[1]]
            return {backgroundImage: `linear-gradient(to right, ${color1} 0%, ${color1} 45%, ${color2} 55%, ${color2} 100%)`}
        }
    }

    function getAbilities() {
        return (abilities.map(ability => {
            return (<li className="ability" key={ability.name}><strong>{capitalize(ability.name)}:</strong> {ability.effect}</li>)
        }))
    }

    function getBaseStats() {
        return (pokemonInfo.stats.map(stat => {
            return (<li className="base-stat" key={stat.stat.name}>{capitalize(stat.stat.name)}: {stat.base_stat}</li>)
        }))
    }

    function getMoves() {
        return (moves.map(move => {
            return (<tr style={backgroundStyle([move.type])} key={move.name}>
                        <td>{capitalize(move.name)}</td>
                        <td>{capitalize(move.type)}</td>
                        <td>{move.pp}</td>
                        <td>{move.power}</td>
                        <td>{move.accuracy}</td>
                        <td>{move.flavorText}</td>
                    </tr>)
        }))
    }

    function heartIcon() {
        const inFavorites = favorites.some(mon => mon.name === pokemonInfo.name)
        if(inFavorites) {
            return (<i className="fas fa-heart preview" onClick={() => removeFavorite(pokemonInfo.name)}></i>)
        } else {
            return (<i className="far fa-heart preview" onClick={() => addFavorite(pokemonInfo.name,pokemonInfo.id)}></i>)
        }  
    }

    return (
        <>
            {
                (pokemonInfo === null || speciesData === null) ?
                <h5>Loading pokemon data...</h5> :
                <div className="pokemon-detail" style={backgroundStyle(types)}>
                    <i id="back" className="fas fa-arrow-left" onClick={() => history.goBack()}> Back</i>
                    <div className="detail-header">
                        <h1>#{pokemonInfo.id} - {capitalize(pokemonInfo.name)}</h1>
                        <div className="detail-heart">
                            {heartIcon()}
                        </div>
                    </div>
                    
                    <div className="detail-pic-container">
                        <img className="detail-pic" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`} />
                    </div>

                    <div className="detail-main-info">
                        {
                            types.length === 2 ?
                            <h3>Types: {capitalize(types[0])} / {capitalize(types[1])}</h3> :
                            <h3>Type: {capitalize(types[0])}</h3>
                        }
                        <h3>Generation {speciesData.generation.name.split("-")[1].toUpperCase()}</h3>
                        {
                            speciesData.evolves_from_species != null ?
                            <h3>Evolves From: {capitalize(speciesData.evolves_from_species.name)}</h3> :
                            <></>
                        }
                        <h3>Height: {pokemonInfo.height/10} meters</h3>
                        <h3>Weight: {pokemonInfo.weight/10} kilograms</h3>
                        <h3>Base Stats: </h3>
                        <ul>{getBaseStats()}</ul>
                    </div>

                    <div className="detail-sec-info">
                        <h3>Abilities:</h3>
                        <ul>{getAbilities()}</ul>

                        <h3>Moves:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>PP</th>
                                    <th>Power</th>
                                    <th>Accuracy</th>
                                    <th>Flavor Text</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getMoves()}
                            </tbody>
                        </table>
                    </div>          
                </div>
            }
        </>
    )
}

export default PokemonDetail