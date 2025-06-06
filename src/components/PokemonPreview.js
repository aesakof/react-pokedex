import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import typeColors from "../typeColors"
import capitalize from "../utils"

import {Context} from "./../Context"

import { FaHeart, FaRegHeart } from "react-icons/fa";

import "./../css/PokemonPreview.css"


function PokemonPreview(props) {
    const [pokemonInfo, setPokemonInfo] = useState(null)
    const [types, setTypes] = useState([])

    const {favorites, addFavorite, removeFavorite} = useContext(Context)

    const url = props.pokemon.url

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
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

    function heartIcon() {
        const inFavorites = favorites.some(mon => mon.name === pokemonInfo.name)
        if(inFavorites) {
            return (<FaHeart onClick={() => removeFavorite(pokemonInfo.name)}/>)
        } else {
            return (<FaRegHeart onClick={() => addFavorite(pokemonInfo.name,pokemonInfo.id)}/>)
        }  
    }

    return (
        <>
            {
                pokemonInfo === null ?
                <h5>Loading pokemon data...</h5> :
                
                <div style={backgroundStyle(types)} className="pokemon-preview">
                    <div className="preview-header">
                        <Link to={`/pokemon/${pokemonInfo.id}`} className='preview-link'>
                            <h3>{capitalize(pokemonInfo.name)}</h3>
                        </Link>
                        <div className="preview-heart">
                            {heartIcon()}
                        </div>   
                    </div>
                    <Link to={`/pokemon/${pokemonInfo.id}`} className='preview-link'>
                        <div className="preview-pic-container">
                            <img className="preview-pic" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`} />
                        </div>
                        <h5>#{pokemonInfo.id}</h5>
                        {
                            types.length === 2 ?
                            <h5 className="preview-types">Types: {capitalize(types[0])} / {capitalize(types[1])}</h5> :
                            <h5 className="preview-types">Type: {capitalize(types[0])}</h5>
                        }  
                    </Link>    
                </div>
            }
        </>
    )
}

export default PokemonPreview

