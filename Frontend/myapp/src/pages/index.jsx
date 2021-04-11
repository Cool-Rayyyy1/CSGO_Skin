import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Button, Form, Input} from 'semantic-ui-react';
import "../assets/style.css"
import header from "../assets/header.jpg"
/**
 * The const MainPage defines the links to different APIs.
 * User could click different links to get into the webpage.
 * Besides, it also defines a button to show the default 20 itemsby calling the API defined in the backend.
 */



function MainPage () {
    const [item, setItems] = useState([])
    return (
        <div className="App">
            <header className="Text">
                <img className="header"src={header}/>
                <p className="search"><Link to="/search">Search</Link></p>
                <p><Link to="/inventory">Inventory</Link></p>
                <Button onClick={async () => {
                    await fetch('/api/getTwenty', {
                        method: "GET",
                        headers : { 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                        }).then(res => res.json()).then(data => setItems(data))
                    }}>
                    show
                </Button>
            </header>
            <div>
                {item.map((item,key) => (
                            // show the author information
                            <div className="box">
                                <img className="photo"src={item.icon_url}/> 
                                <li key={key}>
                                Name: {item.name} | AveragePrice: {item.AveragePrice} | AverageSold: {item.AverageSold} | rarity: {item.rarity}
                                </li>
                            </div>
                            
                        ))}
            </div>
        </div>
    
    )
}

export default MainPage
