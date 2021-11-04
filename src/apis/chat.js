import axios from "axios"
import { BackendUrl, ChatUrl } from "."

export const createChatbox = async (body) => {
    const res = await axios({
        method: 'POST',
        url: `${ChatUrl}/createChatbox`,
        data: body
    }).catch(e => {
        console.log(e.response)
        throw e
    })

    return res
}

export const ownerGetChatbox = ({userId, body}) => {
    const res = axios.get(`${ChatUrl}/${userId}`, {
      body: body,
    }).catch(e => {
        console.log(e.response)
        throw e
    })

    return res
}

export const adminGetAllChatbox = () => {
    const res = axios.get(`${ChatUrl}`).catch(e => {
        console.log(e.response)
        throw e
    })

    return res
}

export const getChatboxByID = (id) => {
    const res = axios.get(`${ChatUrl}/getChatbox/${id}`).catch(e => {
        console.log(e.response)
        throw e
    })

    return res
}