import React, { Component } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Post from './components/Post'
import Signup from './components/Signup'
import SignupOwner from './components/SignupOwner'
import SignupRenter from './components/SignupRenter'
import ResetPassword from './components/ResetPassword'
import axios from 'axios'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import ScrollToTop from 'react-scroll-to-top'
import './css/App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Footer from './components/Footer'
import AdminPage from './page/admin/admin'
import NewPost from './components/NewPost'

class App extends Component {
  constructor() {
    super()
    this.state = {
      navbar: true,
      isLoggedIn: false,
      userData: {},
      finishFetchUserData: false,
    }
    this.changeNavbarState = this.changeNavbarState.bind(this)
    this.updateLoginState = this.updateLoginState.bind(this)
  }

  myRef = React.createRef()

  async componentDidMount() {
    const token = localStorage.getItem('token')
    const userType = localStorage.getItem('userType')
    if (token && userType) {
      await axios({
        method: 'GET',
        url: `https://accommodation-finder.herokuapp.com/${userType}/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res)
          this.setState({
            userData: { ...res.data, userType: userType },
            isLoggedIn: true,
          })
        })
        .catch((err) => {
          console.log(err)
        })
      this.setState({
        finishFetchUserData: true,
      })
    } else {
      this.setState({
        finishFetchUserData: true,
      })
    }
  }

  updateLoginState = function (userData, isLoggedIn, event) {
    this.setState({
      userData: userData,
      isLoggedIn: isLoggedIn,
    })
    if (event) {
    }
  }

  changeNavbarState = function (newState, event) {
    this.setState({
      navbar: newState,
    })
    if (event) {
    }
  }

  render() {
    const randomLoader = Math.floor(Math.random() * 12)
    const listLoader = [
      'Audio',
      'BallTriangle',
      'Bars',
      'Circles',
      'Grid',
      'Hearts',
      'Oval',
      'Puff',
      'Rings',
      'TailSpin',
      'ThreeDots',
      'Plane',
    ]
    return (
      // this.renderedScreen(this.state.screen)
      <>
        {this.state.finishFetchUserData && (
          <Router>
            {this.state.navbar ? (
              <>
                <ScrollToTop
                  smooth="true"
                  color="#bf7c2f"
                  className="scroll-to-top"
                />
                <Navbar
                  updateLoginState={this.updateLoginState}
                  isLoggedIn={this.state.isLoggedIn}
                  userData={this.state.userData}
                />
              </>
            ) : null}
            <Switch>
              <Route path="/login">
                <Login
                  changeNavbarState={this.changeNavbarState}
                  updateLoginState={this.updateLoginState}
                  userData={this.state.userData}
                  isLoggedIn={this.state.isLoggedIn}
                />
              </Route>
              <Route path="/signup">
                <Signup
                  changeNavbarState={this.changeNavbarState}
                  updateLoginState={this.updateLoginState}
                />
              </Route>
              <Route path="/signupOwner">
                <SignupOwner
                  changeNavbarState={this.changeNavbarState}
                  updateLoginState={this.updateLoginState}
                />
              </Route>
              <Route path="/signupRenter">
                <SignupRenter
                  changeNavbarState={this.changeNavbarState}
                  updateLoginState={this.updateLoginState}
                />
              </Route>
              <Route path="/resetpassword">
                <ResetPassword
                  changeNavbarState={this.changeNavbarState}
                  updateLoginState={this.updateLoginState}
                />
              </Route>
              <Route path="/post">
                <Post />
              </Route>
              <Route path="/profile">
                <Profile
                  changeNavbarState={this.changeNavbarState}
                  updateLoginState={this.updateLoginState}
                  userData={this.state.userData}
                  isLoggedIn={this.state.isLoggedIn}
                />
              </Route>
              <Route path="/home">
                <Home
                  changeNavbarState={this.changeNavbarState}
                  updateLoginState={this.updateLoginState}
                  userData={this.state.userData}
                  isLoggedIn={this.state.isLoggedIn}
                  updateFetchingAccomod={this.updateFetchingAccomod}
                />
                <Footer />
              </Route>
              <Route path="/newpost">
                <NewPost
                  changeNavbarState={this.changeNavbarState}
                  updateLoginState={this.updateLoginState}
                  userData={this.state.userData}
                  isLoggedIn={this.state.isLoggedIn}
                  updateFetchingAccomod={this.updateFetchingAccomod}
                />
                <Footer />
              </Route>
              <Route path="/admin" exact>
                <AdminPage />
              </Route>
              <Route path="/">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </Router>
        )}
        {!this.state.finishFetchUserData && (
          <div style={{ position: 'relative', width: '100vw', height: '90vh' }}>
            <div
              style={{
                width: '200px',
                height: '200px',
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                margin: 'auto',
              }}
            >
              <Loader
                type={listLoader[randomLoader]}
                color="#bf7c2f"
                height={200}
                width={200}
              />
              <p style={{ paddingTop: '20px', fontSize: '20px' }}>Loading...</p>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default App
