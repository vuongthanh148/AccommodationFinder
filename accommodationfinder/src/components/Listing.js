import React, { Component } from 'react';
import '../css/Listing.css';

import List from './List';
class Listing extends Component {
    state = {
        houses: [{ _id: 1 }, { _id: 2 }],
    };
    render() {
        return (
            <div>
                <ul
                    className='uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-3@l uk-grid-medium'
                    uk-grid>
                    {this.state.houses.map((house) => (
                        <List />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Listing;
