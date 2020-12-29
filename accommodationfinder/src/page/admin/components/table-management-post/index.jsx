import React, { useState, useEffect, useCallback } from 'react'
import { Table, Tooltip, Popconfirm, Spin } from 'antd'
import DeleteIcon from '../../../../image/trash_can.svg'
import AcceptIcon from '../../../../image/tick_box.svg'
import DescriptionIcon from '@material-ui/icons/Description'
import Loader from '../../../../components/Loader'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './index.css'

function TableManagementPost(props) {
  const [posterList, setPosterList] = useState([])
  const [serviceLoader, setServiceLoader] = useState(false)

  useEffect(() => {
    const callApi = async () => {
      setServiceLoader(true)
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:4000/admin/management-post',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setPosterList(res.data.data)
      setServiceLoader(false)
    }
    callApi()
  }, [])

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      align: 'center',
      key: 'name',
      fixed: 'left',
      ellipsis: {
        showTitle: false,
      },
      width: 150,
      render: (text, record, index) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        )
      },
    },
    {
      title: 'Kiểu bất động sản',
      dataIndex: 'typeOfAccommodation',
      key: 'typeOfAccommodation',
      align: 'center',
      responsive: ['lg'],
      // filters: [
      //   {
      //     text: 'Phòng trọ',
      //     value: 'phòng trọ',
      //   },
      //   {
      //     text: 'Chung cư mini',
      //     value: 'chung cư mini',
      //   },
      //   {
      //     text: 'Nhà nguyên căn',
      //     value: 'nhà nguyên căn',
      //   },
      //   {
      //     text: 'Chung cư nguyên căn',
      //     value: 'chung cư nguyên căn',
      //   },
      // ],
      width: 150,
      // onFilter: (value, record) =>
      //   record.typeOfAccommodation.indexOf(value) === 0,
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      align: 'center',
      dataIndex: 'address',
      responsive: ['lg'],
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => {
        const { address } = record
        return (
          <Tooltip placement="topLeft" title={address}>
            {address}
          </Tooltip>
        )
      },
    },
    {
      title: 'Giá theo tháng',
      align: 'center',
      dataIndex: 'pricePerMonth',
      responsive: ['md'],
      key: '3',
      sorter: (a, b) => a.pricePerMonth - b.pricePerMonth,
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: 'center' }}>
            {Number(text).toLocaleString('en')}
          </div>
        )
      },
    },
    {
      title: 'Đánh giá',
      responsive: ['md'],
      align: 'center',
      dataIndex: ['rating', 'rate'],
      key: '4',
      sorter: (a, b) => a.rating.rate - b.rating.rate,
    },
    {
      title: 'Lượt thích',
      responsive: ['md'],
      align: 'center',
      dataIndex: 'sumOfLike',
      key: '5',
      sorter: (a, b) => a.rating.likedUser.length - b.rating.likedUser.length,
    },
    {
      title: 'Lượt xem',
      align: 'center',
      responsive: ['md'],
      dataIndex: 'watch',
      key: '6',
    },
    {
      title: 'Tình trạng',
      align: 'center',
      dataIndex: 'isApproved',
      render: (text, record, index) =>
        record.isApproved ? 'Đã chấp thuận' : 'Chờ chấp thuận',
      filters: [
        {
          text: 'Đã chấp thuận',
          value: true,
        },
        {
          text: 'Chờ chấp thuận',
          value: false,
        },
      ],
      onFilter: (value, record) => record.isApproved === value,
    },
    {
      title: 'Hành động',
      align: 'center',
      fixed: 'right',
      render: (text, record, index) => {
        return (
          <div className="table-management-post-action">
            {!record.isApproved && (
              <Popconfirm
                className="pop-confirm-admin"
                title="Bạn muốn chấp thuận tài khoản này?"
                okText="Đồng ý"
                cancelText="Huỷ bỏ"
                onConfirm={() => {
                  axios
                    .put('http://localhost:4000/accommodation/approve', {
                      accommodationId: posterList[index].id,
                    })
                    .then((res) => {
                      console.log(res.status)
                      toast.success('Đã chấp thuận thành công', {
                        position: 'bottom-left',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      })
                      // location.href = '/admin'
                    })
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
              className="pop-confirm-admin"
              title="Bạn có chắc muốn xoá tài khoản này?"
              okText="Đồng ý"
              cancelText="Huỷ bỏ"
              onConfirm={() => {
                axios
                  .delete(
                    `http://localhost:4000/accommodation/${posterList[index].id}`,
                    {}
                  )
                  .then((res) => {
                    console.log(res.status)
                  })
              }}
            >
              <Tooltip title="Xoá bài đăng">
                <div className="table-icons">
                  <img alt="delete-icon" src={DeleteIcon} />
                </div>
              </Tooltip>
            </Popconfirm>
            <Link to={`/home-detail/${record.id}`}>
              <Tooltip title="Đến chi tiết bài đăng">
                <DescriptionIcon />
              </Tooltip>
            </Link>
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <Spin indicator={<Loader />} spinning={serviceLoader}>
        <Table
          pagination={false}
          columns={columns}
          dataSource={posterList}
          scroll={{ x: 1500, y: 450 }}
          bordered
          size="small"
          rowKey="_id"
        />
      </Spin>
    </div>
  )
}

export default TableManagementPost
