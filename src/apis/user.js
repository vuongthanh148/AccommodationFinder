import axios from "axios"
import { BackendUrl, createAuthApiRequest } from "./index"

export const handleLogin = async ({userType, email, password}) => {
    const res = await axios({
        method: 'POST',
        url: `${BackendUrl}/${userType}/login`,
        data: {
            email: email,
            password: password
        }
    }).catch(e => {
        console.log(e.response)
        throw e
    })

    return res
}

export const handleLogout = async ({userType}) => {
    const res = await createAuthApiRequest({
        method: 'POST',
        url: `${BackendUrl}/${userType}/logoutAll`,
    })

    return res
}

export const handleSignUp = async ({userType, data}) => {
    const res = await axios({
        method: 'POST',
        url: `${BackendUrl}/${userType}/signup`,
        data: data,
    }).catch(e => {
        console.log(e.response)
        throw e
    })

    return res
}

export const getUserProfile = async ({userType}) => {
    try{
        const res = await createAuthApiRequest({
            method: 'GET',
            url: `${BackendUrl}/${userType}/profile`
        })
        return res
    }
    catch(e){
        console.log(e)
    }
}

export const updateUserProfile = async ({userType, data}) => {
    try{
        const res = await createAuthApiRequest({
            method: 'POST',
            url: `${BackendUrl}/${userType}/profile`,
            data: data
        })    
        return res
    }
    catch(e){
        console.log(e)
    }
}

export const getFollowList = (body) => {
    try{
        const res = createAuthApiRequest({
            method: 'POST',
            url: `${BackendUrl}/followList`,
            data: body
          })
        return res
    }
    catch(e){
        console.log(e)
    }
}