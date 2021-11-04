import axios from 'axios'
import { BackendUrl, createAuthApiRequest } from './index'

export const getAllAccomod = async (body) => {
    try{
        const res = await createAuthApiRequest({
            method: 'POST',
            url: `${BackendUrl}/allAccommodation`,
            data: body
          })
        return res
    }
    catch(e){
        console.log(e)
    }
}

export const searchAccomod = async (body) => {
    try{
        const res = await createAuthApiRequest({
            method: 'POST',
            url: `${BackendUrl}/accommodation`,
            data: body
          })
        return res
    }
    catch(e){
        console.log(e)
    }
}

export const createNewAccomod = async (body) => {
    try{
        const res = await createAuthApiRequest({
            method: 'POST',
            url: `${BackendUrl}/accommodation/newAccomod`,
            data: body
          })
        return res
    }
    catch(e){
        console.log(e)
    }
}

export const getAccomodById = async (id) => {
    try{
        const res = createAuthApiRequest({
            method: 'GET',
            url: `${BackendUrl}/accommodation/${id}`
          })
        return res
    }
    catch(e){
        console.log(e)
    }
}

export const getAccomodInfo = async (id) => {
    try{
        const res = createAuthApiRequest({
          method: 'GET',
          url: `${BackendUrl}/accommodations/${id}/info`
        })
        return res
    }
    catch(e){
        console.log(e)
    }
}

export const updateFollowAction = async (action, accomodID) => {
    try{
        const res = await createAuthApiRequest({
            method: 'POST',
            url: `${BackendUrl}/accommodation/${
              action
            }`,
            data: {
                accommodationId: accomodID,
            },
          })
          return res
    }
    catch(e) {
        console.log(e)
    }
}

export const getAccomodAnalyst = async (id) => {
    try{
      return axios({
          method: 'POST',
          url: `${BackendUrl}/accommodation/analyst`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            accommodationId: id,
          },
        })
    }
    catch(e) {
        console.log(e)
    }
}
