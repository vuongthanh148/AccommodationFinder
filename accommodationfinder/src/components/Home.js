import React, { Component } from "react";
import "../css/Homepage.css";
// import "../css/unikit.css"
import {list_items, Cities, District, Stresses, Universities, Price, Square, Room_type, Air_conditioner, Electric_water_heater, Ve_sinh} from "../data/searchBar"
import Select from 'react-select';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log('did it mount?');
    //Request all needed data
  }
  render() {
    return (
      // <Navbar />,
      <div className="App">
        <Cover />
        <Search />
      </div>
    );
  }
}

export default Home;

function Cover() {
  return(
      <div className="ev-hero-image uk-cover-container uk-background-cover uk-background-secondary uk-flex">

          <div className="ev-hero-image-overlay uk-flex uk-flex-center uk-flex-middle uk-position-z-index uk-position-relative">
              <div className="uk-width-1-1@m uk-text-center uk-margin-auto uk-margin-auto-vertical">
                  <h1 className="uk-text-bold">Discover The Best Accommodations</h1>
                  <h4 className="uk-margin-medium-bottom uk-margin-small-top">Your Property, Our Priority.</h4>
                  <a className="uk-button uk-button-primary uk-button-large uk-border-pill" href="#">
                      Discover Now
                      <i className="fas fa-angle-right uk-margin-small-left"></i>
                  </a>
              </div>
          </div>
      </div>
  )
}

function Search() {
  
  return(
      <div className="ev-section-light ev-bottom-border">
          <div className="ev-container-search ev-section-padding-v-m ev-advanced-search">
              <div className="ev-title-dark uk-text-center uk-margin-remove-top">
                  <p>Find Your</p>
                  <h3>Perfect Accommodation</h3>
              </div>

              <form className="uk-grid-small uk-grid">
                  <div className="uk-width-1-2 uk-width-1-2@s uk-width-1-4@m">
                      <div className="uk-margin">
                          <div className="uk-width-1-1 uk-inline">
                              <h4>Thành phố</h4>
                              <Select
                              className="list-cities"
                              defaultValue={list_items[0]}
                              options={Cities}
                              />
                          </div>
                      </div>
                  </div>

                  <div className="uk-width-1-2 uk-width-1-2@s uk-width-1-4@m">
                      <div className="uk-margin">
                          <div className="uk-width-1-1 uk-inline">
                              <h4>Quận huyện</h4>
                              <Select
                                  className="list-district"
                                  defaultValue={list_items[1]}
                                  options={District}
                              />
                          </div>
                      </div>
                  </div>

                  <div className="uk-width-1-2 uk-width-1-2@s uk-width-1-4@m">
                      <div className="uk-margin">
                          <div className="uk-width-1-1 uk-inline">
                              <h4>Đường phố</h4>
                              <Select
                                  className="list-stresses"
                                  defaultValue={list_items[2]}
                                  options={Stresses}
                              />
                          </div>
                      </div>
                  </div>

                  <div className="uk-width-1-2 uk-width-1-2@s uk-width-1-4@m">
                      <div className="uk-margin">
                          <div className="uk-width-1-1 uk-inline">
                              <h4>Gần trường ĐH, CĐ</h4>
                              <Select
                                  className="list-universities"
                                  defaultValue={list_items[3]}
                                  options={Universities}
                              />
                          </div>
                      </div>
                  </div>

                  <div className="uk-width-1-2 uk-width-1-2@s uk-width-1-4@m">
                      <div className="uk-margin">
                          <div className="uk-width-1-1 uk-inline">
                              <h4>Khoảng giá</h4>
                              <Select
                                  className="list-price"
                                  defaultValue={list_items[4]}
                                  options={Price}
                              />
                          </div>
                      </div>
                  </div>

                  <div className="uk-width-1-2 uk-width-1-2@s uk-width-1-4@m">
                      <div className="uk-margin">
                          <div className="uk-width-1-1 uk-inline">
                              <h4>Diện tích</h4>
                              <Select
                                  className="list-square"
                                  defaultValue={list_items[5]}
                                  options={Square}
                              />
                          </div>
                      </div>
                  </div>

                  <div className="uk-width-1-2 uk-width-1-2@s uk-width-1-4@m">
                      <div className="uk-margin">
                          <div className="uk-width-1-1 uk-inline">
                              <h4>Loại phòng</h4>
                              <Select
                                  className="list-room-type"
                                  defaultValue={list_items[6]}
                                  options={Room_type}
                              />
                          </div>
                      </div>
                  </div>

                  <div className="uk-width-1-2 uk-width-1-2@s uk-width-1-4@m">
                      <div className="uk-margin">
                          <div className="uk-width-1-1 uk-inline">
                              <h4>Vệ sinh</h4>
                              <Select
                                  className="list-ve-sinh"
                                  defaultValue={list_items[9]}
                                  options={Ve_sinh}
                              />
                          </div>
                      </div>
                  </div>

                  <div className="uk-width-1-1@s uk-width-5-6@m">
                      <div className="uk-margin">
                          <ul className="ev-other-features uk-accordion">
                              <li>
                                  <a className="uk-accordion-title" href="#" onClick={click_feauter()}>YÊU CẦU KHÁC</a>
                                  <div className="uk-accordion-content">

                                      <div className="uk-grid-small uk-grid">

                                          <div className="uk-width-1-2@s uk-width-1-3@m uk-width-1-4@l">
                                              <label><input className="uk-checkbox" type="checkbox"/>Nóng lạnh</label>
                                          </div>

                                          <div className="uk-width-1-2@s uk-width-1-3@m uk-width-1-4@l">
                                              <label><input className="uk-checkbox" type="checkbox"/>Điều hòa</label>
                                          </div>
                                      </div>

                                  </div>
                              </li>
                          </ul>
                      </div>
                  </div>

                  <div className="uk-width-1-1@s uk-width-1-6@m">
                      <div className="uk-margin">
                          <button className="uk-button uk-button-primary uk-button-large uk-border-rounded uk-margin-small-top uk-width-1-1 uk-text-truncate" type="submit">Search <i className="fas fa-angle-right uk-margin-small-left"></i></button>
                      </div>
                  </div>

              </form>

          </div>
      </div>
  )
  function click_feauter() {
    console.log("click ok")
  }
}