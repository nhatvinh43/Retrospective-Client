  import { PlusCircleTwoTone } from '@ant-design/icons';
import { Button, Card, Col, Layout, notification, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BoardListItem from '../../Components/board-list-items/index';
import NewBoardModal from '../../Components/modal-new-board/index';
import './index.css';
const { Content } = Layout;



function Homepage(props)
{
  const token = localStorage.getItem('token');
  const [isLogin, setIsLogin] = useState(props.isLogin);
  const [spinning, setSpinning] = useState(false);
  const [boardData, setBoardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const onCreateBoard = async () =>
  {
    if (!newBoardName)
    {
      setIsModalOpened(false);
      return;
    }

    setSpinning(true);
    setIsModalOpened(false);
    setNewBoardName("");

    const result = await fetch(process.env.REACT_APP_HOST + '/boards/add', {
      method: 'POST',
     
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token,
      },
      body: JSON.stringify({
        name: newBoardName,
        created: new Date(),
      })
    });

    const msg = await result.json();

    if (result.status === 200)
    {
        let temp = boardData.slice();
        temp.unshift(msg);
        setBoardData(temp);
        notification.success({
          message: "Board creation successful!",
          duration: 1.5,
          placement: "bottomLeft"
        })
    } else
    {
      notification.error({
        message: msg.message,
        duration: 1.5,
        placement: "bottomLeft"
      })
    }
  
    setSpinning(false);
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

    setSpinning(true);

    fetch(process.env.REACT_APP_HOST + '/boards/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token, 
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
    setSpinning(false);
   
  }
  
  useEffect(() =>
  {

    if(!token)
    {
      props.history.push('/user');
    }
    const fetchBoardData = async () =>
    {
      const result = (await fetch(process.env.REACT_APP_HOST + '/boards', {
        method: 'GET',
        headers: {
          'Authorization': 'JWT ' + token
        }
      }));

      const msg = await result.json();

      if (result.status !== 400)
      {
        setBoardData(msg.data);
      }
      setLoading(false);
    };

    fetchBoardData();

  }, [isLogin]);

  return (
    <Layout className="layout">
      <Content className="body">

        <Spin size="large" spinning={spinning} className="spin">
          <Row gutter={[16, 16]} align="middle" justify="center">
            <Col className="gutter-row" >   
              <Button type="dashed" id="addBoardBtn" shape="round " onClick = {() => setIsModalOpened(true)}>
                <PlusCircleTwoTone style={{ fontSize: 30 }} key="newBoard"></PlusCircleTwoTone>
              </Button>
            </Col>

            {boardData.map(item =>
              <Col className="gutter-row" onClick={() => { props.history.push('/boards/' + item._id) }}>
                <BoardListItem key={item._id} board={item} onConfirm={() =>  handleDeleteBoard(item._id)}></BoardListItem>
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
      </Spin>
        
      
          <NewBoardModal isModalOpened = {isModalOpened} onCancel= {onCancel} onConfirm = {onCreateBoard} onChange={onChange} newBoardName={newBoardName}></NewBoardModal>
      </Content>
    </Layout>
  );
}

export default Homepage;
