import React, {forwardRef, useImperativeHandle, useState} from "react"
import "../assets/style.css"
import ReactDOM from "react-dom"

/**
 * This file defines the pop portal page 
 */
const Model = forwardRef((props, ref) => {

    // Const to hold the display status of the pop portal
    const [display, setDisplay] = React.useState(false);

    // Ref to help the parent class call the child func
    useImperativeHandle(ref, () => {
        return {
            openModal: () => open(),
            close: () => close(),
            visible: display,
        }
    });

    // Method for openning or closing the portal
    const open = () => {
        setDisplay(true)
    }

    const close = () => {
        setDisplay(false)
    }

    if (display) {
        return ReactDOM.createPortal(
        <div className={"modal-wrapper"}>
            <div onClick = {close} className={"modal-backdrop"} />
            <div className={"modal-box"}>
                {props.children}
            </div>
            </div>, document.getElementById("modal-root"))
    }

    return null;
    
})

export default Model