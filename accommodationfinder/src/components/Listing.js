import React, { Component } from 'react';
import '../css/Listing.css';
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import List from './List';
class Listing extends Component {
    constructor(props){
        super(props)
        // this.state=({
        //     list_accomod: this.props.list_accomod
        // })
    }
    render() {
        const sortedList = this.props.list_accomod.sort((a,b) => a.price < b.price ? 1: -1);
        console.log(sortedList)
        return (
                <div className='uk-slider-items list-product-items' style={{marginBottom: '30px', height: '100%'}} >
                    {sortedList.map((house,index) => (
                        <List accomod={house} key={index}/>
                    ))}
                </div>
        );
    }
}

export default Listing;
