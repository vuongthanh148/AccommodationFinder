import React, { Component } from 'react';
import '../css/Listing.css';
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import List from './List';
class Listing extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        console.log(this.props.list_accomod)
        return (
                <div className='uk-slider-items list-product-items' >
                    {this.props.list_accomod.map((house,index) => (
                        <List accomod={house} key={index}/>
                    ))}
                </div>
        );
    }
}

export default Listing;
