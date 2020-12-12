import React, { Component } from "react";
import logo from "../image/bg-img-1.jpg";
import { Slide } from "react-slideshow-image";
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
            <Slide
              autoplay={true}
              duration={2000}
              pauseOnHover={true}
              transitionDuration={750}
              canSwipe={false}
              Easing={'cubic-in'}
            >
              <div
                className="each-slide-list"
                style={{
                  backgroundImage: `url(${this.slideImages[0]})`,
                }}
              ></div>
              <div
                className="each-slide-list"
                style={{
                  backgroundImage: `url(${this.slideImages[1]})`,
                }}
              ></div>
              <div
                className="each-slide-list"
                style={{
                  backgroundImage: `url(${this.slideImages[2]})`,
                }}
              ></div>
            </Slide>
            <div className="uk-overlay overlay-gradient uk-position-bottom">
              <p className="ev-price">
                1 <small>Triệu/ Tháng</small>
              </p>
            </div>
            <div className="ev-body">
              <span
                style={{ textAlign: "center" }}
                className="ev-meta uk-text-small"
              >
                For Rent
              </span>
              <h3 className="ev-title uk-card-title uk-text-bolder uk-text-truncate uk-text-truncate">
                Luxury Home Family
              </h3>
              <p className="ev-location">
                <i className="fas fa-map-marker-alt uk-margin-small-right"></i>{" "}
                Sydney / Australia
              </p>
              <ul className="ev-info uk-subnav" style={{ textAlign: "center" }}>
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
    );
  }
}

export default List;
