import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const typeColors = {
    Normal: '#A8A878',
    Fire: '#F06430',
    Water: '#6890F0',
    Grass: '#78C850',
    Electric: '#F8D030',
    Ice: '#98D8D8',
    Fighting: '#C03028',
    Poison: '#A040A0',
    Ground: '#E0C068',
    Flying: '#C7FDFF',
    Psychic: '#F85888',
    Bug: '#A8B820',
    Rock: '#B8A038',
    Ghost: '#705898',
    Dark: '#825CA6',
    Dragon: '#7038F8',
    Steel: '#9D9D9D',
    Fairy: '#EE99AC'
}

function PokemonDetail() {
    const {pokemonId} = useParams()

    const [pokemonInfo, setPokemonInfo] = useState(null)
    const [types, setTypes] = useState([])

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                for(let i = 0; i < data.types.length; i++) {
                    setTypes(prevTypes => {
                        const t = capitalize(data.types[i].type.name) //store types as capitals for easier use later
                        return [...prevTypes, t]
                    })
                }
                setPokemonInfo(data)
            })
    }, [])

    const backgroundStyle = () => {
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
                            <h5>Types: {types[0]} / {types[1]}</h5> :
                            <h5>Type: {types[0]}</h5>
                        }
                        <h5>Height: {pokemonInfo.height}</h5>
                        <h5>Weight: {pokemonInfo.weight}</h5>
                    </div>

                    <div className="detail-sec-info">

                    </div>          
                </div>
            }
        </>
    )
}

export default PokemonDetail