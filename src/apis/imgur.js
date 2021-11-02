import axios from 'axios'

const ImgurConfig = {
    headers: {
      Authorization: 'Client-ID 8179920b3f62ec7',
      Accept: '*/*',
      "Content-type": "application/x-www-form-urlencoded",
    }
}

export const imgurUploadImage = (file) => {
    var ImgData = new FormData()
    ImgData.append('image', file)
    const res = axios.post('https://api.imgur.com/3/image', ImgData, ImgurConfig)
    return res
}

