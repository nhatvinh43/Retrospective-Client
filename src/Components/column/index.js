import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Typography } from 'antd';
import React from 'react';
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input; 

const Column = (props) =>
{
    return (<Col span={7} className="col">
                <Title level={3}> {props.name} </Title>
                    <PlusCircleFilled className="addIcons" style={{ color: props.color }} onClick={() =>props.toggleInput(props.title, "")} />
                        <div id={props.title + "Input"} className="hidden">
                        <TextArea className="textarea" id={props.title + "Text"} bordered="false" rows={3} autoSize={{ minRows: 3, maxRows: 5 }}></TextArea>
                        <Row gutter={[24]} justify="center">
                            <Col className="gutter-row">
                                <Button type="dashed" shape="round" style={{backgroundColor: 'transparent'}} onClick={() => props.handleAddPost(props.title)} icon={<PlusCircleFilled style={{ color: props.color }} />}>Add</Button>
                            </Col>
                            <Col className="gutter-row">
                                <Button type="text" icon={<DeleteFilled style={{color: '#e91e63'}}/>} onClick = {() => { props.toggleInput(props.title, "hidden")}}>Cancel</Button>
                            </Col>
                        </Row>
                    </div>

                    {props.board[props.title] ? props.board[props.title].map(item =>
                        
                        <Card hoverable className="card" key={item._id} actions={[<DeleteFilled key="delete" onClick={() => props.handleDeletePost( item._id, props.title)} />]} >
                            <Title editable={{ onChange: (value) => { props.handleUpdatePost(item._id, value, props.title) }}} level={5}>{item.content}</Title>
                            </Card>
                    
                    ): ""}
                    
            </Col>)
}

export default Column;