import React, { useState, useEffect, useCallback } from 'react'
import { Table, Tooltip } from 'antd'
import axios from 'axios'

function TableManagementPost(props) {
  const [posterList, setPosterList] = useState([])
  const [widthAddressCol, setWidthAddressCol] = useState(150)

  useEffect(() => {
    const callApi = async () => {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:4000/admin/management-post',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setPosterList(res.data.data)
    }
    callApi()
  }, [])

  const updateColumnWidth = useCallback(
    (width) => {
      setWidthAddressCol(width)
    },
    [widthAddressCol]
  )

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
      // onHeaderCell: (column) => {
      //   let mouseDownX
      //   let beginDrag
      //   return {
      //     onMouseDown: (e) => {
      //       mouseDownX = e.clientX
      //       beginDrag = true
      //     },
      //     onMouseUp: () => {
      //       beginDrag = false
      //     },
      //     onMouseMove: (e) => {
      //       if (beginDrag === true) {
      //         updateColumnWidth(
      //           widthAddressCol + Math.round((e.clientX - mouseDownX) * 0.05)
      //         )
      //       }
      //     },
      //   }
      // },
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
      dataIndex: ['rating', 'likedUser', 'length'],
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
    // {
    //   title: 'Thời gian đăng yêu cầu',
    //   responsive: ['md'],
    //   children: [
    //     {
    //       title: 'Ngày bắt đầu',
    //       render: (text, record, index) => {
    //         return record.availableDate[0] ? (
    //           <span>
    //             {moment(record.availableDate[0]).format('DD/MM/YYYY')}
    //           </span>
    //         ) : (
    //           ''
    //         )
    //       },
    //       sorter: (a, b) => {
    //         const now = moment.now()
    //         return (
    //           moment(a.availableDate[0]).diff(now) -
    //           moment(b.availableDate[0]).diff(now)
    //         )
    //       },
    //     },
    //     {
    //       title: 'Ngày gỡ bài',
    //       render: (text, record, index) => {
    //         return record.availableDate[1] ? (
    //           <span>
    //             {moment(record.availableDate[1]).format('DD/MM/YYYY')}
    //           </span>
    //         ) : (
    //           ''
    //         )
    //       },
    //       sorter: (a, b) => {
    //         const now = moment.now()
    //         return (
    //           moment(a.availableDate[1]).diff(now) -
    //           moment(b.availableDate[1]).diff(now)
    //         )
    //       },
    //     },
    //     {
    //       title: 'Giá đăng bài',
    //       render: (text, record, index) => {
    //         const dateDiff = moment(record.availableDate[1]).diff(
    //           record.availableDate[0],
    //           'days'
    //         )
    //         const dateDiffFromNow = -moment(record.postedDate).diff(
    //           moment.now(),
    //           'days'
    //         )
    //         return record.availableDate[1] && record.availableDate[0] ? (
    //           <span>{dateDiff * 5000} đồng</span>
    //         ) : (
    //           <span>{dateDiffFromNow * 5000} đồng</span>
    //         )
    //       },
    //       sorter: (a, b) => {
    //         const dateDiff1 = moment(a.availableDate[1]).diff(
    //           a.availableDate[0],
    //           'days'
    //         )
    //         const dateDiff2 = moment(b.availableDate[1]).diff(
    //           b.availableDate[0],
    //           'days'
    //         )
    //         return dateDiff1 - dateDiff2
    //       },
    //     },
    //   ],
    // },
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
      title: 'Details',
      align: 'center',
      fixed: 'right',
    },
  ]

  return (
    <div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={posterList}
        scroll={{ x: 1500, y: 450 }}
        bordered
        size="small"
        rowKey="_id"
      />
    </div>
  )
}

export default TableManagementPost
