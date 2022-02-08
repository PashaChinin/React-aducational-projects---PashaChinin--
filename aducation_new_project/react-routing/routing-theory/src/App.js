import React, {Component} from 'react'
import './App.scss'
import About from './About/About'
import Cars from './Cars/Cars'
import {Route, NavLink, Switch, Redirect} from "react-router-dom"
import CarDetail from "./Cars/CarDetail/CarDetail";

class App extends Component {

  state = {
    isLoggedIn: false
  }


  render() {

    return (
      <div>
        <nav className="nav">
          <ul>
            <li>
              <NavLink  to="/" exact activeClassName='active'>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" exact>About</NavLink>
            </li>
              <li>
                  <NavLink to="/cars" exact>Cars</NavLink>
              </li>
          </ul>
        </nav>

        <hr/>
          <div style={{textAlign:"center"}}>
              <h3> Is logged in:  {this.state.isLoggedIn ? 'True' : "False"}</h3>
              <button onClick={() => this.setState({
                  isLoggedIn: true
              })}>Log in</button>
          </div>


          <Switch>
          <Route path="/" exact render={ () => <h1>Homepage</h1>  } />

              {this.state.isLoggedIn ? <Route path="/about" exact component={About} /> : null}



          <Route path="/cars" component={Cars} />
          <Route path="/cars/:name" component={CarDetail} />
          <Redirect to='/'/>
          </Switch>


      </div>
    );
  }
}

export default App
