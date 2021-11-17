import React, { useCallback, useEffect, useState, useContext } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { UserContext } from '../context/user.context'
import '../css/login.css'
import logo_trang from '../image/logo_ngang_trang.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { handleLogin } from '../apis/user'

const Login = (props) => {
  const [email, setEmail] = useState('bluedragon3105@gmail.com')
  const [password, setPassword] = useState('hanoi123')
  const [status, setStatus] = useState('')
  const [userType, setUserType] = useState('owner')
  const [userData, setUserData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const userContext = useContext(UserContext)

  useEffect(() => {
    props.changeNavbarState(false)
    //check if logged in so move to home
    setIsLoggedIn(props.isLoggedIn)
    setUserData(props.userData)
  }, [])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      try{
        const res = await handleLogin({userType: userType, email: email, password: password})
        if(res){
          //Saving token to local storage
          localStorage.setItem(
            `token`,
            res.data.user.tokens[res.data.user.tokens.length - 1].token
          )
          localStorage.setItem(`userType`, userType)
          setUserData({
            ...res.data.user,
            userType: userType,
          })
          setIsLoggedIn(true)
          props.updateLoginState({ ...res.data.user, userType: userType }, true)
          userContext.setUserData({ ...res.data.user, userType: userType })
        }
      }
      catch(e) {
        toast.error(e.response.data, {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    },
    [email, password, userType]
  )

  return (
    <>
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
      {!isLoggedIn && (
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
                      placeholder="Email"
                      type="email"
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
                      minLength="8"
                      required
                      onChange={(event) => {
                        setPassword(event.target.value)
                      }}
                    />
                  </div>
                </div>

                <div className="login-margin login-text-left login-text-small">
                  Bạn là:
                  <input
                    className="login-radio margin"
                    type="radio"
                    name="typeUser"
                    id="owner"
                    required
                    defaultChecked={true}
                    onChange={() => setUserType('owner')}
                  />
                  <label>Chủ trọ</label>
                  <input
                    className="login-radio margin"
                    type="radio"
                    name="typeUser"
                    id="renter"
                    onChange={() => setUserType('renter')}
                  />
                  <label>Người thuê trọ</label>
                </div>

                <div className="login-margin login-text-left login-text-small">
                  <label>
                    <input className="login-checkbox" type="checkbox" /> Nhớ mật
                    khẩu
                  </label>
                </div>
                <button className="login-button login-border-pill">
                  Đăng nhập
                </button>

                <div className="login-margin login-text-small">
                  <p
                    style={{
                      fontStyle: 'italic',
                      color: 'red',
                      fontSize: '13px',
                    }}
                  >
                    {status}
                  </p>
                  Bạn chưa có tài khoản?{' '}
                  <NavLink
                    className="login-link-primary login-text-bold"
                    activeStyle={{ color: '#fff' }}
                    to="/signup"
                  >
                    Đăng ký
                  </NavLink>
                  <NavLink
                    className="login-margin login-display-block"
                    activeStyle={{ color: '#fff' }}
                    to="/resetpassword"
                  >
                    Quên mật khẩu?
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && <Redirect to="/home" />}
    </>
  )
}

export default Login
