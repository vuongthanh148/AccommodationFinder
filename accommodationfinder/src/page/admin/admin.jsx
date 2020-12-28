import React from 'react'
import TableManagementPost from './components/table-management-post'
import { Tabs, Row, Col } from 'antd'
import TableManagementComment from './components/table-management-comment'
import TableManagementReport from './components/table-management-report'
import TableManagementOwner from './components/table-management-owner'

const { TabPane } = Tabs

import './index.scss'

const AdminPage = () => (
  <div className="admin-page">
    <Row justify="center">
      <Col span={22}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Quản lý bài đăng" key="1">
            <TableManagementPost />
          </TabPane>
          <TabPane tab="Quản lý bình luận" key="2">
            <TableManagementComment />
          </TabPane>
          <TabPane tab="Quản lý báo cáo" key="3">
            <TableManagementReport />
          </TabPane>
          <TabPane tab="Quản lý tài khoản chủ nhà trọ" key="4">
            <TableManagementOwner />
          </TabPane>
          <TabPane tab="Phân tích và thống ké" key="5">
            Phân tích và thống ké
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>
)

export default AdminPage
