import React, { useEffect, useState } from "react"
import { Button, Input, Select } from "semantic-ui-react"
import "../assets/style.css"
import Model from "../component/model"
import plot from '../assets/new_plot.png'

/**
 * This file defines the Search page 
 */
function Search () {

  // These consts are used to handle the action performed
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
  const openModal = () => {
    modalRef.current.openModal()
    setSplay(true)
  }
  // These consts are used to hold the data
  const [id, setId] = useState("")
  const [currency, setCurrency] = useState("")
  const [skin, setSkin] = useState("")
  const [rarity, setRarity] = useState("")
  const [icon, setIcon] = useState("")
  const [time, setTime] = useState("")
  const [item, setItem] = useState({});
  const modalRef = React.useRef(); 
  const [value, setValue] = useState("")
  const [decision, setDecision] = useState("")
  const [Splay, setSplay] = useState(false)

  // call the api when the splay is true
  useEffect(() => {
    if (Splay === true) {
      fetch('/api/getResult?avg=' + item.average_price + "&sd=" + item.standard_deviation  + "&num=" + item.amount_sold + "&median=" + item.median_price)
                            .then(response =>
                                response.json()).then(data => {setValue(data.predicted); setDecision(data.decision)})
    }
    
  }, [Splay]);

  // These consts defines the action that going to be perfomed when user chooses some options
 
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
          text: "21 days",
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


  return (
      <div className="SearchBackGround">
          <div className="SearchPageImage">
            <div className="Search">
                <Input style = {{margin:"4px"}}
                    placeholder="Item id"
                    value={id}
                    onChange={e => setId(e.target.value)}
                />
                <Input style = {{margin:"4px"}}
                    placeholder="Item Skin"
                    value={skin}
                    onChange={e => setSkin(e.target.value)}
                /> 
                <Select  style = {{margin:"4px"}} placeholder='Select item Currency' options={Currencyoptions} onChange={handleCurrency} />
                <Select  style = {{margin:"4px"}} placeholder='Select item rarity' options={Rarityoptions} onChange={handleRarity} className="choose"/>
                <Select  style = {{margin:"4px"}} placeholder='Select item icon' options={Iconoptions} onChange={handleIcon}/>
                <Select  style = {{margin:"4px"}} placeholder='Select item time' options={Timeoptions} onChange={handleTime} />
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
            <Button content='Secondary' secondary onClick={openModal}>analyze</Button>
            <Model ref={modalRef} >
              <img src={plot}/>
              <Button content='Secondary' secondary onClick={() => {modalRef.current.close();setSplay(false)}}>Close</Button>
              <li>
                value: {value}
                decision: {decision}
              </li>
            </Model>
          </div>
          
      </div>
  )
}

export default Search