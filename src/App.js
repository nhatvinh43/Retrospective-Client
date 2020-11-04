import React, {useState, useEffect} from 'react';
import Homepage from './Views/Homepage/index';
import BoardDetails from './Views/BoardDetails/index';
import './App.css';
import { useHistory } from 'react-router-dom';
import CustomHeader from './Components/header/index';
import { notification } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import LoginPrompt from './Views/Login/index';

function App()
{
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [shouldBack, setShouldBack] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const [modalLoginIsOpen, setModalLoginOpen] = useState(false);
  const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);

  useEffect(() =>
  {
    if (token)
    {
      setIsLogin(true);  
    }
  })
    

  const handleHistory = (path) =>
  {

    history.push(path);
    if (path.size > 1)
    {
      setShouldBack(true);  
    }
  };

  const handleLogin =  async (values) =>
  {

    const result = await fetch(process.env.REACT_APP_HOST + "/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password
      })
    }
    );

    const msg = await result.json();

    if (result.status !== 200)
    {
      notification.error({
        message: msg.message,
        duration: 1.5,
        placement: "bottomLeft"
      });
    }
    else
    {
      localStorage.setItem('token', msg.token);
      setIsLogin(true);
      setModalLoginOpen(false);
      history.push('/dashboard');
    }
  }

  const handleLogout  = () =>
  {
    localStorage.removeItem('token');
    history.push('/user');
    setIsLogin(false);
  }

  const handleRegister = async (values) =>
  {
    const result = await fetch(process.env.REACT_APP_HOST + "/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: values.username,
          email: values.email,
          name: values.fullname,
          dob: values.dob,
          password: values.password,
          password_confirm: values.password_confirm
        })
      }
    )

    const msg = await result.json();

    if (result.status === 400)
    {
      notification.error({
        message: msg.message,
        duration: 1.5,
        placement: "bottomLeft"
      });
    }
    else 
    {
      notification.success({
        message: msg.message,
        duration: 1.5,
        placement: "bottomLeft"
      });
      setModalRegisterIsOpen(false);
    }
    
  }

  const handleGetUser = async () =>
  {
    const result = await fetch(process.env.REACT_APP_HOST + "/user", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'JWT ' + token,
      }
    }
    );

    const msg = await result.json();

    if (result.status !== 200)
    {
      notification.error({
        message: msg.message,
        duration: 1.5,
        placement: "bottomLeft"
      });
      return {};
    }
    else
    {
      return msg;
    }
  }

  const handleUpdateUser = async (values) =>
  {
    
    const result = await fetch(process.env.REACT_APP_HOST + '/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token
        },
        body: JSON.stringify({
            ...values,
        })
    });

    const msg = await result.json();

    if(result.status ===200)
    {
        notification.success({
            message: "Account info updated",
            duration: 1.5,
            placement: "bottomLeft",
        });

        console.log(msg);
    }
    else
    {
        notification.error({
            message: "Account info update failed",
            duration: 1.5,
            placement: "bottomLeft",
        });
    }
  }

  return (
    <div>
        <CustomHeader handleUpdateUser={handleUpdateUser} handleGetUser= {handleGetUser} history = {history} handleHistory = {handleHistory} back={shouldBack} handleLogout = {handleLogout} visibility={isLogin} />
      <Switch>
        <Route path="/dashboard" render={props => <Homepage {...props} />} >
          
        </Route>
        <Route path="/boards/:id" render={(props) => <BoardDetails {...props} />} >
        
        </Route>
        <Route path="/user">
          <LoginPrompt isLogin={isLogin} handleLoginState={setIsLogin} handleLogin={handleLogin} handleRegister={handleRegister}/>
        </Route>
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
