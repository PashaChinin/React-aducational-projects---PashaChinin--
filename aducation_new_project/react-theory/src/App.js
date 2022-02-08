import React from "react";
import './App.css';
import {Component} from "react";
import Car from "./Car/Car";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cars: [{name: 'Toyota', year: 2000},
                {name: 'Subaru', year: 2015},
                {name: 'Lexus', year: 2005}],
            pageTitle: 'This is React (h2)',
            addNewName: null,
            addNewYear: null,
            showElements: false
        }

    }

    changeTitleHandler = (newTitle) => {

    console.log(newTitle)
        this.setState({
            pageTitle: newTitle
        })
    }
    onChangeChildHandler = (onChangeLine, index) => {
        let temp_line = onChangeLine + " index " + index
    this.setState({
        pageTitle: temp_line
    })
    }
    onChangeInputValue = (onChangeLine, index) => {
        let temp_line = onChangeLine + " index " + index
        this.setState({
            pageTitle: temp_line
        })
    }

    onDeleteEventHandler = (index) => {
        const stateCopyCars = [...this.state.cars]
        stateCopyCars.splice(index,1)
        this.setState({
            cars: stateCopyCars
        })
}
    onCreateEventHandlerName = (Name) => {
        //let temp_line = Name

        //console.log(this.state.addNewName)
        this.setState({
            addNewName: Name
        })
        //console.log(this.state.addNewName)
        //console.log(this.state.addNewName)
    }
    onCreateEventHandlerYear = (Year) => {
        //let temp_line = Year


        this.setState({
            addNewYear: Year
        })
        //console.log(this.state.addNewYear)
    }
    onCreateEventHandler = (name,year) => {

    let copyOfStateArray = [...this.state.cars]
        //let pushArrayElement = [{year: this.state.addNewYear, name: this.state.addNewName}]
        copyOfStateArray.push({year: year, name: name});
        this.setState({
            addNewYear: '',
            addNewName: '',
            cars: copyOfStateArray
        })


    }

    showElementsHandler = () => {
        this.setState({
           showElements: !this.state.showElements
        })
        //console.log(App.year);
    }
 Natalie = () => {
        let age = 24;
    }
    Pavel = () => {
        let age = 21;
    }

  render () {
      const divStyle = {
          textAlign: 'center',

      }
      const divStyle2 = {
          textAlign: 'center',
          display: 'block',
          margin: '15px auto',
          padding: '10px',
          width:'50%'
      }
      return (


          <div className="App" style={divStyle} >

              <h2>{this.state.pageTitle}</h2>
                <button onClick={this.showElementsHandler}>Show element's!</button>
            {
                this.state.showElements ?
                this.state.cars.map(
                    (carItemsHandler, index) => {  /*! Обратить внимание на передачу стрелочной функции в кач-ве параметра map*/

                   return(
                       <Car
                        key = {index}
                        name = {carItemsHandler.name}
                        year = {carItemsHandler.year}
                        parentTitleHandler = { () => this.changeTitleHandler(carItemsHandler.name)}
                        onChangeTitleFromParent = { (event) => this.onChangeChildHandler(event.target.value, index)}
                        onDeleteElementFromParent = { () => this.onDeleteEventHandler(index)}
                        //onCreateElementFromParent = { () => this.onCreateEventHandler()}
                    />

                   )
                }
                )
                    : null
            }
              <div style={divStyle2}>
                  <h2>Create new Element!</h2>
                  <input type='text' id='input_name' value={this.state.addNewName} onChange={ (event) => this.onCreateEventHandlerName(event.target.value) }/> <br/>
                  <input type='text' id='input_year' value={this.state.addNewYear} onChange={ (event) => this.onCreateEventHandlerYear(event.target.value) }/> <br/>
                  <button onClick={ () => this.onCreateEventHandler(this.state.addNewName,this.state.addNewYear)}>Add new Element</button>
              </div>
        </div>

    )
  }
}


export default App;
