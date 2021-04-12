import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Button} from 'semantic-ui-react';
import "../assets/style.css"

/**
 * The const MainPage defines the links to different APIs.
 * User could click different links to get into the webpage.
 * Besides, it also defines a button to show the default 20 itemsby calling the API defined in the backend.
 */

function MainPage () {

    // An list to hold the 20 items
    const [item, setItems] = useState([])

    // Call the API when opening the website
    useEffect(() => {
        if (item.length === 0) {
            fetch('/api/getTwenty', {
                method: "GET",
                headers : { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }}).then(res => res.json()).then(data => setItems(data))
        }
        
    });

    return (
        <div className="App">
            <header className="lan">
                <div className="button2">
                    <Button content='Secondary' secondary ><Link to="/search">Search</Link></Button>
                    <Button content='Secondary' secondary ><Link to="/inventory">Inventory</Link></Button>
                </div>
            </header>
            <div className="MainPageImage">
            </div>
            <div >
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
