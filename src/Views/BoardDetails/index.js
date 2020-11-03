import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card, Col, Input, Layout, notification, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../../Components/column/index';
import './index.css';
const { Header, Footer, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input; 
const Meta = { Card };

require('dotenv').config();

function BoardDetails(props)
{
    const [board, setBoard] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const _id = props.match.params.id;
    const token = localStorage.getItem('token');

    const handleUpdatePost = async (postID, value, target) => {

        const result = await fetch(process.env.REACT_APP_HOST + '/posts/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: JSON.stringify({
                _id: postID,
                boardID : _id,
                target: target,
                content: value,
            })
        });

        const msg = await result.json();

        if(result.status ===200)
        {
            notification.success({
                message: "Post updated",
                duration: 1.5,
                placement: "bottomLeft",
            });

            console.log(msg);

            setBoard(msg);
        }
        else
        {
            notification.error({
                message: "Post update failed",
                duration: 1.5,
                placement: "bottomLeft",
            });
        }

    }

    const handleDeletePost = async (postID, target) =>
    {
        const result = await fetch(process.env.REACT_APP_HOST + '/posts/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: JSON.stringify({
                _id: postID,
                boardID : _id,
                target: target,
            })
        });

        const msg = await result.json();

        if(result.status === 200)
        {
            notification.success({
                message: "Post deleted",
                duration: 1.5,
                placement: "bottomLeft",
            });

            setBoard(msg)

        }
        else
        {
            notification.error({
                message: "Post deletion failed",
                duration: 1.5,
                placement: "bottomLeft",
            });
        }
    }

    const handleAddPost = async (target) =>
    {
        
        let textArea = document.querySelector('#' + target + 'Text');
        let inputSection = document.querySelector('#' + target + 'Input');
        const value = textArea.value;

        textArea.value = "";
        inputSection.className = "hidden";

        if(!value)
        {
            return;
        }
        
        const result = await fetch(process.env.REACT_APP_HOST + '/posts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: JSON.stringify({
                content: value,
                created: new Date(),
                boardID: _id,
                target: target,
            })
        });

        const msg = await result.json();

        if(result.status === 200 || result.status === 304)
        {
            notification.success({
                message: "Post added successfully",
                duration: 1.5,
                placement: "bottomLeft",
            });

            let tempBoard = {};

            if (board)
            {
                tempBoard = Object.assign(tempBoard, board);  
            }


            const newValue = {
                _id: msg._id,
                content: msg.content,
            }

            tempBoard[target].unshift(newValue);

            setBoard(tempBoard);
        }
        else
        {
            notification.error({
                message: "Adding post failed",
                duration: 1.5,
                placement: "bottomLeft",
            });

        }
    } 

    const handleChangeName = async (value) =>
    {
        const result = await fetch(process.env.REACT_APP_HOST + '/boards/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: JSON.stringify({
                _id: _id,
                name: value,
            })
        });

        const msg = await result.json();

        if(result.status === 200 || result.status === 304)
        {
            notification.success({
                message: "Board name changed to " + msg.name,
                duration: 1.5,
                placement: "bottomLeft",
            });

            setBoard(msg);
        }
        else
        {
            notification.error({
                message: "Cannot change board name ",
                duration: 1.5,
                placement: "bottomLeft",
            });
        }
    }

    useEffect(() =>
    {
        if (!token)
        {
            props.history.push('/user');
        }

        const fetchData = async () =>
        {
            const result = await fetch(process.env.REACT_APP_HOST + '/boards/' + _id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'JWT ' + token
                }
            });

            const msg = await result.json();
            if (result.status === 200 || result.status ===304)
            {
                setBoard(msg);
            }
        }

        fetchData();
    }, [])


    const toggleInput = (column, status) =>
    {
        let input = document.querySelector("#" + column + "Input");
        let text = document.querySelector("#" + column + "Text");

        text.value = "";
        input.className = status;
    }

    return (
        <Layout className = "layout">
            <Content className="body">
                <Title editable={{onChange: handleChangeName}} level={2}>{board.name}</Title>
                <DragDropContext>
                    <Row gutter={[16, 16]} justify="center" align="top" style={{textAlign: 'center'}}>
                        
                        <Column name="Went Well" title="wentWell" color="#009688" toggleInput={toggleInput} handleAddPost={handleAddPost} board={board} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost}/>
                        <Column name="To Improve" title="toImprove" color="#e91e63" toggleInput={toggleInput} handleAddPost={handleAddPost} board={board} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost}/>
                        <Column name="Actions" title="actions" color="#9c27b0" toggleInput={toggleInput} handleAddPost={handleAddPost} board={board} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost}/>

                    </Row>
                </DragDropContext>
            </Content>
        </Layout>
    )
}

export default BoardDetails;
