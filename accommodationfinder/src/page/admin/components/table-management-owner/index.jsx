import React, { useState, useEffect } from 'react'
import { Table, Tooltip, Popconfirm } from 'antd'
import DeleteIcon from '../../../../image/trash_can.svg'
import AcceptIcon from '../../../../image/tick_box.svg'
import axios from 'axios'

import './index.css'

function TableManagementOwner(props) {
  const [ownerAccountList, setOwnerAccountList] = useState([])

  useEffect(() => {
    const callApi = async () => {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:4000/admin/management-owner',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setOwnerAccountList(res.data.data)
    }
    callApi()
  }, [])

  const columns = [
    {
      title: 'Họ và tên',
      key: 'name',
      fixed: 'left',
      dataIndex: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
      width: 150,
      render: (text, record, index) => {
        const { address } = record
        return <Tooltip title={address}>{address}</Tooltip>
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      render: (text, record, index) => {
        const { email } = record
        return <Tooltip title={email}>{email}</Tooltip>
      },
      width: 200,
    },
    {
      title: 'Tình trạng',
      dataIndex: 'isApproved',
      key: '4',
      render: (text, record, index) => {
        return record.isApproved ? 'Đã phê duyệt' : 'Chờ phê duyệt'
      },
      width: 150,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Action</div>,
      key: 'operation',

      fixed: 'right',
      width: 100,
      render: (text, record, index) => {
        console.log(record)
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {!record.isApproved && (
              <Popconfirm
                title="Bạn muốn chấp thuận tài khoản này?"
                okText="Đồng ý"
                cancelText="Huỷ bỏ"
                onConfirm={() => {
                  // To do
                  // Call api approve account
                }}
              >
                <Tooltip title="Chấp thuận tài khoản">
                  <div className="table-icons">
                    <img alt="accept-icon" src={AcceptIcon} />
                  </div>
                </Tooltip>
              </Popconfirm>
            )}
            <Popconfirm
              title="Bạn có chắc muốn xoá tài khoản này?"
              okText="Đồng ý"
              cancelText="Huỷ bỏ"
              onConfirm={() => {
                // To do
                // Call api delete account
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
      <Table
        pagination={false}
        columns={columns}
        dataSource={ownerAccountList}
        scroll={{ x: 1500, y: 300 }}
        size="small"
        rowKey="_id"
      />
    </div>
  )
}

export default TableManagementOwner
