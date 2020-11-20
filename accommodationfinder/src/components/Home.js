import React, { Component } from "react";
import "../css/Homepage.css";
import {list_items, Cities, District, Stresses, Universities, Price, Square, Room_type, Air_conditioner, Electric_water_heater, Ve_sinh} from "../data/searchBar"
import Select from 'react-select';
import 'react-select'

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


function Search() {
  return (
      <div className="search-box">
          <div className="search-box-container">
              <div className="title">
                  <p>Find Your</p>
                  <h3>Perfect Accommodation</h3>
              </div>

              <form>
                <div className="seach-box">
                  <div className="list-search-items">
                    <div>
                      <div className="cities">
                        <h4>Thành phố</h4>
                        <Select
                          className="list-cities"
                          defaultValue={list_items[0]}
                          options={Cities}
                        />
                      </div>
                    </div>
                      <div>
                        <div className="district">
                          <h4>Quận huyện</h4>
                          <Select
                            className="list-district"
                            defaultValue={list_items[1]}
                            options={District}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="stresses">
                          <h4>Đường phố</h4>
                          <Select
                            className="list-stresses"
                            defaultValue={list_items[2]}
                            options={Stresses}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="universities">
                          <h4>Gần trường ĐH, CĐ</h4>
                          <Select
                            className="list-universities"
                            defaultValue={list_items[3]}
                            options={Universities}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="price">
                          <h4>Khoảng giá</h4>
                          <Select
                            className="list-price"
                            defaultValue={list_items[4]}
                            options={Price}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="square">
                          <h4>Diện tích</h4>
                          <Select
                            className="list-square"
                            defaultValue={list_items[5]}
                            options={Square}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="room-type">
                          <h4>Loại phòng</h4>
                          <Select
                            className="list-room-type"
                            defaultValue={list_items[6]}
                            options={Room_type}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="air-conditioner">
                          <h4>Điều hòa</h4>
                          <Select
                            className="list-air-conditioner"
                            defaultValue={list_items[7]}
                            options={Air_conditioner}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="electric-water-heater">
                          <h4>Nóng lạnh</h4>
                          <Select
                            className="list-electric-water-heater"
                            defaultValue={list_items[8]}
                            options={Electric_water_heater}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="ve-sinh">
                          <h4>Vệ sinh</h4>
                          <Select
                            className="list-ve-sinh"
                            defaultValue={list_items[9]}
                            options={Ve_sinh}
                          />
                        </div>
                      </div> 
                  </div>
                </div>
                <div className="search-button">
                  <button>SEARCH</button>
                </div> 
              </form>

          </div>
      </div>
  )
}

function Cover() {
  return(
    <div className="cover">
      <div className="background-image">
        <div className="text-center">
          <h1>EasyAccomod</h1>
          <h2>Discover The Best Accommodation</h2>
          <h4>Your Property, Our Priority</h4>
          <a href="http://" className="button-contact">Contact Us</a>
        </div>
      </div>
    </div>
  )
}