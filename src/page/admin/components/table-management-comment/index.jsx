import React, { useState, useEffect, useCallback } from 'react'
import { Table, Tooltip, Popconfirm, Spin } from 'antd'
import moment from 'moment'
import AcceptIcon from '../../../../image/tick_box.svg'
import DeleteIcon from '../../../../image/trash_can.svg'
import Loader from '../../../../components/Loader'
import { approveComment, deleteComment, fetchComment } from '../../../../apis/utils'

function TableManagementComment() {
  const [comments, setComments] = useState([])
  const [serviceLoader, setServiceLoader] = useState(false)
  useEffect(() => {
    getAllComment()
  }, [])

  const getAllComment = useCallback(async () => {
    try {
      setServiceLoader(true)
      const result = await fetchComment()
      setComments(result.data.comments)
      setServiceLoader(false)
    } catch (error) {
      console.log(error)
      setServiceLoader(false)
    }
  }, [])

  const handleApproveComment = useCallback(async (id) => {
    try {
      await approveComment(id)
      await getAllComment()
    } catch (error) {}
  }, [])

  const handleDeleteComment = useCallback(async (id) => {
    try {
      await deleteComment(id)
      await getAllComment()
    } catch (error) {}
  }, [])

  const columns = [
    {
      title: 'STT',
      width: 35,
      fixed: 'left',
      align: 'center',
      render: (text, record, index) => {
        return <div style={{ textAlign: 'center' }}>{index + 1}</div>
      },
    },
    {
      title: 'ID bài đăng',
      key: 'accommodationId',
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
      width: 80,
      render: (text, record, index) => {
        return (
          <div className="table-management-post-action">
            <Popconfirm
              title="Bạn muốn chấp thuận bình luận này?"
              className={`pop-confirm-admin ${record.pending ? '' : 'confirm-invisible'}`}
              okText="Đồng ý"
              cancelText="Huỷ bỏ"
              disabled={!record.pending}
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
            <Popconfirm
              title="Bạn có chắc muốn xoá bình luận này?"
              className="pop-confirm-admin"
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
  ]
  return (
    <div>
      <Spin indicator={<Loader />} spinning={serviceLoader}>
        <Table
          columns={columns}
          dataSource={comments}
          scroll={{ x: 1500, y: 500 }}
          size="small"
          rowKey="_id"
          pagination={false}
        />
      </Spin>
    </div>
  )
}

export default TableManagementComment
