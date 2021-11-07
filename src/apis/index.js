import axios from 'axios'

export const BackendUrl = "https://accommodation-finder.herokuapp.com"
export const ChatUrl = "https://accommodation-chat.herokuapp.com"
// export const ChatUrl = "http://localhost:3002"
// export const BackendUrl = 'http://localhost:4000'

export const userToken = localStorage.getItem('token')

export const createAuthApiRequest = async ({url, method, data, params, isFormData, props}) => {
    var userToken = localStorage.getItem('token')
    
    const res = await axios({
        method,
        url,
        data,
        params,
        headers: {
            'Authorization': `Bearer ${userToken}`,
        }
    })

    return res
}