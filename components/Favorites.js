import React, { useContext } from "react"
import PokemonPreview from "./PokemonPreview"
import {Context} from "./../Context"


function Favorites() {

    const {favorites} = useContext(Context)

    const monz = favorites.map(poke =>  {
        return (<PokemonPreview key={poke.name} pokemon={poke} />)
    })

    return (
        <div className="pokemon-list">
            {monz}
        </div>
    )
}

export default Favorites