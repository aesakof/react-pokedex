import React from "react"
import {Link} from "react-router-dom"

function Header() {

    return (
        <ul id="nav-list">
            <li><Link className="header-link" to="/">React Pokedex</Link></li>
            <li><Link className="header-link" to="/pokemon">Pokemon List</Link></li>
            <li><Link className="header-link" to="/favorites">Favorites</Link></li>
        </ul>
    )
}

export default Header