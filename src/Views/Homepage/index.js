import React, { useState, useEffect } from 'react';
import './index.css';
import BoardListItem from '../../Components/board-list-items/index';
import NewBoardModal from '../../Components/modal-new-board/index';
import CustomHeader from '../../Components/header/index';
import { Layout, Col, Row, Typography, Card, notification, Button } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
const { Content } = Layout;
const { Title } = Typography;

function Homepage()
{
  const history = useHistory();
  const [boardData, setBoardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const handleBoardClick = (_id) =>
  {
    history.push('/board/' + _id);
  }

  const onCreateBoard = () =>
  {
    if (!newBoardName)
    {
      setIsModalOpened(false);
      return;
    }

    fetch('http://localhost:8080/boards/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newBoardName,
        created: new Date(),
      })
    }).then(result => result.json()).then(data =>
    {
      if (data)
      {
        if (data._id)
        {
          let temp = boardData.slice();
          temp.unshift(data);
          setBoardData(temp);
          notification.success({
            message: "Board creation successful!",
            duration: 1.5,
            placement: "bottomLeft"
          })
        } else
        {
          notification.error({
            message: "Board creation failed!",
            duration: 1.5,
            placement: "bottomLeft"
          })
        }
      }
    }
    );

    setIsModalOpened(false);
    setNewBoardName("");
  }

  const onCancel = () =>
  {
    setIsModalOpened(false);
    setNewBoardName("");
  }

  const onChange = () =>
  {
    const value = document.querySelector("#newBoardName").value;
    setNewBoardName(value);
  }

  const handleDeleteBoard = (id) =>
  {
    fetch('http://localhost:8080/boards/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: id
      })
    }).then(result => result.json()).then(data =>
    {
      if (data.ok)
      {
        //Update state
        let boards = boardData.slice();
        const index = boardData.findIndex(item => item._id === id);
    
        if (index >= 0)
        {
          boards.splice(index, 1)
          setBoardData(boards);
        }
    
        notification.success({
          message: "Board successfully deleted!",
          duration: 1.5,
          placement: "bottomLeft",
        });
      } else
      {
        notification.error({
          message: "Board deletion failed!",
          duration: 1.5,
          placement: "bottomLeft",
        });
      }
    })

   
  }
  
  useEffect(() =>
  {
    const fetchBoardData = async () =>
    {
      const result = await (await fetch('http://localhost:8080/boards')).json();
      setBoardData(result);
      setLoading(false);
    };

    fetchBoardData();

  }, []);
  

  return (
    <Layout className="layout">
      <CustomHeader />
      <Content className="body">
        <Title level="1">
          My boards
        </Title>
        <Row gutter={[16, 16]} align="middle" justify="center">

        <Col className="gutter-row" >   
            <Button type="dashed" id="addBoardBtn" shape="round " onClick = {() => setIsModalOpened(true)}>
              <PlusCircleTwoTone style={{ fontSize: 30 }} key="newBoard"></PlusCircleTwoTone>
            </Button>
          </Col>

          {boardData.map(item =>
            <Col className="gutter-row" onClick = {() => handleBoardClick(item._id)}>
              <BoardListItem key={item._id} board={item} loading="false" onConfirm={() =>  handleDeleteBoard(item._id)}></BoardListItem>
            </Col>
          )}

          
          <Col className="gutter-row">   
            <Card style={{ width: 300 }} className={loading? "": "hidden"} loading={loading}></Card>
          </Col>
          <Col className="gutter-row">   
            <Card style={{ width: 300 }} className={loading? "": "hidden"} loading={loading}></Card>
          </Col>
          <Col className="gutter-row">   
            <Card style={{ width: 300 }} className={loading? "": "hidden"} loading={loading}></Card>
          </Col>
          <Col className="gutter-row">   
            <Card style={{ width: 300 }} className={loading? "": "hidden"} loading={loading}></Card>
          </Col>
          <Col className="gutter-row">   
            <Card style={{ width: 300 }} className={loading? "": "hidden"} loading={loading}></Card>
          </Col>
         
        </Row>
            <NewBoardModal isModalOpened = {isModalOpened} onCancel= {onCancel} onConfirm = {onCreateBoard} onChange={onChange} newBoardName={newBoardName}></NewBoardModal>
      </Content>
    
    </Layout>
  );
}

export default Homepage;
