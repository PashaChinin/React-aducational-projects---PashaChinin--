import React from "react";
import {Component} from "react";


export default class CarDetail extends Component {



    render() {
    console.log(this.props)

        return(
            <div style={{textAlign: 'center'}}>
                <h1>{this.props.match.params.name}</h1>
            </div>
        )
    }

}
