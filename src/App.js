import React, { Component, Suspense } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Post from './components/Post'
import Signup from './components/Signup'
import SignupOwner from './components/SignupOwner'
import SignupRenter from './components/SignupRenter'
import ResetPassword from './components/ResetPassword'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import ScrollToTop from 'react-scroll-to-top'
import './css/App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import NavbarAdmin from './components/NavbarAdmin'
import Chatbox from './page/chat/Chatbox/Chatbox'
import Profile from './components/Profile'
import Footer from './components/Footer'
import { UserContext } from './context/user.context'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getUserProfile } from './apis/user'
const HomeDetailPage = React.lazy(() => import('./page/house-detail'))
const NewPost = React.lazy(() => import('./components/NewPost'))
const AdminPage = React.lazy(() => import('./page/admin/admin'))

class App extends Component {
  static contextType = UserContext
  constructor() {
    super()
    this.state = {
      navbar: true,
      isLoggedIn: false,
      userData: {},
      finishFetchUserData: false,
      listAvatar: ['111']
    }
    this.changeNavbarState = this.changeNavbarState.bind(this)
    this.updateLoginState = this.updateLoginState.bind(this)
    this.updateListAvatar = this.updateListAvatar.bind(this)
  }
  updateListAvatar = (newList) => {
    this.setState({
      listAvatar: newList
    })
  }
  myRef = React.createRef()

  async componentDidMount() {
    const token = localStorage.getItem('token')
    const userType = localStorage.getItem('userType')
    if (token && userType) {
      const res = await getUserProfile({userType: userType})
      if(res) {
        this.setState({
          userData: { ...res.data, userType: userType },
          isLoggedIn: true,
        })
        this.context.setUserData({ ...res.data, userType: userType })
      }
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
  }

  changeNavbarState = function (newState, event) {
    this.setState({
      navbar: newState,
    })
  }

  render() {
    return (
      // this.renderedScreen(this.state.screen)

      <Suspense
        fallback={
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
              <Loader type={'Bars'} color="#bf7c2f" height={200} width={200} />
              <p style={{ paddingTop: '20px', fontSize: '20px' }}>Loading...</p>
            </div>
          </div>
        }
      >
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
        {this.state.finishFetchUserData && (
          <Router>
            {this.state.navbar ? (
              <>
                <ScrollToTop smooth="true" color="#bf7c2f" className="scroll-to-top" />
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
                <Signup changeNavbarState={this.changeNavbarState} updateLoginState={this.updateLoginState} />
              </Route>
              <Route path="/signupOwner">
                <SignupOwner changeNavbarState={this.changeNavbarState} updateLoginState={this.updateLoginState} />
              </Route>
              <Route path="/signupRenter">
                <SignupRenter changeNavbarState={this.changeNavbarState} updateLoginState={this.updateLoginState} />
              </Route>
              <Route path="/resetpassword">
                <ResetPassword changeNavbarState={this.changeNavbarState} updateLoginState={this.updateLoginState} />
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
                  listAvatar={this.state.listAvatar}
                  updateListAvatar={this.updateListAvatar}
                />
                <Footer />
              </Route>
              <Route path="/admin/chat" exact>
                <NavbarAdmin />
                <Chatbox
                  userId={this.state.userData._id}
                  userName={this.state.userData.name}
                  userAvatar={this.state.userData.avatar}
                  role={'admin'}
                  changeNavbarState={this.changeNavbarState}
                />
              </Route>
              <Route path="/admin" exact>
                <AdminPage changeNavbarState={this.changeNavbarState} />
              </Route>
              <Route path="/chat" exact>
                {this.state.userData.userType !== 'renter' && (
                  <Chatbox
                    userId={this.state.userData._id}
                    userName={this.state.userData.name}
                    userAvatar={this.state.userData.avatar}
                    role={'owner'}
                  />
                )}
                {this.state.userData.userType === 'renter' && <Redirect to="/home" />}
              </Route>
              <Route path="/home-detail/:id">
                <HomeDetailPage />
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
              <Loader type={'Bars'} color="#bf7c2f" height={200} width={200} />
              <p style={{ paddingTop: '20px', fontSize: '20px' }}>Loading...</p>
            </div>
          </div>
        )}
      </Suspense>
    )
  }
}

export default App
