import React, { Component } from 'react';
import '../css/Listing.css';

import List from './List';
class Listing extends Component {
    state = {
        houses: [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }],
    };
    render() {
        return (
            <div>
                <ul className='uk-slider-items list-product-items' uk-grid>
                    {this.state.houses.map((house) => (
                        <List />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Listing;
