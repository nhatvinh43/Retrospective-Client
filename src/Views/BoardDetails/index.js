import React, { useState, useEffect } from 'react';
import './index.css';
import CustomHeader from '../../Components/header/index';
import { Layout, Col, Row, Menu, Typography, Card, notification, Button, Input } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ArrowLeftOutlined, PlusCircleFilled, DeleteFilled} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Header, Footer, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input; 

function BoardDetails()
{

    const toggleInput = (column, status) =>
    {
        switch (column)
        {
            case 'wentWell':
            {
                let input = document.querySelector("#wentWellInput");
                input.className = status;
                break;
                }
            default: return;
        }
    }

    return (
        <Layout className = "layout">
            <CustomHeader />
            <Content className="body">
                <Row align="middle" gutter={[24]}>
                    <Col>
                        <ArrowLeftOutlined style={{fontSize: 20}}></ArrowLeftOutlined>
                    </Col>
                    <Col>
                        <Title editable level={1}>Board 1</Title>
                    </Col>
                </Row>
                <DragDropContext>
                    <Row gutter={[16, 16]} justify="space-between" style={{textAlign: 'center'}}>
                        <Col span={7}>
                            <Title level={3}>Went Well</Title>
                            <PlusCircleFilled className="addIcons" style={{ color: '#009688' }} onClick={() =>{toggleInput('wentWell', "")}} />
                            <div id="wentWellInput" className="hidden">
                                <TextArea className="textarea" bordered="false" rows={3} autoSize={{ minRows: 3, maxRows: 5 }}></TextArea>
                                <Row gutter={[24]} justify="center">
                                    <Col className="gutter-row">
                                        <Button type="dashed" shape="round" style={{backgroundColor: 'transparent'}} icon={<PlusCircleFilled style={{ color: '#009688' }} />}>Add</Button>
                                    </Col>
                                    <Col className="gutter-row">
                                        <Button type="text" icon={<DeleteFilled style={{color: '#e91e63'}}/>} onClick = {() => { toggleInput('wentWell', "hidden")}}>Cancel</Button>
                                    </Col>
                                </Row>
                            </div>


                        </Col>

                        
                        <Col span={7}>
                            <Title level={3}>To Improve</Title>
                            <PlusCircleFilled className="addIcons" style={{ color: '#e91e63' }} />
                            <TextArea rows={3}></TextArea>
                        </Col>


                        <Col span={7}>
                            <Title level={3}>Action Items</Title>
                            <PlusCircleFilled className="addIcons" style={{ color: '#9c27b0' }} />
                            <TextArea rows={3}></TextArea>
                        </Col>


                    </Row>
                </DragDropContext>
            </Content>
        </Layout>
    )
}

export default BoardDetails;
