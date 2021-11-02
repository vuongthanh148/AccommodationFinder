import {BackendUrl, createAuthApiRequest} from './index'
import axios from 'axios'

export const fetchComment = () => {
    const res = createAuthApiRequest({
        method: 'GET',
        url: `${BackendUrl}/comment/get-all-comments`
      })

      return res
}

export const createComment = (comment, id) => {
    const res = createAuthApiRequest({
      method: 'POST',
      url: `${BackendUrl}/comment/create-new-comment`,
      data: {
        content: comment,
        accommodationId: id,
      },
    })

      return res
}

export const fetchCommentByPostId = (id) => {
    const res = createAuthApiRequest({
        method: 'POST',
        url: `${BackendUrl}/comment/get-all-comments`,
        data: {
          accommodationId: id,
        },
      })

      return res
}



export const approveComment = (id) => {
    const res = createAuthApiRequest({
        method: 'PUT',
        url: `${BackendUrl}/comment/approve-comment`,
        data: {
          commentId: id,
        },
      })

      return res
}

export const deleteComment = (id) => {
    const res = createAuthApiRequest({
        method: 'DELETE',
        url: `${BackendUrl}/comment/delete-comment`,
        data: {
          commentId: id,
        },
      })

      return res
}

export const ratePost = ({rate, postId, userId}) => {
  return createAuthApiRequest({
    method: 'POST',
    url: `${BackendUrl}/rating`,
    data: {
      ratedStar: rate,
      accommodationId: postId,
      userId: userId,
    },
  })
}
