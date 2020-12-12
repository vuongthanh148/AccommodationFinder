import React, { Component } from 'react';
import '../css/Listing.css';
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import List from './List';
class Listing extends Component {
    state = {
        houses: [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }, { _id: 5 }, { _id: 6 }, { _id: 7 }, { _id: 8 }, { _id: 9 }, { _id: 10 }, { _id: 11 }],
    };
    
    render() {
        return (
                <div className='uk-slider-items list-product-items' uk-grid>
                    {this.state.houses.map((house) => (
                        <List />
                    ))}
                </div>
        );
    }
}

export default Listing;
