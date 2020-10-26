import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

//move this to a data file or something
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

function PokemonPreview(props) {
    const [pokemonInfo, setPokemonInfo] = useState(null)
    const [types, setTypes] = useState([])

    const name = capitalize(props.pokemon.name)
    const url = props.pokemon.url

    //move this to a util file or something
    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
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

    return (
        <>
            {
                pokemonInfo === null ?
                <h5>Loading pokemon data...</h5> :
                <Link to={`/pokemon/${pokemonInfo.id}`} style={backgroundStyle()} className="pokemon-preview">
                    <div>
                        <h3>{name}</h3>
                            <div className="preview-pic-container">
                                <img className="preview-pic" src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonInfo.id}.png`} />
                            </div>
                            <h5>#{pokemonInfo.id}</h5>
                            {
                                types.length == 2 ?
                                <h5>Types: {capitalize(types[0])} / {capitalize(types[1])}</h5> :
                                <h5>Type: {capitalize(types[0])}</h5>
                            }         
                    </div>
                </Link>
            }
        </>
    )
}

export default PokemonPreview

