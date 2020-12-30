import React, { useState, useEffect } from 'react'
import { Table, Tooltip, Popconfirm, Spin } from 'antd'
import { Rate } from 'antd'
import Loader from '../../../../components/Loader'

function TableManagementReport() {
  const [reportList, setReportList] = useState([])
  const [serviceLoader, serServiceLoader] = useState(false)
  const columns = [
    {
      title: 'ID bài đăng',
      key: 'ID',
      fixed: 'left',
      width: 150,
      ellipsis: true,
      render: (text, record, index) => {
        return <Tooltip title={record.posterId}>{record.posterId._id}</Tooltip>
      },
    },
    {
      title: 'ID người báo cáo',
      dataIndex: 'userReportedId',
      key: 'userReportedId',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Thời gian',
      width: 150,
      ellipsis: true,
      key: 'time',
      render: (text, record, index) => {
        const { timeReported } = record
        const timeFormated = moment(timeReported).format('HH:MM DD/MM/YYYY')
        return <Tooltip title={timeFormated}>{timeFormated}</Tooltip>
      },
      sorter: (a, b) => {
        const now = moment.now()
        return (
          moment(a.timeReported).diff(now) - moment(b.timeReported).diff(now)
        )
      },
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Đánh giá',
      key: 'rate',
      width: 200,
      render: (text, record, index) => {
        return <Rate defaultValue={record.ratingId.rate} disabled={true} />
      },
    },
    {
      title: 'Lượt like',
      key: 'rate',
      width: 100,
      dataIndex: ['ratingId', 'likedUser', 'length'],
    },
    {
      title: 'Lượt xem',
      key: 'rate',
      width: 100,
      dataIndex: ['ratingId', 'visits', 'length'],
    },
    {
      title: 'Diện tích',
      key: 'area',
      dataIndex: ['posterId', 'area'],
      width: 100,
    },
    {
      title: 'Giá thuê',
      key: 'pricePerMonth',
      dataIndex: ['posterId', 'pricePerMonth'],
      width: 100,
    },
    {
      title: 'Hành động',
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
        </div>
      ),
    },
  ]
  return (
    <div>
      <Spin indicator={<Loader />} spinning={serviceLoader}>
        <Table
          columns={columns}
          dataSource={reportList}
          scroll={{ x: 1500, y: 300 }}
          size="small"
          rowKey="_id"
        />
      </Spin>
    </div>
  )
}

export default TableManagementReport
