import React, { useCallback, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Row, Col, Divider, Button, Avatar, Input, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer'
import { devURL } from '../../constants/api'
import { UserContext } from '../../context/user.context'
const { TextArea } = Input

import './index.scss'
import ContentComment from './components/ContentComment'

const HomeDetailPage = () => {
  const params = useParams()

  const [comment, setComment] = useState()
  const [listComment, setListComment] = useState([])

  const userContext = useContext(UserContext)

  const { avatar, name, userType } = userContext.userData

  const handleChangeComment = useCallback((event) => {
    setComment(event.target.value)
  }, [])

  const getAllComments = async () => {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:4000/comment/get-all-comments',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        accommodationId: params.id,
      },
    })
    setListComment(res.data.comments)
  }

  const onUploadComment = useCallback(async () => {
    try {
      await axios({
        method: 'POST',
        url: `${devURL}/comment/create-new-comment`,
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

  useEffect(() => {
    getAllComments()
  }, [])

  return (
    <div className="house-detail-page">
      <Row align="middle" justify="center">
        <Col span={20}>
          <h1>Details Section</h1>
          <Divider orientation="left">COMMENTS</Divider>
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
                    <Button className="button-upload-comment" onClick={onUploadComment}>Comment</Button>
                  </Row>
                </Col>
              </Row>
              <Divider />
            </>
          )}

          <>
            {listComment.map((comment, index) => (
              <ContentComment comment={comment} key={comment._id} />
            ))}
          </>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

export default HomeDetailPage
