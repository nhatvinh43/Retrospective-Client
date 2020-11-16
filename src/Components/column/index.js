import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Typography } from 'antd';
import React, { useState } from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import './index.css';
const { Title } = Typography;
const { TextArea } = Input; 

const Column = (props) =>
{
    const [text, setText] = useState("");

    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleToggleInput = (column, status)  => {
        props.toggleInput(column, status);
        setText("");
    }

    return (<Col xs={24} md={24} lg={8} xl={8} className="col">
                <Title level={3}> {props.name} </Title>
                
                <PlusCircleFilled className="addIcons" style={{ color: props.color }} onClick={() => handleToggleInput(props.title, "")} />
                
                <div id={props.title + "Input"} className="hidden">
                    <TextArea className="textarea" value={text} onChange = {handleChange} id={props.title + "Text"} bordered="false" rows={3} autoSize={{ minRows: 3, maxRows: 5 }}></TextArea>
                    <Row gutter={[24]} justify="center">
                        <Col className="gutter-row">
                            <Button type="dashed" shape="round" style={{backgroundColor: 'transparent'}} onClick={() => props.handleAddPost(props.title)} icon={<PlusCircleFilled style={{ color: props.color }} />}>Add</Button>
                        </Col>
                        <Col className="gutter-row">
                            <Button type="text" icon={<DeleteFilled style={{color: '#e91e63'}}/>} onClick = {() => { handleToggleInput(props.title, "hidden")}}>Cancel</Button>
                        </Col>
                    </Row>
                </div>

                <Card style={{ width: 300 }} className={props.loading? "": "hidden"} loading={props.loading}></Card>
        
                {props.board[props.title] ? (
                    <Droppable droppableId = {props.title}>
                    {
                        (provided, snapshot) => 
                        <div {...provided.droppableProps} ref={provided.innerRef} className = {(snapshot.isDraggingOver ? "highlight" : '')} isDraggingOver={snapshot.isDraggingOver} >
                                {
                                    props.board[props.title].map((item, index) => (
                                        <Draggable key={item._id} draggableId = {item._id} index={index}  >
                                            {
                                                (provided) => (
                                                    <div ref = {provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <Card hoverable className="card" actions={[<DeleteFilled key="delete" onClick={() => props.handleDeletePost( item._id, props.title)} />]} >
                                                            <Title editable={{ onChange: (value) => { props.handleUpdatePost(item._id, value, props.title) }}} level={5}>{item.content}</Title>
                                                        </Card>
                                                    </div>
                                                   
                                                )
                                            }
                                        </Draggable>))
                                }
                                {provided.placeholder}
                        </div>
                            
                    }
                    
                    
                </Droppable>
                ) : <div></div>}
                
                    
                    
            </Col>)
}

export default Column;