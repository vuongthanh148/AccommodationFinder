import React, { Component } from "react";
import logo from "../image/bg-img-1.jpg";
import { Slide } from "react-slideshow-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "material-ui-rating";
import { Link }  from 'react-router-dom';
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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowed: this.props.isFollowed,
      userToken: localStorage.getItem("token"),
      userType: localStorage.getItem("userType"),
    };
    this.handleViewAccomod = this.handleViewAccomod.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }

  componentDidMount() {}

  handleViewAccomod = () => {
    console.log("xem nha ne`");
    console.log(this.state);
  };

  handleFollow = async () => {
    const that = this;
    this.setState({ isFollowed: !this.state.isFollowed }),
    await axios({
      method: "POST",
      url: `https://accommodation-finder.herokuapp.com/followChange`,
      headers: {
        Authorization: `Bearer ${this.state.userToken}`,
      },
      data: {
        accomodId: this.props.accomod._id,
      },
    }).then((res) => {
      console.log(res)
      toast.info(res.data.isFollowed?"Thêm vào danh sách yêu thích thành công!":"Huỷ yêu thích thành công!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
    });
  };

  render() {
    const { accomod } = this.props;
    // console.log(accomod);
    return (
      <div className="ev-card-1">
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
                <p style={{ paddingLeft: "8px", paddingRight: "8px" }}>
                  {accomod.watch}
                </p>
              </div>
              <div className="uk-overlay overlay-gradient">
                <p className="ev-price">
                  {accomod.price.toLocaleString("en")} <small>Đ/ Tháng</small>
                </p>
                {!this.state.isFollowed && (
                  <FontAwesomeIcon
                    onClick={this.handleFollow}
                    style={{
                      color: "white",
                      fontSize: "22px",
                      margin: "auto 0",
                      cursor: 'pointer'
                    }}
                    icon={farHeart}
                  />
                )}
                {this.state.isFollowed && (
                  <FontAwesomeIcon
                    onClick={this.handleFollow}
                    style={{
                      color: "FireBrick",
                      fontSize: "22px",
                      margin: "auto 0",
                      cursor: 'pointer'
                    }}
                    icon={fasHeart}
                  />
                )}
              </div>
              <Slide
                autoplay={true}
                duration={2000}
                pauseOnHover={true}
                transitionDuration={750}
                canSwipe={false}
              >
                {accomod.photos.map((element, index) => (
                  <div
                    className="each-slide-list"
                    style={{
                      backgroundImage: `url(${element})`,
                    }}
                    key={index}
                  ></div>
                ))}
              </Slide>
            </div>
            <Link to={`/home-detail/${accomod._id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <div className="ev-body">
                <div style={{ display: 'flex' }}>
                  <Rating
                    value={parseFloat(accomod.avgRate)}
                    max={5}
                    readOnly
                  />
                  <p style={{ margin: 'auto 0 auto auto' }}>
                    {accomod.postedDate
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('/')}
                  </p>
                </div>
                <div
                  className="title"
                  style={{
                    fontSize: '19px',
                    fontWeight: '550',
                    textAlign: 'left',
                    margin: '0',
                  }}
                >
                  <p
                    style={{
                      margin: '0',
                      textAlign: 'left',
                      paddingLeft: '5px',
                    }}
                  >
                    {accomod.title}
                  </p>
                </div>
                <div className="flex-row">
                  <FontAwesomeIcon
                    style={{ color: '#bf7c2f' }}
                    icon={fasMapMarkedAlt}
                  />
                  <p
                    style={{
                      paddingRight: '5px',
                      paddingLeft: '7px',
                      textAlign: 'left',
                      margin: '0',
                      fontWeight: '600',
                    }}
                  >
                    Địa chỉ:
                  </p>
                  <p style={{ textAlign: 'left', width: '66%', margin: '0' }}>
                    {accomod.houseNumber} {accomod.street}, {accomod.ward},{' '}
                    {accomod.district}, {accomod.city}
                  </p>
                </div>
                <div className="flex-row">
                  <FontAwesomeIcon
                    style={{ color: '#bf7c2f' }}
                    icon={fasPlaceOfWorship}
                  />
                  <p
                    style={{
                      paddingRight: '5px',
                      paddingLeft: '7px',
                      textAlign: 'left',
                      margin: '0',
                      fontWeight: '600',
                    }}
                  >
                    Ở gần:
                  </p>
                  <p style={{ textAlign: 'left', width: '70%', margin: '0' }}>
                    {accomod.publicPlace}
                  </p>
                </div>
                <div className="flex-row">
                  <FontAwesomeIcon
                    style={{ color: '#bf7c2f' }}
                    icon={fasHome}
                  />
                  <p
                    style={{
                      paddingRight: '5px',
                      paddingLeft: '7px',
                      textAlign: 'left',
                      margin: '0',
                      fontWeight: '600',
                    }}
                  >
                    Diện tích:
                  </p>
                  <p style={{ textAlign: 'left', width: '62%', margin: '0' }}>
                    {accomod.livingArea}m²
                  </p>
                </div>
                <div className="flex-row">
                  .
                  <FontAwesomeIcon
                    style={{ color: '#bf7c2f' }}
                    icon={fasBath}
                  />
                  <p
                    style={{
                      paddingRight: '5px',
                      paddingLeft: '7px',
                      textAlign: 'left',
                      margin: '0',
                      fontWeight: '600',
                    }}
                  >
                    CSVC:
                  </p>
                  <p style={{ textAlign: 'left', width: '100%', margin: '0' }}>
                    {accomod.seperateAccomodation
                      ? 'Không chung chủ'
                      : 'Chung chủ'}
                    ,{' '}
                    {accomod.materialFacilities.airConditional
                      ? 'có điều hoà'
                      : 'không có điều hoà'}
                    ,{' '}
                    {accomod.materialFacilities.electricWaterHeater
                      ? 'có nóng lạnh'
                      : 'không có nóng lạnh'}
                    ,{' '}
                    {accomod.materialFacilities.bathroom.seperate
                      ? 'vệ sinh khép kin'
                      : 'vệ sinh chung'}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
