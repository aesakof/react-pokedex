import React from "react"
import {Switch, Route} from "react-router-dom"

import PokemonList from "./components/PokemonList"
import PokemonDetail from "./components/PokemonDetail"
import Header from "./components/Header"
import Home from "./components/Home"

function App() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/pokemon">
                    <PokemonList />
                </Route>
                <Route path="/pokemon/:pokemonId">
                    <PokemonDetail />
                </Route>
            </Switch>
        </div>

    )
}

export default App;