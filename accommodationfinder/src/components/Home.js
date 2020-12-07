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

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.changeState(true);
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
      selectedOptionCity: null,
      selectedOptionDistrict: null,
    };
  }


  componentDidMount() {
    axios.get(`https://thongtindoanhnghiep.co/api/city`).then((res) => {
      const cities = res.data.LtsItem.map((item) => {
        return {
          ID: item.ID,
          type: "city",
          value: item.Title,
          label: item.Title,
        };
      });
      this.setState({ list_city: cities });
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

  handleChange = (selectedOptionCity) => {
    this.setState({ selectedOptionCity, selectedOptionDistrict: ""});
    console.log(`Option selected:`, selectedOptionCity);
    let url = "";
    if (selectedOptionCity.type === "city") {
      url = `https://thongtindoanhnghiep.co/api/city/${selectedOptionCity.ID}/district`;
    }
    axios.get(url).then((res) => {
      const districts = res.data.map((item) => {
        return {
          ID: item.ID,
          type: "district",
          value: item.Title,
          label: item.Title,
        };
      });
      this.setState({ list_district: districts });
    });
  };

  render() {
    const { selectedOptionCity, selectedOptionDistrict } = this.state;
    return (
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
                    onChange ={ (selectedOptionDistrict) => {this.setState({selectedOptionDistrict})} }
                    options={this.state.list_district}
                  />
                </div>
              </div>
            </div>

            <div className="search-width">
              <div className="search-margin">
                <div className="search-width-1-1 search-inline">
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
    );
  }
}
