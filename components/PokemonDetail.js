import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const typeColors = {
    normal: '#A8A878',
    fire: '#F06430',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#C7FDFF',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dark: '#825CA6',
    dragon: '#7038F8',
    steel: '#9D9D9D',
    fairy: '#EE99AC'
}

function PokemonDetail() {
    const {pokemonId} = useParams()

    const [pokemonInfo, setPokemonInfo] = useState(null)
    const [types, setTypes] = useState([])
    const [speciesData, setSpeciesData] = useState(null)
    const [abilities, setAbilities] = useState([])
    const [moves, setMoves] = useState([])

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

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
                                if(abilitiesData.effect_entries[j].language.name == "en") {
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
                            const move = {
                                name: movesData.name,
                                power: movesData.power,
                                pp: movesData.pp,
                                type: movesData.type.name,
                                accuracy: movesData.accuracy,
                            }
                            return [...prevMoves, move]
                        }))
                }

                for(let i = 0; i < data.types.length; i++) {
                    setTypes(prevTypes => {
                        const t = data.types[i].type.name //store types as capitals for easier use later
                        return [...prevTypes, t]
                    })
                }
                setPokemonInfo(data)
            })
    }, [])

    function backgroundStyle() {
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
            return (<tr>
                        <td>{capitalize(move.name)}</td>
                        <td>{capitalize(move.type)}</td>
                        <td>{move.pp}</td>
                        <td>{move.power}</td>
                        <td>{move.accuracy}</td>
                    </tr>)
        }))
    }

    return (
        <>
            {
                (pokemonInfo === null || speciesData === null) ?
                <h5>Loading pokemon data...</h5> :
                <div className="pokemon-detail" style={backgroundStyle()}>
                    <div className="detail-header">
                        <h1>#{pokemonInfo.id} - {capitalize(pokemonInfo.name)}</h1>
                    </div>
                    
                    <div className="detail-pic-container">
                        <img className="detail-pic" src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonInfo.id}.png`} />
                    </div>

                    <div className="detail-main-info">
                        {
                            types.length == 2 ?
                            <h3>Types: {capitalize(types[0])} / {capitalize(types[1])}</h3> :
                            <h3>Type: {capitalize(types[0])}</h3>
                        }
                        {capitalize(speciesData.generation.name)}
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
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>PP</th>
                                <th>Power</th>
                                <th>Accuracy</th>
                            </tr>
                            {getMoves()}
                        </table>
                    </div>          
                </div>
            }
        </>
    )
}

export default PokemonDetail