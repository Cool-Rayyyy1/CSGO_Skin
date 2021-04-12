import React, { useState } from "react"
import { Button, Input, Select } from "semantic-ui-react"
import "../assets/style.css"
/**
 * This file defines the Search page 
 */

function Search () {

  //These consts defines the options that user could choose when search for the result
  const Rarityoptions = [
      { 
        key:"Factory New",
        text: "Factory New",
        value: "Factory New",
      },
      { 
        key: "Minimal Wear",
        text: "Minimal Wear",
        value: "Minimal Wear",
      },
      {
        key: "Field Tested",
        text: "Field Tested",
        text: "Field Tested",
      },
      {
        key: "Well Worn",
        text: "Well Worn",
        value: "Well Worn",
      },
      {
          key: "Battle Scarred",
          text: "Battle Scarred",
          value: "Battle Scarred",
        },
    ];
  const Iconoptions = [
      {   key: "Yes",
          text: "Yes",
          value: "1",
        },
        {
          key: "No",
          text: "No",
          value: "0",
        },
  ]
  const Timeoptions = [
      {   
          key: "7 days",
          text: "7 days",
          value: "7",
        },
        { 
          key: "14 days",
          text: "14 days",
          value: "14",
        },
        {
          key: "21 days",
          label: "21 days",
          value: "21",
        },
        { 
          key: "30 days",
          text: "30 days",
          value: "30",
        }
  ]
  const Currencyoptions = [
      {   
          key: "RMB¥",
          text: "RMB¥",
          value: "CNY",
        },
        { 
          key: "USD$",
          text: "USD$",
          value: "USD",
        },
        { 
          key: "EUR€",
          text: "EUR€",
          value: "EUR",
        },
        { 
          key: "CAD$",
          text: "CAD$",
          value: "CAD",
        }
  ]

  // These consts defines the action that going to be perfomed when user chooses some options
  const handleRarity = (event, data) => {
      setRarity(data.value)
    };
  const handleIcon = (event, data) => {
      setIcon(data.value)
  };
  const handleTime = (event, data) => {
      setTime(data.value)
  };
  const handleCurrency = (event, data) => {
      setCurrency(data.value)
  };

  // These consts defines the consts to hold the data
  const [id, setId] = useState("")
  const [currency, setCurrency] = useState("")
  const [skin, setSkin] = useState("")
  const [rarity, setRarity] = useState("")
  const [icon, setIcon] = useState("")
  const [time, setTime] = useState("")
  const [item, setItem] = useState({});

  return (
      <div className="SearchBackGround">
          <div className="SearchPageImage">
            <div className="Search">
                <Input
                    placeholder="Item id"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <Input
                    placeholder="Item Skin"
                    value={skin}
                    onChange={e => setSkin(e.target.value)}
                />
                <Select placeholder='Select item Currency' options={Currencyoptions} onChange={handleCurrency} />
                <Select placeholder='Select item rarity' options={Rarityoptions} onChange={handleRarity} className="choose"/>
                <Select placeholder='Select item icon' options={Iconoptions} onChange={handleIcon}/>
                <Select placeholder='Select item time' options={Timeoptions} onChange={handleTime} />
            </div>
            
          </div>
          <div>
          <div>
              <Button onClick={ async () => {
                      // call the API
                      fetch('/api/getSearch?Currency=' + currency + "&id=" + id + "&Skin=" + skin + "&Rarity=" + rarity
                      + "&icon=" + icon + "&time=" + time)
                      .then(response =>
                          response.json()).then(data => setItem(data)
                        )}}>
                      Search
              </Button>
            </div>
          </div>
          <div className = "SearchResult">
            <img className="photo"src={item.icon}/> 
            <li >
              Name: {skin} | AmoutSold: {item.amount_sold} | SD: {item.standard_deviation} avg_price: {item.average_price} |
              highest_price : {item.highest_price}
            </li>
            
          </div>
          
      </div>
  )
}

export default Search