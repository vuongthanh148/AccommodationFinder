import React, { useState, useEffect, useCallback } from 'react'
import { Table, Tooltip, Popconfirm } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { devURL } from '../../../../constants/api'
import AcceptIcon from '../../../../image/tick_box.svg'
import DeleteIcon from '../../../../image/trash_can.svg'

function TableManagementComment() {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getAllComment()
  }, [])

  const getAllComment = useCallback(async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `${devURL}/comment/get-all-comments`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setComments(result.data.comments)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleApproveComment = useCallback(async (id) => {
    try {
      await axios({
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url: `${devURL}/comment/approve-comment`,
        data: {
          commentId: id,
        },
      })
      await getAllComment()
    } catch (error) {}
  }, [])

  const handleDeleteComment = useCallback(async (id) => {
    try {
      await axios({
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        url: `${devURL}/comment/delete-comment`,
        data: {
          commentId: id,
        },
      })
      await getAllComment()
    } catch (error) {}
  }, [])

  const columns = [
    {
      title: 'STT',
      width: 50,
      fixed: 'left',
      align: 'center',
      render: (text, record, index) => {
        return <div style={{ textAlign: 'center' }}>{index + 1}</div>
      },
    },
    {
      title: 'ID bài đăng',
      key: 'accommodationId',
      fixed: 'left',
      align: 'center',
      dataIndex: 'accommodationId',
      width: 100,
      ellipsis: true,
      render: (text, record, index) => {
        return <Tooltip title={record.postId}>{record.accommodationId}</Tooltip>
      },
    },
    {
      title: 'Người bình luận',
      align: 'center',
      dataIndex: ['userInfo', 'name'],
      key: 'address',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Thời gian',
      align: 'center',
      width: 100,
      ellipsis: true,
      key: 'city',
      render: (text, record, index) => {
        const { createAt } = record
        const timeFormatted = moment(createAt).format('HH:MM DD/MM/YYYY')
        return <Tooltip title={timeFormatted}>{timeFormatted}</Tooltip>
      },
    },
    {
      title: 'Bình luận',
      align: 'center',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Hành động',
      align: 'center',
      fixed: 'right',
      width: 150,
      render: (text, record, index) => {
        return (
          <div className="table-management-post-action">
            {record.pending && (
              <Popconfirm
                title="Bạn muốn chấp thuận bình luận này?"
                okText="Đồng ý"
                cancelText="Huỷ bỏ"
                onConfirm={() => {
                  handleApproveComment(record._id)
                }}
              >
                <Tooltip title="Chấp thuận bình luận">
                  <div className="table-icons">
                    <img alt="accept-icon" src={AcceptIcon} />
                  </div>
                </Tooltip>
              </Popconfirm>
            )}
            <Popconfirm
              title="Bạn có chắc muốn xoá bình luận này?"
              okText="Đồng ý"
              cancelText="Huỷ bỏ"
              onConfirm={() => {
                handleDeleteComment(record._id)
              }}
            >
              <Tooltip title="Xoá bài đăng">
                <div className="table-icons">
                  <img alt="delete-icon" src={DeleteIcon} />
                </div>
              </Tooltip>
            </Popconfirm>
          </div>
        )
      },
    },
    // {
    //   title: '',
    //   key: 'operation',
    //   fixed: 'right',
    //   width: 100,
    //   render: (text, record, index) => (
    //     <div>
    //       <Popconfirm
    //         title="Bạn có chắc muốn xoá bình luận này?"
    //         okText="Đồng ý"
    //         cancelText="Huỷ bỏ"
    //       >
    //         <Tooltip title="Xoá bài đăng">
    //           <div className="table-icons">
    //             <img alt="delete-icon" />
    //           </div>
    //         </Tooltip>
    //       </Popconfirm>

    //       {!record.isApproved && (
    //         <Popconfirm
    //           title="Bạn muốn chấp thuận tài khoản này?"
    //           okText="Đồng ý"
    //           cancelText="Huỷ bỏ"
    //         >
    //           <Tooltip title="Chấp thuận tài khoản">
    //             <div className="table-icons">
    //               <img alt="accept-icon" />
    //             </div>
    //           </Tooltip>
    //         </Popconfirm>
    //       )}
    //     </div>
    //   ),
    // },
  ]
  return (
    <div>
      <Table
        columns={columns}
        dataSource={comments}
        scroll={{ x: 1500, y: 500 }}
        size="small"
        rowKey="_id"
        pagination={false}
      />
    </div>
  )
}

export default TableManagementComment
