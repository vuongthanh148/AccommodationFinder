import React, { useState } from 'react'

export const UserContext = React.createContext({
  userData: null,
  setUserData: () => {},
})

const UserContextProvider = (props) => {
  const [userData, setUserData] = useState({})
  const handleSetUserData = (userData) => {
    setUserData(userData)
    localStorage.setItem('userData', JSON.stringify(userData))
  }

  const getUserData = () => {
    const userDataLS = localStorage.getItem('userData')
    return JSON.parse(userDataLS)
  }

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        setUserData: handleSetUserData,
        getUserData: getUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
