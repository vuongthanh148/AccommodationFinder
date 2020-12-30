import React, { useCallback, useState, useEffect, useContext, useMemo } from 'react'
import axios from 'axios'
import { Row, Col, Divider, Button, Avatar, Input, Typography, Rate, Image } from 'antd'
import { useLocation, useParams } from 'react-router-dom'
import Footer from '../../components/Footer'
import { baseURL, productionURL } from '../../constants/api'
import { UserContext } from '../../context/user.context'
import moment from 'moment'
import ContentComment from './components/ContentComment'
import {
  faHeart as fasHeart,
  faEye as fasEye,
  faMapMarkedAlt as fasMapMarkedAlt,
  faPlaceOfWorship as fasPlaceOfWorship,
  faHome as fasHome,
  faBath as fasBath,
  faUser,
  faPhone,
  faDonate,
} from '@fortawesome/free-solid-svg-icons'
import HouseInfo from './components/HouseInfo'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'

import './index.scss'

const { TextArea } = Input

const HomeDetailPage = () => {
  const params = useParams()

  const [comment, setComment] = useState()
  const [listComment, setListComment] = useState([])
  const [accommodation, setAccommodation] = useState({})
  const [infoPost, setInfoPost] = useState({})
  const [rate, setRate] = useState(null)
  const location = useLocation()
  const userContext = useContext(UserContext)

  const { avatar, name, userType, userId: _id } = userContext.userData

  useEffect(() => {
    handleGetDetailsData()
    getAllComments()
    analystPage()
    if (userContext.userData.userType) {
      handleGetInfoPost()
    }
  }, [])

  const handleChangeComment = useCallback((event) => {
    setComment(event.target.value)
  }, [])

  const handleGetDetailsData = async () => {
    const result = await axios({
      method: 'GET',
      url: `${productionURL}/accommodation/${params.id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(result.data)
    setAccommodation(result.data)
  }

  const getAllComments = async () => {
    const res = await axios({
      method: 'POST',
      url: `${baseURL}/comment/get-all-comments`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        accommodationId: params.id,
      },
    })
    setListComment(res.data.comments)
  }

  const analystPage = async () => {
    await axios({
      method: 'POST',
      url: `${baseURL}/accommodation/analyst`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        accommodationId: params.id,
      },
    })
  }

  const onUploadComment = useCallback(async () => {
    try {
      await axios({
        method: 'POST',
        url: `${baseURL}/comment/create-new-comment`,
        headers: {
          'Context-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          content: comment,
          accommodationId: params.id,
        },
      })
      await getAllComments()
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }, [comment])

  const handleChangeRate = (r) => {
    console.log(userContext.userData)
    setRate(r)
    axios({
      method: 'POST',
      url: `${baseURL}/rating`,
      headers: {
        'Context-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        ratedStar: r,
        accommodationId: params.id,
        userId: userContext.userData._id,
      },
    })
  }

  const handleFollow = async () => {
    try {
      await axios({
        method: 'POST',
        url: `${baseURL}/accommodation/follow`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          accommodationId: params.id,
        },
      })
      handleGetInfoPost()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnfollow = async () => {
    try {
      await axios({
        method: 'POST',
        url: `${baseURL}/accommodation/unfollow`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          accommodationId: params.id,
        },
      })
      handleGetInfoPost()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetInfoPost = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `${baseURL}/accommodations/${params.id}/info`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setInfoPost(result.data.result)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = () => {
    if (infoPost.isFollowed) {
      handleUnfollow()
    } else {
      handleFollow()
    }
  }

  // const detailSection = <div></div>

  const detailSection = useMemo(() => {
    let {
      photos,
      accommodationType,
      avgRate,
      city,
      district,
      livingArea,
      materialFacilities,
      ownerName,
      ownerPhone,
      price,
      publicPlace,
      street,
      postedDate,
      houseNumber,
      title,
      ward,
    } = accommodation
    const { userType } = userContext.userData
    photos = photos || []
    avgRate = avgRate || ''
    city = city || ''
    district = district || ''
    livingArea = livingArea = ''
    materialFacilities = materialFacilities || []
    ownerName = ownerName || ''
    ownerPhone = ownerPhone || ''
    price = price || ''
    publicPlace = publicPlace || ''
    street = street || ''
    postedDate = postedDate || ''
    houseNumber = houseNumber || ''
    title = title || ''
    ward = ward || ''
    const infoHouse = [
      {
        title: 'Địa chỉ',
        content: street ? `${houseNumber} ${street}, ${ward}, ${district}, ${city}` : '',
        icon: fasMapMarkedAlt,
      },
      {
        title: 'Ở gần',
        content: publicPlace,
        icon: fasPlaceOfWorship,
      },
      {
        title: 'Diện tích',
        content: `${livingArea} m²`,
        icon: fasHome,
      },
      {
        title: 'Chủ nhà',
        content: `${ownerName}`,
        icon: faUser,
      },
      {
        title: 'Liên hệ',
        content: `${ownerPhone}`,
        icon: faPhone,
      },
      {
        title: 'Giá',
        content: `${Number(price).toLocaleString('en')}`,
        icon: faDonate,
      },
    ]
    return (
      <div className="details-section">
        <Divider orientation="left">Details</Divider>
        <Row>
          <Col span={14}>
            {/* <Image src={photos[1]} width={700} height={500} /> */}
            <div style={{ width: '90%', height: '400px' }}>
              <Slide autoplay={true} duration={2000} pauseOnHover={true} transitionDuration={750} canSwipe={true}>
                {photos.map((element, index) => (
                  <div
                    style={{
                      backgroundImage: `url(${element})`,
                      width: '100%',
                      height: '400px',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: '50% 50%',
                      overflow: 'hidden',
                    }}
                    key={index}
                  ></div>
                ))}
              </Slide>
            </div>
          </Col>
          <Col span={10}>
            <Row align="middle">
              <div className="house-details-title">{title}</div>
              {userType === 'renter' && (
                <div className={`follow-btn ${infoPost.isFollowed ? 'follow' : 'unfollow'}`} onClick={handleSubmit}>
                  {infoPost.isFollowed ? 'Unfollow' : 'Follow'}
                </div>
              )}
            </Row>
            <Row>
              <Typography.Paragraph>{`Ngày đăng bài: ${moment(postedDate).format(
                'hh:mm MMMM Do YYYY'
              )} `}</Typography.Paragraph>
            </Row>
            <Row style={{ padding: '0.5rem 0' }} align="middle">
              <Typography.Paragraph strong style={{ fontSize: '1rem' }}>
                Đánh giá chung:
              </Typography.Paragraph>
              <Rate value={avgRate} disabled />
            </Row>
            <Row align="middle" style={{ paddingBottom: '0.5rem' }}>
              {userType === 'renter' && (
                <>
                  <Typography.Paragraph strong style={{ fontSize: '1rem' }}>
                    Đánh giá của bạn:
                  </Typography.Paragraph>
                  <Rate value={rate ? rate : infoPost.rate} onChange={handleChangeRate} />
                </>
              )}
            </Row>
            <Row style={{ marginTop: '1rem' }}>
              {infoHouse.map((info, idx) => {
                const { title, icon, content } = info
                return <HouseInfo title={title} key={idx} icon={icon} content={content} />
              })}
            </Row>
          </Col>
        </Row>
      </div>
    )
  }, [rate, infoPost])

  const commentSection = useMemo(() => {
    return (
      <>
        {userType === 'renter' && (
          <>
            <Row>
              <Col span={1}>
                <Avatar size="large" src={avatar} />
              </Col>
              <Col span={23}>
                <Row align="middle" style={{ height: '85%' }}>
                  <Col>
                    <Typography>{name}</Typography>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="end">
              <Col span={23}>
                <TextArea value={comment} onChange={handleChangeComment} />
                <Row justify="end">
                  <Button className="button-upload-comment" onClick={onUploadComment}>
                    Comment
                  </Button>
                </Row>
              </Col>
            </Row>
            <Divider />
            <>
              {listComment.map((comment, index) => (
                <ContentComment comment={comment} key={comment._id} />
              ))}
            </>
          </>
        )}
      </>
    )
  }, [userType, listComment])

  return (
    <div className="house-detail-page">
      <Row align="middle" justify="center">
        <Col span={20}>
          {detailSection}
          <Divider orientation="left">COMMENTS</Divider>
          {commentSection}
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

export default HomeDetailPage
