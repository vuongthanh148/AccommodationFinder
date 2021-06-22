import React, { useCallback, useEffect, useState, useContext } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import TableManagementPost from './components/table-management-post'
import { Tabs, Row, Col } from 'antd'
import TableManagementComment from './components/table-management-comment'
import TableManagementReport from './components/table-management-report'
import TableManagementOwner from './components/table-management-owner'
import NavbarAdmin from '../../components/NavbarAdmin'
import logo_trang from '../../image/logo_ngang_trang.png'
import '../../css/login.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const { TabPane } = Tabs

import './index.scss'

const AdminPage = (props) => {
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    props.changeNavbarState(false)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email == 'admin' && password == 'admin') {
      toast.success('Đăng nhập thành công', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      setLogin(true)
    }
    else{
      toast.error('Sai tên đăng nhập hoặc mật khẩu', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  if (login) {
    return (
      <>
        <NavbarAdmin />
        <div className="admin-page">
          <Row justify="center">
            <Col span={22}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Quản lý bài đăng" key="1">
                  <TableManagementPost />
                </TabPane>
                <TabPane tab="Quản lý bình luận" key="2">
                  <TableManagementComment />
                </TabPane>
                <TabPane tab="Quản lý báo cáo" key="3">
                  <TableManagementReport />
                </TabPane>
                <TabPane tab="Quản lý tài khoản chủ nhà trọ" key="4">
                  <TableManagementOwner />
                </TabPane>
                <TabPane tab="Phân tích và thống kê" key="5">
                  Phân tích và thống kê
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </>
    )
  } else {
    return (
      <div className="login-height-1-1">
        <div className="login-background-cover login-height-1-1 login-flex login-light">
          <div className="login-overlay-secondary login-position-cover"></div>

          <div className="login-auth-2 login-position-z-index">
            <NavLink activeStyle={{ color: '#fff' }} to="/home">
              <img className="login-logo" src={logo_trang} />
            </NavLink>

            <h5 className="login-heading-line">
              <span>Đăng nhập</span>
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="login-margin">
                <div className="login-inline">
                  <input
                    className="login-input login-border-pill"
                    placeholder="Username"
                    type="text"
                    value={email}
                    required
                    onChange={(event) => {
                      setEmail(event.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="login-margin">
                <div className="login-inline">
                  <input
                    className="login-input login-border-pill"
                    placeholder="Password"
                    type="password"
                    value={password}
                    minLength="5"
                    required
                    onChange={(event) => {
                      setPassword(event.target.value)
                    }}
                  />
                </div>
              </div>
              <button type="submit" className="login-button login-border-pill">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminPage
