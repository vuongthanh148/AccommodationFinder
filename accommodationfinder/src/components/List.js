import React from 'react';
import logo from '../image/bg-img-1.jpg';
const List = (props) => {
    return (
        <li>
            <div className='ev-card-1'>
                <div>
                    <div className='uk-card uk-card-default uk-card-body'>
                        <a href='#'>
                            <div className='uk-inline'>
                                <img
                                    alt='Image'
                                    className='uk-border-rounded'
                                    className='item-image'
                                    src={logo}></img>

                                <div className='uk-overlay overlay-gradient uk-position-bottom'>
                                    <p className='ev-price'>
                                        $2,000 <small>/ Per Month</small>
                                    </p>
                                </div>
                            </div>
                        </a>
                        <div className='ev-body'>
                            <span
                                style={{ textAlign: 'center' }}
                                className='ev-meta uk-text-small'>
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
                                style={{ textAlign: 'center' }}>
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
    );
};

export default List;
