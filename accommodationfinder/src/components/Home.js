import React, { Component } from "react";
import "../css/Homepage.css";
import {list_items, Cities, District, Stresses, Universities, Price, Square, Room_type, Air_conditioner, Electric_water_heater, Ve_sinh} from "../data/searchBar"
import Select from 'react-select';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.changeState(true)
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

class Cover extends Component {
    render() {
        return(
            <div className="homecover-hero-image">
                <div className="homecover-hero-image-overlay homecover-flex homecover-position-z-index">
                    <div className="homecover-width-1-1@m homecover-text-center">
                        <h1 className="homecover-text-bold">Discover The Best Accommodations</h1>
                        <h4 className="homecover-margin">Your Property, Our Priority.</h4>
                        <a className="homecover-button homecover-button-primary homecover-button-large homecover-border-pill" href="#">
                            Discover Now
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

class Search extends Component {
    constructor(props) {
        super(props); 
    
        this.state= {
          divAppearance: "none",
          className: ""
        };
    }
    changeState = () => {
        if(!this.state.divAppearance) {
          this.setState({
            divAppearance: "none",
            className: ""
          })
        }
        else{
          this.setState({
            divAppearance: "",
            className: "search-open"
          })
        }     
    }
  render() {
    return(
        <div className="search-section">
            <div className="search-container">
                <div className="search-title">
                    <p>Find Your</p>
                    <h3>Perfect Accommodation</h3>
                </div>
  
                <form className="search-grid-small search-grid">
                    <div className="search-width">
                        <div className="search-margin">
                            <div className="search-width-1-1 search-inline">
                                {/* <h4>Thành phố</h4> */}
                                <Select
                                className="list-cities"
                                defaultValue={list_items[0]}
                                options={Cities}
                                />
                            </div>
                        </div>
                    </div>
  
                    <div className="search-width">
                        <div className="search-margin">
                            <div className="search-width-1-1 search-inline">
                                {/* <h4>Quận huyện</h4> */}
                                <Select
                                    className="list-district"
                                    defaultValue={list_items[1]}
                                    options={District}
                                />
                            </div>
                        </div>
                    </div>
  
                    <div className="search-width">
                        <div className="search-margin">
                            <div className="search-width-1-1 search-inline">
                                {/* <h4>Đường phố</h4> */}
                                <Select
                                    className="list-stresses"
                                    defaultValue={list_items[2]}
                                    options={Stresses}
                                />
                            </div>
                        </div>
                    </div>
  
                    <div className="search-width">
                        <div className="search-margin">
                            <div className="search-width-1-1 search-inline">
                                {/* <h4>Gần trường ĐH, CĐ</h4> */}
                                <Select
                                    className="list-universities"
                                    defaultValue={list_items[3]}
                                    options={Universities}
                                />
                            </div>
                        </div>
                    </div>
  
                    <div className="search-width">
                        <div className="search-margin">
                            <div className="search-width-1-1 search-inline">
                                {/* <h4>Khoảng giá</h4> */}
                                <Select
                                    className="list-price"
                                    defaultValue={list_items[4]}
                                    options={Price}
                                />
                            </div>
                        </div>
                    </div>
  
                    <div className="search-width">
                        <div className="search-margin">
                            <div className="search-width-1-1 search-inline">
                                {/* <h4>Diện tích</h4> */}
                                <Select
                                    className="list-square"
                                    defaultValue={list_items[5]}
                                    options={Square}
                                />
                            </div>
                        </div>
                    </div>
  
                    <div className="search-width-1-1@s search-width-5-6@m">
                        <div className="search-margin ">
                        <ul className="search-other-features">
                          <li className={this.state.className}>
                              <a className="search-accordion-title" onClick={this.changeState}>YÊU CẦU KHÁC</a>
                              <div className="search-accordion-content" style={{display:this.state.divAppearance}}>
  
                                  <div className="search-grid-small search-grid">
  
                                      <div className="search-other-margin search-width-1-2@s search-width-1-3@m search-width-1-4@l">
                                          <label><input className="search-checkbox" type="checkbox"/>Không chung chủ</label>
                                      </div>
  
                                      <div className="search-other-margin search-width-1-2@s search-width-1-3@m search-width-1-4@l">
                                          <label><input className="search-checkbox" type="checkbox" />Điều hòa</label>
                                      </div>
  
                                      <div className="search-other-margin search-width-1-2@s search-width-1-3@m search-width-1-4@l">
                                          <label><input className="search-checkbox" type="checkbox" />Nóng lạnh</label>
                                      </div>
  
                                      <div className="search-other-margin search-width-1-2@s search-width-1-3@m search-width-1-4@l" >
                                          <label><input className="search-checkbox" type="checkbox" />Vệ sinh khép kín</label>
                                      </div>
  
                                  </div>
  
                              </div>
                          </li>
                      </ul>
                        </div>
                    </div>
  
                    <div className="search-width-button search-width-1-6@m">
                        <div className="search-margin">
                            <button className="search-button search-button-primary search-button-large search-border-rounded search-margin-small-top search-width-1-1 search-text-truncate" type="submit">Search</button>
                        </div>
                    </div>
  
                </form>
  
            </div>
        </div>
    )
  }
}