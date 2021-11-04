import React, { Component, useEffect, useRef } from 'react'
import '../css/Homepage.css'
import axios from 'axios'
import Headroom from 'react-headroom'
import { Price, Area } from '../data/searchBar'
import Select, { components } from 'react-select'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'
import Listing from './Listing'
import Loader from 'react-loader-spinner'
import { getCities, getDistricts, getLocationFromCoords, getPublicLocations, getWards } from '../apis/location'
import { getFollowList } from '../apis/user'
import { searchAccomod } from '../apis/accomod'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.changeNavbarState(true)
  }
  render() {
    const randomLoader = Math.floor(Math.random() * 12)
    return (
      <div className="App">
        <Cover />
        <Search
          randomLoader={randomLoader}
          isLoggedIn={this.props.isLoggedIn}
          userData={this.props.userData}
        />
      </div>
    )
  }
}
let myRef = React.createRef()
export default Home

class Cover extends Component {
  constructor() {
    super()
    // this.myRef = React.createRef()
  }
  executeScroll = () => myRef.current.scrollIntoView()
  slideImages = [
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/edc-web-house-tour-fuller07-1586874956.jpg',
    'https://propholic.com/wp-content/uploads/2018/08/NKR_20180808_0343.jpg',
    'https://news.mogi.vn/wp-content/uploads/2019/03/cach-khac-phuc-loi-treo-dong-ho-phong-khach-chan-van-may-gia-chu-anh-4.jpg',
  ]
  render() {
    return (
      <div className="slide-container">
        <div className=" homecover-text-center">
          <h1 className="homecover-text-bold" style={{ color: 'white' }}>
            Discover The Best Accommodations{' '}
          </h1>
          <h4 className="homecover-margin" style={{ color: 'white' }}>
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
    )
  }
}

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      divAppearance: 'none',
      className: '',
      list_city: [],
      list_district: [],
      list_ward: [],
      list_accomod: [],
      list_location: [],
      selectedOptionCity: '',
      selectedOptionDistrict: '',
      selectedOptionWard: '',
      livingArea: { value: '200', label: 'Dưới 200m²' },
      publicPlace: undefined,
      price: { value: '10000000', label: 'Dưới 10 triệu' },
      chooseAirConditioner: false,
      chooseElectricWaterHeater: false,
      chooseAccomod: false,
      chooseBathroom: false,
      chooseSeperateKitchen: false,
      airConditioner: true,
      electricWaterHeater: true,
      seperateAccommodation: true,
      bathroom: true,
      kitchen: true,
      accommodationInfo: {},
      facilitiesInfo: {},
      finishFetchingAccomod: false,
      list_follow: [],
    }

    this.getAccomod = this.getAccomod.bind(this)
    this.updateFetchingAccomod = this.updateFetchingAccomod.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  updateFetchingAccomod = (finish, event) => {
    this.setState({
      finishFetchingAccomod: finish,
    })
    if (event) {
    }
  }

  getPosition = (getAccomod) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const curPos = await getLocationFromCoords({lat: position.coords.latitude, lon: position.coords.longitude})
        if(curPos){
          console.log(curPos)
          var city = curPos.data.localityInfo.administrative.find(a => a.adminLevel === 4);
          var district = curPos.data.localityInfo.administrative.find(a => a.adminLevel === 6);
          var ward = curPos.data.localityInfo.administrative.find(a => a.adminLevel === 8);

          this.state.list_city.forEach(async (c) => {
            if (c.label === city.name) {
              this.setState({
                selectedOptionCity: c
              })
              const fetchedDistricts = await getDistricts({cID: c.ID})

              if(fetchedDistricts){
                const districtsOption = fetchedDistricts.data.map((item) => {
                  return {
                    ID: item.ID,
                    type: 'district',
                    value: this.removeAccents(item.Title),
                    label: item.Title,
                  }
                })
                this.setState({ list_district: districtsOption })
                console.log(district)
                districtsOption.forEach(async (d) => {
                  if (d.value === this.removeAccents(district.name)) {
                    this.setState({
                      selectedOptionDistrict: d
                    })
                    if(ward){
                      const fetchedWard = await getWards({dID: d.ID})
                      if(fetchedWard){
                        const wardOption = fetchedWard.data.map((item) => {
                          return {
                            ID: item.ID,
                            type: 'ward',
                            value: this.removeAccents(item.Title),
                            label: item.Title,
                          }
                        })
                        wardOption.forEach(w => {
                          if(w.value === this.removeAccents(ward.name)){
                            this.setState({
                              selectedOptionWard: w
                            })
                          }
                        })
                      }
                    }
                  }
                })

                //Handle prepare data to send
                this.setState({
                  accommodationInfo: {
                    city: city.name,
                    district: district.name.replace("District ", ""),
                  },
                })
                if (ward !== undefined) {
                  this.setState({
                    accommodationInfo: {
                      ward: ward.name.replace(
                        'Phường ',
                        ''
                      ),
                    },
                  })
                }
                getAccomod()
              }
            }
          })
        }
      },
      () => {
        //Get all accomod
        getAccomod()
        
      },
      this.options
    )
  }

  getAccomod = async () => {
    var that = this
    const data_to_send = {
      accommodationInfo: {
        ...that.state.accommodationInfo,
        publicPlace: that.state.publicPlace
          ? that.state.publicPlace.label
          : undefined,
        seperateAccommodation: that.state.chooseAccomod
          ? that.state.seperateAccommodation
          : undefined,
      },
      facilitiesInfo: that.state.facilitiesInfo,
      price: that.state.price.value,
      livingArea: that.state.livingArea.value,
    }

    console.log('data_to_send: ', data_to_send)

    if (Object.keys(this.props.userData).length !== 0) {
      console.log('get token: ', localStorage.getItem('token'))
      const followList = await getFollowList({_id: this.props.userData._id,})
      if(followList){
        this.setState({
          list_follow: followList.data,
        })
      }
    } else console.log('Chưa đăng nhập')

    const listAccomod = await searchAccomod(data_to_send)
    if(listAccomod){
      const allAccomod = listAccomod.data.allAccomod
      const filteredAccomod = allAccomod.filter((a) => a.pending === false)
      that.setState({
        list_accomod: filteredAccomod,
      })
      that.updateFetchingAccomod(true)
    }

  }

  removeAccents(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .replace(/Quan |Huyen |Thi Xa |Thanh Pho |District |Phuong /g, '')
  }

  async componentDidMount() {
    const fetchedCities = await getCities()
    if(fetchedCities){
      const cities = fetchedCities.data.LtsItem.map((item) => {
        return {
          ID: item.ID,
          type: 'city',
          value: this.removeAccents(item.Title),
          label: item.Title,
        }
      })
      this.setState({ list_city: cities })
      if (Object.keys(this.state.accommodationInfo).length === 0) {
        // //"accomod: ", this.state.accommodationInfo);
        this.getPosition(this.getAccomod)
      }
      else console.log(this.state.accommodationInfo)
    }

    const publicLocation = await getPublicLocations()
    if(publicLocation){
      this.setState({
        list_location: publicLocation.data.map((l) => {
          return { value: l.name, label: l.name }
        }),
      })
    }
  }

  changeState = () => {
    if (!this.state.divAppearance) {
      this.setState({
        divAppearance: 'none',
        className: '',
      })
    } else {
      this.setState({
        divAppearance: '',
        className: 'search-open',
      })
    }
  }

  handleLocationChange = (selectedOption) => {
    let url = '', typeOption = ''
    if (selectedOption) {
      if (selectedOption.type === 'city') {
        this.setState({
          selectedOptionCity: selectedOption,
          selectedOptionDistrict: '',
          selectedOptionWard: '',
        })
        url = `https://thongtindoanhnghiep.co/api/city/${selectedOption.ID}/district`
        typeOption = 'district'
      } else if (selectedOption.type === 'district') {
        this.setState({
          selectedOptionDistrict: selectedOption,
          selectedOptionWard: '',
        })
        url = `https://thongtindoanhnghiep.co/api/district/${selectedOption.ID}/ward`
        typeOption = 'ward'
      } else if (selectedOption.type === 'ward') {
        this.setState({ selectedOptionWard: selectedOption })
        return
      }
      axios.get(url).then((res) => {
        const finalData = res.data.map((item) => {
          return {
            ID: item.ID,
            type: typeOption,
            value: this.removeAccents(item.Title),
            label: item.Title,
          }
        })
        if (typeOption === 'district')
          this.setState({ list_district: finalData })
        else if (typeOption === 'ward') this.setState({ list_ward: finalData })
      })
    } else {
      this.setState({
        selectedOptionCity: '',
        selectedOptionDistrict: '',
        selectedOptionWard: '',
        list_district: [],
        list_ward: [],
      })
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    myRef.current.scrollIntoView()
    this.updateFetchingAccomod(false)
    this.setState(
      {
        accommodationInfo: {
          city:
            this.state.selectedOptionCity !== ''
              ? this.state.selectedOptionCity.label.replace(
                  /Quận |Thị Xã |Thành Phố |Huyện |Phường |District /g,
                  ''
                )
              : undefined,
          district:
            this.state.selectedOptionDistrict !== ''
              ? this.state.selectedOptionDistrict.label.replace(
                  /Quận |Thị Xã |Thành Phố |Huyện |Phường |District /g,
                  ''
                )
              : undefined,
          ward:
            this.state.selectedOptionWard !== ''
              ? this.state.selectedOptionWard.label.replace(
                  /Quận |Thị Xã |Thành Phố |Huyện |Phường |District /g,
                  ''
                )
              : undefined,
        },
        facilitiesInfo: {
          airConditioner: this.state.chooseAirConditioner
            ? this.state.airConditioner
            : undefined,
          bathroom: this.state.chooseBathroom ? this.state.bathroom : undefined,
          kitchen: this.state.chooseSeperateKitchen
            ? this.state.kitchen
              ? 'closed'
              : 'shared'
            : undefined,
          electricWaterHeater: this.state.chooseElectricWaterHeater
            ? this.state.electricWaterHeater
            : undefined,
        },
      },
      () => {
        // //this.state);
        this.getAccomod()
      }
    )
  }

  render() {
    const {
      selectedOptionCity,
      selectedOptionDistrict,
      selectedOptionWard,
      price,
      livingArea,
      publicPlace,
    } = this.state
    let searchBackColor = 'rgba(255,255,255, 0.95)'
    const accomods = this.state.list_accomod

    return (
      <>
        <div className="search-section">
          <div className="search-container">
            <div ref={myRef} className="search-title">
              <p>Find Your</p>
              <h3>Perfect Accommodation</h3>
            </div>
            <Headroom
              pinStart={window.innerHeight + 116 + 80}
              upTolerance={40}
              disable={window.innerWidth < 1366 ? true : false}
              style={{
                width: '90vw',
                margin: 'auto',
                backgroundColor: searchBackColor,
                paddingTop: '10px',
                zIndex: '11',
                paddingRight: '1px',
                paddingLeft: '2px',
                borderBottom: '1px solid #D3D3D3',
                borderRadius: '8px',
              }}
            >
              <form
                onSubmit={this.handleSubmit}
                className="search-grid-small search-grid"
              >
                <div className="search-width">
                  <div className="search-margin">
                    <div className="search-width-1-1 search-inline">
                      <Select
                        components={{
                          Menu: (props) => (
                            <components.Menu
                              {...props}
                              className="menu"
                            ></components.Menu>
                          ),
                        }}
                        isClearable="true"
                        className="list-cities"
                        value={selectedOptionCity}
                        onChange={this.handleLocationChange}
                        placeholder={'Thành phố'}
                        options={this.state.list_city}
                      />
                    </div>
                  </div>
                </div>

                <div className="search-width">
                  <div className="search-margin">
                    <div className="search-width-1-1 search-inline">
                      <Select
                        components={{
                          Menu: (props) => (
                            <components.Menu
                              {...props}
                              className="menu"
                            ></components.Menu>
                          ),
                        }}
                        isClearable="true"
                        className="list-district"
                        value={selectedOptionDistrict}
                        placeholder={'Quận/Huyện'}
                        onChange={this.handleLocationChange}
                        options={this.state.list_district}
                      />
                    </div>
                  </div>
                </div>

                <div className="search-width">
                  <div className="search-margin">
                    <div className="search-width-1-1 search-inline">
                      <Select
                        components={{
                          Menu: (props) => (
                            <components.Menu
                              {...props}
                              className="menu"
                            ></components.Menu>
                          ),
                        }}
                        isClearable="true"
                        className="list-ward"
                        value={selectedOptionWard}
                        placeholder={'Phường/Xã'}
                        onChange={this.handleLocationChange}
                        options={this.state.list_ward}
                      />
                    </div>
                  </div>
                </div>

                <div className="search-width">
                  <div className="search-margin">
                    <div className="search-width-1-1 search-inline">
                      <Select
                        components={{
                          Menu: (props) => (
                            <components.Menu
                              {...props}
                              className="menu"
                            ></components.Menu>
                          ),
                        }}
                        isClearable="true"
                        className="list-location"
                        placeholder="Gần địa điểm"
                        value={publicPlace}
                        options={this.state.list_location}
                        onChange={(publicPlace) =>
                          this.setState({ publicPlace })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="search-width">
                  <div className="search-margin">
                    <div className="search-width-1-1 search-inline">
                      <Select
                        components={{
                          Menu: (props) => (
                            <components.Menu
                              {...props}
                              className="menu"
                            ></components.Menu>
                          ),
                        }}
                        isClearable="true"
                        className="list-price"
                        placeholder="Giá"
                        defaultValue={Price[6]}
                        value={price}
                        options={Price}
                        onChange={(price) => this.setState({ price })}
                      />
                    </div>
                  </div>
                </div>

                <div className="search-width">
                  <div className="search-margin">
                    <div className="search-width-1-1 search-inline">
                      <Select
                        components={{
                          Menu: (props) => (
                            <components.Menu
                              {...props}
                              className="menu"
                            ></components.Menu>
                          ),
                        }}
                        isClearable="true"
                        className="list-area"
                        placeholder="Diện tích"
                        defaultValue={Area[6]}
                        value={livingArea}
                        options={Area}
                        onChange={(livingArea) => this.setState({ livingArea })}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="search-width-1-1@s search-width-5-6@m"
                  style={{ height: '90px', margin: '0' }}
                >
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
                          <div className="search-grid-small search-grid other-feature">
                            <div className="search-other-margin">
                              <input
                                className="search-checkbox"
                                type="checkbox"
                                onChange={() => {
                                  this.setState((prevState) => ({
                                    chooseAccomod: !prevState.chooseAccomod,
                                  }))
                                }}
                              />
                              <label
                                className="label-hover"
                                onClick={() => {
                                  this.setState({
                                    seperateAccommodation: !this.state
                                      .seperateAccommodation,
                                  })
                                }}
                              >
                                {this.state.seperateAccommodation
                                  ? 'Không chung chủ'
                                  : 'Chung chủ'}
                              </label>
                            </div>

                            <div className="search-other-margin ">
                              <input
                                className="search-checkbox"
                                type="checkbox"
                                onChange={() => {
                                  this.setState((prevState) => ({
                                    chooseAirConditioner: !prevState.chooseAirConditioner,
                                  }))
                                }}
                              />
                              <label
                                className="label-hover"
                                onClick={() => {
                                  this.setState({
                                    airConditioner: !this.state.airConditioner,
                                  })
                                }}
                              >
                                {this.state.airConditioner
                                  ? 'Điều hoà'
                                  : 'Không điều hoà'}
                              </label>
                            </div>

                            <div className="search-other-margin ">
                              <input
                                className="search-checkbox"
                                type="checkbox"
                                onChange={() => {
                                  this.setState((prevState) => ({
                                    chooseElectricWaterHeater: !prevState.chooseElectricWaterHeater,
                                  }))
                                }}
                              />
                              <label
                                className="label-hover"
                                onClick={() => {
                                  this.setState({
                                    electricWaterHeater: !this.state
                                      .electricWaterHeater,
                                  })
                                }}
                              >
                                {this.state.electricWaterHeater
                                  ? 'Nóng lạnh'
                                  : 'Không nóng lạnh'}
                              </label>
                            </div>

                            <div className="search-other-margin ">
                              <input
                                className="search-checkbox"
                                type="checkbox"
                                onChange={() => {
                                  this.setState((prevState) => ({
                                    chooseBathroom: !prevState.chooseBathroom,
                                  }))
                                }}
                              />
                              <label
                                className="label-hover"
                                onClick={() => {
                                  this.setState({
                                    bathroom: !this.state.bathroom,
                                  })
                                }}
                              >
                                {this.state.bathroom
                                  ? 'Vệ sinh riêng'
                                  : 'Vệ sinh chung'}
                              </label>
                            </div>
                            <div className="search-other-margin ">
                              <input
                                className="search-checkbox"
                                type="checkbox"
                                onChange={() => {
                                  this.setState((prevState) => ({
                                    chooseSeperateKitchen: !prevState.chooseSeperateKitchen,
                                  }))
                                }}
                              />
                              <label
                                className="label-hover"
                                onClick={() => {
                                  this.setState({
                                    kitchen: !this.state.kitchen,
                                  })
                                }}
                              >
                                {this.state.kitchen ? 'Bếp riêng' : 'Bếp chung'}
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
            </Headroom>
            {this.state.finishFetchingAccomod && (
              <Listing
                list_accomod={accomods}
                myRef={myRef}
                isLoggedIn={this.props.isLoggedIn}
                userData={this.props.userData}
                list_follow={this.state.list_follow}
              />
            )}
            {!this.state.finishFetchingAccomod && (
              <div
                style={{ position: 'relative', width: '90vw', height: '300px' }}
              >
                <div
                  style={{
                    width: '150px',
                    height: '150px',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    bottom: '0',
                    left: '0',
                    margin: 'auto',
                  }}
                >
                  <Loader
                    type={'Bars'}
                    color="#bf7c2f"
                    height={200}
                    width={200}
                  />
                  <p style={{ paddingTop: '20px', fontSize: '20px' }}>
                    Loading data...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}
