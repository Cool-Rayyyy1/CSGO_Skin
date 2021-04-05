import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Button, Form, Input} from 'semantic-ui-react';

/**
 * The const MainPage defines the links to different APIs.
 * User could click different links to get into the webpage.
 * Besides, it also defines a button to show the default 20 itemsby calling the API defined in the backend.
 */

 const mystyle = {
    color: "DodgerBlue",
    backgroundColor: "White",
    padding: "10px",
    fontFamily: "Arial"
  };


function MainPage () {
    const [item, setItems] = useState([])
    return (
        <div style={mystyle}>
            <h1>Welcome to CSGO Skin Web main page</h1>
            <p><Link to="/search">Search</Link></p>
            <p><Link to="/inventory">Inventory</Link></p>
            <Form>
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
            <Form.Field>
                    {item.map((item,key) => (
                        // show the author information
                        <Form.Field>
                            <img src={item.icon_url}/> 
                            <li key={key}>
                             Name: {item.name} | AveragePrice: {item.AveragePrice} | AverageSold: {item.AverageSold} | rarity: {item.rarity}
                            </li>
                        </Form.Field>
                         
                    ))}
            </Form.Field>


            </Form>
        </div>
    
    )
}

export default MainPage
