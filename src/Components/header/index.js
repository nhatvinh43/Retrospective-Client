import { Layout, Menu, Button, Modal, Form, Input } from 'antd';
import './index.css';
import React, {useState} from 'react';
const { Header } = Layout;

const CustomHeader = (props) =>
{
    
    const isLogin = props.visibility;
    let loginAndSignUp = "";

    if (isLogin)
    {
        loginAndSignUp =
            (<Menu theme="light" mode="horizontal" className="header-menu">
                <Button type="primary" shape="round" onClick = {props.handleLogout}>Logout </Button>
            </Menu>)
    }
    return (
        <div>
            <Header className= {isLogin? "header" : "hidden"}>
                <div className="logo" />
                {loginAndSignUp}
            </Header>
            
        </div>
        
    )
}

export default CustomHeader;