import React from 'react'
import { Row, Col, Avatar, Typography, Divider } from 'antd'

const ContentComment = (props) => {
  const { content, userInfo, createdAt } = props.comment
  return (
    <>
      <Row>
        <Col span={1}>
          <Avatar size="large" src={userInfo.avatar} />
        </Col>
        <Col span={23}>
          <Row align="middle" style={{ height: '85%' }}>
            <Col>
              <Row align="bottom">
                <Typography className="username">{userInfo.name}</Typography>
                <Typography className="time-create-comment"style={{ marginLeft: '0.5rem' }}>
                  {new Date(String(createdAt)).toUTCString()}
                </Typography>
              </Row>
            </Col>
          </Row>
        </Col>
        <Row justify="end" style={{ width: '100%' }}>
          <Col span={23}>{content}</Col>
        </Row>
      </Row>
      <Divider />
    </>
  )
}

export default ContentComment
