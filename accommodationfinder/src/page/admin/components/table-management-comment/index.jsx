import React, { useState } from 'react'
import { Table, Tooltip, Popconfirm } from 'antd'

import moment from 'moment'
import { Rate } from 'antd'

function TableManagementComment() {
  const [comments, setComments] = useState('')

  const columns = [
    {
      title: 'ID bài đăng',
      key: 'ID',
      fixed: 'left',
      width: 150,
      ellipsis: true,
      render: (text, record, index) => {
        return <Tooltip title={record.postId}>{record.postId}</Tooltip>
      },
    },
    {
      title: 'Người bình luận',
      dataIndex: 'username',
      key: 'address',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Thời gian',
      width: 100,
      ellipsis: true,
      key: 'city',
      render: (text, record, index) => {
        const { time } = record
        const timeFormated = moment(time).format('HH:MM DD/MM/YYYY')
        return <Tooltip title={timeFormated}>{timeFormated}</Tooltip>
      },
    },
    {
      title: 'Bình luận',
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Hành động',
      dataIndex: 'isApproved',
      key: 'isApproved',
      render: (text, record, index) => {
        return record.isApproved ? 'Đã phê duyệt' : 'Chờ phê duyệt'
      },
      width: 150,
    },
    {
      title: '',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record, index) => (
        <div>
          <Popconfirm
            title="Bạn có chắc muốn xoá bình luận này?"
            okText="Đồng ý"
            cancelText="Huỷ bỏ"
          >
            <Tooltip title="Xoá bài đăng">
              <div className="table-icons">
                <img alt="delete-icon" />
              </div>
            </Tooltip>
          </Popconfirm>

          {!record.isApproved && (
            <Popconfirm
              title="Bạn muốn chấp thuận tài khoản này?"
              okText="Đồng ý"
              cancelText="Huỷ bỏ"
            >
              <Tooltip title="Chấp thuận tài khoản">
                <div className="table-icons">
                  <img alt="accept-icon" />
                </div>
              </Tooltip>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ]

  return (
    <div>
      <Table
        columns={columns}
        dataSource={comments}
        scroll={{ x: 1500, y: 300 }}
        size="small"
        rowKey="_id"
      />
    </div>
  )
}

export default TableManagementComment
