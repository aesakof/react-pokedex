import React, { useContext } from "react"
import PokemonPreview from "./PokemonPreview"
import {Context} from "./../Context"


function Favorites(props) {
    const {favorites} = useContext(Context)

    const monz = favorites.map(poke =>  {
        return (<PokemonPreview key={poke.name} pokemon={poke} />)
    })

    return (
        <div className="pokemon-list">
            {
                (!monz.length) ?
                <>
                    <h1>You haven't favorited any Pokemon!</h1>
                    <h2>To favorite a Pokemon, go to the Pokemon List or a Pokemon's page and click the heart icon <i className="far fa-heart preview"></i></h2>
                </>:
                monz
            }
        </div>
    )
}

export default Favorites