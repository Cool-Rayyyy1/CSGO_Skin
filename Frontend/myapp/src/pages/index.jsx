import React, { useEffect, useState } from "react";
import { Link,  useHistory } from "react-router-dom";
import {Button, Input, Icon, Label} from 'semantic-ui-react';
import "../assets/style.css"

/**
 * The const MainPage defines the links to different APIs.
 * User could click different links to get into the webpage.
 * Besides, it also defines a button to show the default 20 itemsby calling the API defined in the backend.
 */





function MainPage () {
    const history = useHistory();
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
                <div className="button3">
                    <Input 
                    action={{color: 'black',labelPosition: 'left',icon: 'cart',content: 'Checkout',}}
                    actionPosition='left'
                    placeholder='Search...'
                    defaultValue='0.0'
                    />
                    <Input
                        icon={<Icon name='search' inverted circular link />}
                        placeholder='Search User...'
                    />
                </div>
                <div className="button2">
                    <Button content='Secondary' secondary onClick={() => history.push('/')}>Main</Button>
                    <Button content='Secondary' secondary onClick={() => history.push('/search')}>Search</Button>
                    <Button content='Secondary' secondary onClick={() => history.push('/inventory')}>Inventory</Button>
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
                                
                                    <Button color='blue'>
                                    <Icon name='heart' />
                                        Like
                                    </Button>
                                    
                              
                            </div>
                            
                        ))}
            </div>
        </div>
    
    )
}

export default MainPage
