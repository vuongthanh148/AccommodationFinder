import React, { Component, useEffect, useRef } from "react";
import "../css/Homepage.css";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import {
  list_items,
  Cities,
  District,
  Stresses,
  Universities,
  Price,
  Square,
  Room_type,
  Air_conditioner,
  Electric_water_heater,
  Ve_sinh,
} from "../data/searchBar";
import Select from "react-select";
import { Slide } from "react-slideshow-image";
import Listing from "./Listing";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.changeNavbarState(true);
    //Request all needed data
  }
  render() {
    return (
      // <Navbar />,
      <div className="App" >
        <Cover />
        <Search />

      </div>
    );
  }
}
let myRef = React.createRef();
export default Home;

class Cover extends Component {
  constructor() {
    super();
    // this.myRef = React.createRef()
  }
  executeScroll = () => myRef.current.scrollIntoView();
  slideImages = [
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/edc-web-house-tour-fuller07-1586874956.jpg",
    "https://www.metricon.com.au/metricon/media/metricon/gallery/2020/july/0001.jpg",
    "https://news.mogi.vn/wp-content/uploads/2019/03/cach-khac-phuc-loi-treo-dong-ho-phong-khach-chan-van-may-gia-chu-anh-4.jpg",
  ];
  render() {
    return (
      <div className="slide-container">
        <div className=" homecover-text-center">
          <h1 className="homecover-text-bold" style={{ color: "white" }}>
            Discover The Best Accommodations{" "}
          </h1>
          <h4 className="homecover-margin" style={{ color: "white" }}>
            Your Property, Our Priority.
          </h4>
          <a
            onClick={this.executeScroll}
            className="homecover-button homecover-button-primary homecover-button-large homecover-border-pill"
          >
            Discover Now
          </a>
        </div>
        <Slide
          autoplay={true}
          duration={2000}
          pauseOnHover={false}
          transitionDuration={1000}
        >
          <div
            className="each-slide"
            style={{
              backgroundImage: `url(${this.slideImages[0]})`,
            }}
          >
            <div className="each-image-cover"></div>
          </div>
          <div
            className="each-slide"
            style={{
              backgroundImage: `url(${this.slideImages[1]})`,
            }}
          >
            <div className="each-image-cover"></div>
          </div>
          <div
            className="each-slide"
            style={{
              backgroundImage: `url(${this.slideImages[2]})`,
            }}
          >
            <div className="each-image-cover"></div>
          </div>
        </Slide>
      </div>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      divAppearance: "none",
      className: "",
      list_city: [],
      list_district: [],
      list_ward: [],
      list_accomod: [],
      selectedOptionCity: null,
      selectedOptionDistrict: null,
      selectedOptionWard: null,
      accommodationInfo: {},
      facilitiesInfo: {}
    };
    this.getAccomod = this.getAccomod.bind(this);
  }

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  getPosition = (callback) => {
     navigator.geolocation.getCurrentPosition(
      position => {
         console.log(position.coords.latitude, position.coords.longitude)
         axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=vi`).then((res) => {
           console.log(res.data)
           this.state.list_city.forEach(c => {
             if(c.label === res.data.localityInfo.administrative[1].name){
                axios.get(`https://thongtindoanhnghiep.co/api/city/${c.ID}/district`).then((res1) => {
                res1.data.forEach(e => {
                  if(this.removeAccents(e.Title) === res.data.localityInfo.administrative[2].name.replace(' District', '')){
                    res.data.localityInfo.administrative[2].name = e.Title.replace('Quận ', '')
                  }
                });
                this.setState({
                  accommodationInfo: {
                    city: res.data.localityInfo.administrative[1].name,
                    district: res.data.localityInfo.administrative[2].name,
                  }
                })
                if(res.data.localityInfo.administrative[3] !== undefined){
                  this.setState({
                    accommodationInfo: {
                      ward: res.data.localityInfo.administrative[3].name,
                    }
                  })
                }
                callback()
              });
             }
           })
         })

      }, () => {
        console.log("unable to get location")
        //Get all accomod
      }, this.options
    );
  }

  getAccomod = () => {
    console.log(this.state.accommodationInfo)
    const data = {
      accommodationInfo: this.state.accommodationInfo,
      facilitiesInfo: this.state.facilitiesInfo,
    }
    axios.post('https://accommodation-finder.herokuapp.com/accommodation', {
      accommodationInfo: this.state.accommodationInfo,
      facilitiesInfo: this.state.facilitiesInfo,
    }).then((res) => {
      console.log('data fetched: ', res)
    })
  }

  removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/Quan |Huyen |Thi Xa |Thanh Pho |District /g, '');
  }

  componentDidMount() {
    axios.get(`https://thongtindoanhnghiep.co/api/city`, ).then((res) => {
      const cities = res.data.LtsItem.map((item) => {
        return {
          ID: item.ID,
          type: "city",
          value: this.removeAccents(item.Title),
          label: item.Title,
        };
      });
      this.setState({ list_city: cities });
      this.getPosition(this.getAccomod);
    });
  }

  changeState = () => {
    if (!this.state.divAppearance) {
      this.setState({
        divAppearance: "none",
        className: "",
      });
    } else {
      this.setState({
        divAppearance: "",
        className: "search-open",
      });
    }
  };

  handleChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    let url = "", typeOption = "";
    if (selectedOption.type === "city") {
      this.setState({selectedOptionCity: selectedOption, selectedOptionDistrict: "", selectedOptionWard: ""})
      url = `https://thongtindoanhnghiep.co/api/city/${selectedOption.ID}/district`;
      typeOption = "district"
    }
    else if (selectedOption.type === "district") {
      this.setState({selectedOptionDistrict: selectedOption, selectedOptionWard: ""})
      url = `https://thongtindoanhnghiep.co/api/district/${selectedOption.ID}/ward`;
      typeOption = "ward"
    }
    axios.get(url).then((res) => {
      console.log(res)
      const finalData = res.data.map((item) => {
        return {
          ID: item.ID,
          type: typeOption,
          value: this.removeAccents(item.Title),
          label: item.Title,
        };
      });
      if(typeOption === "district") this.setState({ list_district: finalData });
      else if(typeOption === "ward") this.setState({ list_ward: finalData });
    });
  };

  render() {
    const { selectedOptionCity, selectedOptionDistrict, selectedOptionWard } = this.state;
    return (
      <>
      <div className="search-section">
        <div className="search-container">
          <div ref={myRef} className="search-title">
            <p>Find Your</p>
            <h3>Perfect Accommodation</h3>
          </div>

          <form className="search-grid-small search-grid">
            <div className="search-width">
              <div className="search-margin">
                <div className="search-width-1-1 search-inline">
                  <Select
                    className="list-cities"
                    value={selectedOptionCity}
                    onChange={this.handleChange}
                    placeholder={"Thành phố"}
                    options={this.state.list_city}
                  />
                </div>
              </div>
            </div>

            <div className="search-width">
              <div className="search-margin">
                <div className="search-width-1-1 search-inline">
                  <Select
                    className="list-district"
                    value={selectedOptionDistrict}
                    placeholder={"Quận/Huyện"}
                    onChange={this.handleChange}
                    options={this.state.list_district}
                  />
                </div>
              </div>
            </div>

            <div className="search-width">
              <div className="search-margin">
                <div className="search-width-1-1 search-inline">
                  <Select
                    className="list-ward"
                    value={selectedOptionWard}
                    placeholder={"Phường/Xã"}
                    onChange ={ (selectedOptionWard) => {this.setState({selectedOptionWard})} }
                    options={this.state.list_ward}
                  />
                </div>
              </div>
            </div>

            <div className="search-width">
              <div className="search-margin">
                <div className="search-width-1-1 search-inline">
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
                    <a
                      className="search-accordion-title"
                      onClick={this.changeState}
                    >
                      YÊU CẦU KHÁC
                    </a>
                    <div
                      className="search-accordion-content"
                      style={{ display: this.state.divAppearance }}
                    >
                      <div className="search-grid-small search-grid">
                        <div className="search-other-margin search-width-1-2@s search-width-1-3@m search-width-1-4@l">
                          <label>
                            <input
                              className="search-checkbox"
                              type="checkbox"
                            />
                            Không chung chủ
                          </label>
                        </div>

                        <div className="search-other-margin search-width-1-2@s search-width-1-3@m search-width-1-4@l">
                          <label>
                            <input
                              className="search-checkbox"
                              type="checkbox"
                            />
                            Điều hòa
                          </label>
                        </div>

                        <div className="search-other-margin search-width-1-2@s search-width-1-3@m search-width-1-4@l">
                          <label>
                            <input
                              className="search-checkbox"
                              type="checkbox"
                            />
                            Nóng lạnh
                          </label>
                        </div>

                        <div className="search-other-margin search-width-1-2@s search-width-1-3@m search-width-1-4@l">
                          <label>
                            <input
                              className="search-checkbox"
                              type="checkbox"
                            />
                            Vệ sinh khép kín
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="search-width-button search-width-1-6@m">
              <div className="search-margin">
                <button
                  className="search-button search-button-primary search-button-large search-border-rounded search-margin-small-top search-width-1-1 search-text-truncate"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Listing />
      </>
    );
  }
}
