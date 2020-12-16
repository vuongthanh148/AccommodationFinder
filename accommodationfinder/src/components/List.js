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
  constructor() {
    super();
    // this.myRef = React.createRef()
  }
  slideImages = [
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/edc-web-house-tour-fuller07-1586874956.jpg",
    "https://www.metricon.com.au/metricon/media/metricon/gallery/2020/july/0001.jpg",
    "https://news.mogi.vn/wp-content/uploads/2019/03/cach-khac-phuc-loi-treo-dong-ho-phong-khach-chan-van-may-gia-chu-anh-4.jpg",
  ];
  render() {
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
                <p style={{ paddingLeft: "8px", paddingRight: "8px" }}>87</p>
              </div>
              <div className="uk-overlay overlay-gradient">
                <p className="ev-price">
                  1,500,000 <small>Đ/ Tháng</small>
                </p>
                <FontAwesomeIcon
                  style={{ color: "white", fontSize: "22px", margin: "auto 0" }}
                  icon={farHeart}
                />
                {/* <FontAwesomeIcon
                  style={{
                    color: "FireBrick",
                    fontSize: "22px",
                    margin: "auto 0",
                  }}
                  icon={fasHeart}
                /> */}
              </div>
              <Slide
                autoplay={true}
                duration={2000}
                pauseOnHover={true}
                transitionDuration={750}
                canSwipe={false}
              >
                {this.slideImages.map((element, index) => (
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
                  value={2.5}
                  max={5}
                  readOnly
                  onChange={(value) => console.log(`Rated with value ${value}`)}
                />
                <p
                  style={{ margin: "auto 1px auto auto", paddingRight: "5px" }}
                >
                  13/12/2011
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
                  Cho thuê nhà trọ giá rẻ
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
                  445 Nguyễn Trãi, Thanh Xuân, Hà Nội
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
                  Ở gần:{" "}
                </p>
                <p style={{ textAlign: "left", width: "70%", margin: "0" }}>
                  {" "}
                  Đại học Hà Nội Đại học Hà NộiĐại học Hà NộiĐại học Hà Nội
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
                  Diện tích:{" "}
                </p>
                <p style={{ textAlign: "left", width: "62%", margin: "0" }}>
                  {" "}
                  72m²{" "}
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
                  Không chung chủ, có điều hoà, không có nóng lạnh, vệ sinh khép
                  kín
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
