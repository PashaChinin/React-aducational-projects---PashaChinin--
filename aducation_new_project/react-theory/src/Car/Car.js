import React, {Component} from "react";
import propTypes from 'prop-types'




function Car(props) {
    let style = {
        display: 'block',
        border: '2px solid #ccc',
        width: '50%',
        alignItems: 'center',
        margin: ' 15px auto ',
    paddingTop: '20px',
        paddingBottom: '10px'
    }



    return(
    <div style={style} >
        <p>Car name: {props.name}</p>
        <p>Car year: {props.year}</p>
        <button onClick={props.parentTitleHandler}>Change h2</button>
        <input type='text' onChange={props.onChangeTitleFromParent}/>
        <button onClick={props.onDeleteElementFromParent} >Delete element</button>
        <button>Create new Element</button>
    </div>
    )

}
Car.propTypes = {
    name: propTypes.string,
    year: propTypes.number,
}
export default Car





