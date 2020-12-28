import React, { useState } from 'react'

export const UserContext = React.createContext({
  userData: null,
  setUserData: () => {},
})

const UserContextProvider = (props) => {
  const [userData, setUserData] = useState({})
  const handleSetUserData = (userData) => {
    setUserData(userData)
  }

  return (
    <UserContext.Provider
      value={{
        userData: userData,
        setUserData: handleSetUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
