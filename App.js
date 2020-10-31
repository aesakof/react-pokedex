import React from "react"
import {Switch, Route} from "react-router-dom"

import PokemonList from "./components/PokemonList"
import PokemonDetail from "./components/PokemonDetail"
import Header from "./components/Header"
import Home from "./components/Home"
import Favorites from "./components/Favorites"

function App() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/pokemon">
                    {console.log("All Pokemon page!")}
                    <PokemonList page="all_pokemon" />
                </Route>
                <Route path="/pokemon/:pokemonId">
                    <PokemonDetail />
                </Route>
                <Route path="/favorites">
                    {/* <PokemonList page="favorites" /> */}
                    {console.log("Favorites page!")}
                    <Favorites />
                </Route>
            </Switch>
        </div>

    )
}

export default App;