import React, { useState, useEffect } from "react"

function PokemonPreview(props) {
    const [pokemonInfo, setPokemonInfo] = useState({})

    const name = props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
    const url = props.pokemon.url

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPokemonInfo(data)
            })
    }, [])

    console.log(pokemonInfo.id)


    return (
        <div className="pokemon-preview">
            <h3>{name}</h3>
            <div className="preview-pic-container">
                <img className="preview-pic" src={`https://pokeres.bastionbot.org/images/pokemon/${pokemonInfo.id}.png`} />
            </div>
            
        </div>
    )
}

export default PokemonPreview