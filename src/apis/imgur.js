import axios from 'axios'
const cliendId = "1dc45095f0b9e70"
const clientSecret = "18481597c4133a9d31ec3e74473a5d7bda5bdb32"

const ImgurConfig = {
    headers: {
      Authorization: `Client-ID ${cliendId}`,
      Accept: '*/*',
      "Content-Type": "multipart/form-data",
    }
}

export const imgurUploadImage = (file) => {
    var ImgData = new FormData()
    ImgData.append('image', file)
    const res = axios.post('https://api.imgur.com/3/upload', ImgData, ImgurConfig)
    return res
}

