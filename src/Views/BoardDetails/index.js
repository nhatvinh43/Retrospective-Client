import { Layout, notification, Row, Typography, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../../Components/column/index';
import socket from '../../socket';

import './index.css';
const { Content } = Layout;
const { Title } = Typography;

require('dotenv').config();

function BoardDetails(props)
{
    const _id = props.match.params.id;
    const [board, setBoard] = useState({});
    const [loading, setLoading] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const token = props.token;

    const handleSetBoard = (board) => {
        if(!board)
        {
            return;
        }
        socket.emit('boardChanged', {...board, updatedOn: new Date().getTime()});
        setBoard(board);
    };

    const handleUpdatePost = async (postID, value, target) => {

        setSpinning(true);

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

            handleSetBoard(msg);
        }
        else
        {
            notification.error({
                message: "Post update failed",
                duration: 1.5,
                placement: "bottomLeft",
            });
        }

        setSpinning(false);

    }

    const handleDeletePost = async (postID, target) =>
    {
        setSpinning(true);

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

            handleSetBoard(msg)

        }
        else
        {
            notification.error({
                message: "Post deletion failed",
                duration: 1.5,
                placement: "bottomLeft",
            });
        }

        setSpinning(false);
    }

    const handleAddPost = async (target) =>
    {
        setSpinning(true);

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

            handleSetBoard(tempBoard);
        }
        else
        {
            notification.error({
                message: "Adding post failed",
                duration: 1.5,
                placement: "bottomLeft",
            });

        }

        setSpinning(false);
    } 

    const handleChangeName = async (value) =>
    {
        setSpinning(true);

        const result = await fetch(process.env.REACT_APP_HOST + '/boards/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: JSON.stringify({
                ...board,
                name: value,
                lastModified: new Date().getTime(),
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

            document.title = msg.name;
            handleSetBoard(msg);
        }
        else
        {
            notification.error({
                message: "Cannot change board name ",
                duration: 1.5,
                placement: "bottomLeft",
            });
        }
        setSpinning(false);
    }

    const handleUpdateBoard = async (value) => {
        setSpinning(true);

        const result = await fetch(process.env.REACT_APP_HOST + '/boards/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + token
            },
            body: JSON.stringify({
                ...value,
                lastModified: new Date().getTime(),
            })
        });

        const msg = await result.json();

        if(result.status ===200)
        {
            notification.success({
                message: "Board updated",
                duration: 1.5,
                placement: "bottomLeft",
            });

            handleSetBoard(msg);
        }
        else
        {
            notification.error({
                message: "Board update failed",
                duration: 1.5,
                placement: "bottomLeft",
            });
        }

        setSpinning(false);
    }

    useEffect(() =>
    {
        
        if (!token)
        {
            props.history.push('/user');
        }
    
        socket.on('boardChanged', board => {

            if(board._id === _id)
            {
                setBoard(board);
            }
        });

        setLoading(true);

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
                document.title= msg.name;

                socket.emit('joinRoom', msg._id);

                setBoard(msg);
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            socket.off('boardChanged', () => {});
         };

    }, [])

    const handleDragEnd = (result) => {

        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destIndex = result.destination.index;
        const sourceName = result.source.droppableId;
        const destName = result.destination.droppableId;

        if(sourceName===destName && sourceIndex === destIndex)
        {
            return;
        }

        let tempBoard = {};
        Object.assign(tempBoard, board);

        const [item] = tempBoard[sourceName].splice(sourceIndex, 1);

        tempBoard[destName].splice(destIndex, 0, item);

        handleUpdateBoard(tempBoard);
        
    }

    const toggleInput = (column, status) =>
    {
        let input = document.querySelector("#" + column + "Input");
        let text = document.querySelector("#" + column + "Text");

        text.value = "";
        input.className = status;
    }

    return (
        <Layout className="layout">
            <Spin className="spin" size="large" spinning={spinning}>
                <Content className="body">
                    <Title editable={{onChange: handleChangeName}} level={2}>{board.name}</Title>
                    
                    <Row gutter={[16, 16]} className="row" justify="center" align="top" style={{textAlign: 'center'}}>
                        <DragDropContext onDragEnd = {handleDragEnd}>
                            <Column loading={loading} name="Went Well" title="wentWell" color="#009688" toggleInput={toggleInput} handleAddPost={handleAddPost} board={board} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost}/>
                            <Column loading={loading} name="To Improve" title="toImprove" color="#e91e63" toggleInput={toggleInput} handleAddPost={handleAddPost} board={board} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost}/>
                            <Column loading={loading} name="Actions" title="actions" color="#9c27b0" toggleInput={toggleInput} handleAddPost={handleAddPost} board={board} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost}/>
                        </DragDropContext>
                    </Row>
                </Content>
            </Spin>
            
        </Layout>
    )
}

export default BoardDetails;
