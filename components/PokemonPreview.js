import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import typeColors from "./../public/typeColors"
import capitalize from "./../public/utils"

function PokemonPreview(props) {
    const [pokemonInfo, setPokemonInfo] = useState(null)
    const [types, setTypes] = useState([])

    const name = capitalize(props.pokemon.name)
    const url = props.pokemon.url

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

    function backgroundStyle(types) {
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
                <Link to={`/pokemon/${pokemonInfo.id}`} style={backgroundStyle(types)} className="pokemon-preview">
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

