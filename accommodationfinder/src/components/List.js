import React, { Component } from "react";
import logo from "../image/bg-img-1.jpg";
import { Slide } from "react-slideshow-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "material-ui-rating";
import {
  faHeart as fasHeart,
  faEye as fasEye,
  faMapMarkedAlt as fasMapMarkedAlt,
  faPlaceOfWorship as fasPlaceOfWorship,
  faHome as fasHome,
  faBath as fasBath,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "react-slideshow-image/dist/styles.css";

class List extends Component {
  constructor(props) {
    super(props);
    this.state=({
      accomod: this.props.accomod,
      isFollowed: false,
    })
  }

  componentDidMount(){

  }

  render() {
    // console.log(this.state.accomod);
    return (
      <div className="ev-card-1">
        <div>
          <div className="uk-card uk-card-default uk-card-body">
            <div
              className="ev-header"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <div className="views">
                <FontAwesomeIcon style={{ margin: "auto 0" }} icon={fasEye} />
                <p style={{ paddingLeft: "8px", paddingRight: "8px" }}>{this.state.accomod.watch}</p>
              </div>
              <div className="uk-overlay overlay-gradient">
                <p className="ev-price">
                {this.state.accomod.price.toLocaleString('en')} <small>Đ/ Tháng</small>
                </p>
                {/* <FontAwesomeIcon
                  style={{ color: "white", fontSize: "22px", margin: "auto 0" }}
                  icon={farHeart}
                /> */}
                <FontAwesomeIcon
                  style={{
                    color: "FireBrick",
                    fontSize: "22px",
                    margin: "auto 0",
                  }}
                  icon={fasHeart}
                />
              </div>
              <Slide
                autoplay={true}
                duration={2000}
                pauseOnHover={true}
                transitionDuration={750}
                canSwipe={false}
              >
                {this.state.accomod.photos.map((element, index) => (
                  <div
                    className="each-slide-list"
                    style={{
                      backgroundImage: `url(${element})`,
                    }} key = {index}
                  ></div>
                ))}
              </Slide>
            </div>
            <div className="ev-body">
              <div style={{ display: "flex" }}>
                <Rating
                  value={parseFloat(this.state.accomod.avgRate)}
                  max={5}
                  readOnly
                  onChange={(value) => console.log(`Rated with value ${value}`)}
                />
                <p
                  style={{ margin: "auto 0 auto auto"}}
                >
                  {this.state.accomod.postedDate.slice(0,10).split('-').reverse().join('/')}
                </p>
              </div>
              <div
                className="title"
                style={{
                  fontSize: "19px",
                  fontWeight: "550",
                  textAlign: "left",
                  margin: "0",
                }}
              >
                <p
                  style={{ margin: "0", textAlign: "left", paddingLeft: "5px" }}
                >
                  {this.state.accomod.title}
                </p>
              </div>
              <div className="flex-row">
                <FontAwesomeIcon
                  style={{ color: "#bf7c2f" }}
                  icon={fasMapMarkedAlt}
                />
                <p
                  style={{
                    paddingRight: "5px",
                    paddingLeft: "7px",
                    textAlign: "left",
                    margin: "0",
                    fontWeight: "600",
                  }}
                >
                  Địa chỉ:
                </p>
                <p style={{ textAlign: "left", width: "66%", margin: "0" }}>
                  {this.state.accomod.houseNumber} {this.state.accomod.street}, {this.state.accomod.ward}, {this.state.accomod.district}, {this.state.accomod.city}
                </p>
              </div>
              <div className="flex-row">
                <FontAwesomeIcon
                  style={{ color: "#bf7c2f" }}
                  icon={fasPlaceOfWorship}
                />
                <p
                  style={{
                    paddingRight: "5px",
                    paddingLeft: "7px",
                    textAlign: "left",
                    margin: "0",
                    fontWeight: '600'
                  }}
                >
                  Ở gần:
                </p>
                <p style={{ textAlign: "left", width: "70%", margin: "0" }}>
                  {this.state.accomod.publicPlace}
                </p>
              </div>
              <div className="flex-row">
                <FontAwesomeIcon style={{ color: "#bf7c2f" }} icon={fasHome} />
                <p
                  style={{
                    paddingRight: "5px",
                    paddingLeft: "7px",
                    textAlign: "left",
                    margin: "0",
                    fontWeight: '600'
                  }}
                >
                  Diện tích:
                </p>
                <p style={{ textAlign: "left", width: "62%", margin: "0" }}>
                  {this.state.accomod.livingArea}m²
                </p>
              </div>
              <div className="flex-row">
                .
                <FontAwesomeIcon style={{ color: "#bf7c2f" }} icon={fasBath} />
                <p
                  style={{
                    paddingRight: "5px",
                    paddingLeft: "7px",
                    textAlign: "left",
                    margin: "0",
                    fontWeight: '600'
                  }}
                >
                  CSVC:
                </p>
                <p style={{ textAlign: "left", width: "100%", margin: "0" }}>
                  {this.state.accomod.seperateAccomodation?'Không chung chủ':'Chung chủ'}, {this.state.accomod.materialFacilities.airConditional?'có điều hoà':'không có điều hoà'}, {this.state.accomod.materialFacilities.electricWaterHeater?'có nóng lạnh':'không có nóng lạnh'}, {this.state.accomod.materialFacilities.bathroom.seperate?'vệ sinh khép kin':'vệ sinh chung'} 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
