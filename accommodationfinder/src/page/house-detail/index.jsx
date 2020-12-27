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
  const userContext = useContext(UserContext)
  console.log(userContext.getUserData())
  const [comment, setComment] = useState()
  const [listComment, setListComment] = useState([])
  const handleChangeComment = useCallback((event) => {
    setComment(event.target.value)
  }, [])

  // const onUploadComment = async () => {
  //   try {
  //     axios({
  //       method: 'POST',
  //       url: `${devURL}/comment/create-new-comment`,
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
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
    getAllComments()
  }, [])

  return (
    <div className="house-detail-page">
      <Row align="middle" justify="center">
        <Col span={20}>
          <h1>Details Section</h1>
          <Divider />
          <div>
            <Row>
              <Col span={1}>
                <Avatar size="large" />
              </Col>
              <Col span={23}>
                <Row align="middle" style={{ height: '85%' }}>
                  <Col>
                    <Typography>Name of user</Typography>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="end">
              <Col span={23}>
                <TextArea value={comment} onChange={handleChangeComment} />
                <Row justify="end">
                  <Button>Comment</Button>
                </Row>
              </Col>
            </Row>
          </div>
          <Divider />
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
