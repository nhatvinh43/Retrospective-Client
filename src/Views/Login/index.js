import React, {useState} from 'react';
import { Result, Col, Row, Button, Modal, Form, Input, DatePicker } from 'antd';
import './index.css'

const LoginPrompt = (props) =>
{
    
    const [modalLoginIsOpen, setModalLoginOpen] = useState(false);
    const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);
    
    
    const handleCancel = () =>
    {
        setModalLoginOpen(false);
        setModalRegisterIsOpen(false);
    }
    
    const handleOpenLoginDialog = () =>
    {
        setModalLoginOpen(true);
    }
    
    const handleOpenRegisterDialog = () =>
    {
        setModalRegisterIsOpen(true);
    }

    return (
        <div>
            <Result className="main"
                status="403"
                title="Login or register to view your boards!"
                extra={
                    <Row justify="center" gutter={[24,24]}>
                        <Col>
                            <Button type="dashed" shape="round" onClick = {handleOpenLoginDialog}>Login</Button>
                        </Col>
                        <Col>
                            <Button type="primary" shape="round" onClick = {handleOpenRegisterDialog}>Register</Button>
                        </Col>
                    </Row>  
                }
            />
            <Modal className="modal" visible={modalLoginIsOpen} centered onCancel={() => handleCancel()} footer={[]}>
                <h1>Login</h1>
                <br />
                <Form className="form" name="login" initialValues={{ remember: false,}} onFinish={props.handleLogin}
                >
                <Form.Item name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input className="input" placeholder="Username" />
                </Form.Item>

                <Form.Item name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password className="input" placeholder="Password" />
                    </Form.Item>
                    
                    <Button type="primary" shape='round' htmlType="submit">Login</Button>

                </Form>
            </Modal>


            <Modal className="modal" visible={modalRegisterIsOpen} centered onCancel={() => handleCancel()} footer={[]}>
                <h1>Register</h1>
                <br />
                <Form className="form" name="register" initialValues={{ remember: false,}} onFinish={props.handleRegister}
                >
                    <Form.Item name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Input className="input" placeholder="Username" />
                    </Form.Item>

                    <Form.Item name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        ]}
                    >
                        <Input className="input" placeholder="Email" />
                    </Form.Item>

                    <Form.Item name="fullname"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your full name!',
                        },
                        ]}
                    >
                        <Input className="input" placeholder="Full name" />
                    </Form.Item>

                    <Form.Item name="dob" label= "Date of birth"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your dob!',
                        },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                    <Input.Password className="input" placeholder="Password" />
                    </Form.Item>

                    <Form.Item name="password_confirm"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your confirm password!',
                        },
                        ]}
                    >
                    <Input.Password className="input" placeholder="Confirm password" />
                    </Form.Item>
                    
                    <Button type="primary" shape='round' htmlType="submit">Register</Button>

                </Form>
            </Modal>

        </div>
    )
}
export default LoginPrompt;