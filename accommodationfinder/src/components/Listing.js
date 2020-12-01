import React, { Component } from 'react';
import reactDOM from 'react-dom';
import '../css/Listing.css';
import logo from '../image/bg-img-1.jpg';
class Listing extends Component {
    state = {};
    render() {
        return (
            <div>
                <List />
            </div>
        );
    }
}

export default Listing;

function List() {
    return (
        <div className='ev-container ev-section-margin-v-m'>
            <div className='ev-title-dark uk-text-center'>
                <p>Featured</p>
                <h3>Properties</h3>
            </div>

            <div className='uk-margin-top' uk-slider>
                <div
                    className='uk-position-relative uk-visible-toggle uk-light'
                    tabindex='-1'>
                    <ul
                        className='uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-3@l uk-grid-medium'
                        uk-grid>
                        <li>
                            <div className='ev-card-1'>
                                <div>
                                    <div className='uk-card uk-card-default uk-card-body'>
                                        <a href='#'>
                                            <div className='uk-inline'>
                                                <img
                                                    alt='Image'
                                                    className='uk-border-rounded'
                                                    src={logo}></img>
                                                <div classNameName='uk-overlay uk-light uk-position-top'>
                                                    <span classNameName='uk-label uk-label-primary'>
                                                        Featured
                                                    </span>
                                                </div>
                                                <div className='uk-overlay overlay-gradient uk-position-bottom'>
                                                    <p className='ev-price'>
                                                        $2,000{' '}
                                                        <small>
                                                            / Per Month
                                                        </small>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                        <div className='ev-body'>
                                            <span className='ev-meta uk-text-small'>
                                                For Rent
                                            </span>
                                            <h3 className='ev-title uk-card-title uk-text-bolder uk-text-truncate uk-text-truncate'>
                                                Luxury Home Family
                                            </h3>
                                            <p className='ev-location'>
                                                <i className='fas fa-map-marker-alt uk-margin-small-right'></i>{' '}
                                                Sydney / Australia
                                            </p>
                                            <ul
                                                className='ev-info uk-subnav'
                                                uk-margin>
                                                <li>
                                                    <span>3 Beds</span>
                                                </li>
                                                <li>
                                                    <span>2 Baths</span>
                                                </li>
                                                <li>
                                                    <span>2450 Sq Ft</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
