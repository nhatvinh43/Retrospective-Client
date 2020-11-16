import { Button, Layout, Modal, Form, PageHeader, Spin, Input, DatePicker } from 'antd';
import { UserOutlined, SmileFilled } from '@ant-design/icons';
import React, {useState} from 'react';
import './index.css';
const moment = require('moment');

const { Header } = Layout;

const CustomHeader = (props) =>
{
    const [modalOpen, setModalOpen] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const isLogin = props.visibility;
    
    const [form] = Form.useForm();

    const handleOpenDialog = async () =>
    {
        setSpinning(true);
        setModalOpen(true);
        const user = await props.handleGetUser();

        form.setFieldsValue({
            ...user,
            dob: moment(user.dob),
        });

        setSpinning(false);
        
    }
    
    const handleCancel = () =>
    {
        setModalOpen(false);
    }

    const handleUpdateUser = (values) =>
    {
        setSpinning(true);
        props.handleUpdateUser(values);
        setModalOpen(false);
        setSpinning(false);
    }


    return (
        <div>
            <PageHeader title="Retrospective" className={isLogin ? "header" : "hidden"} extra={[
                <Button type="primary" shape="round" onClick={() => handleOpenDialog()} icon={<UserOutlined key="user"/>}>Account </Button>,
                <Button type="dashed" shape="round" onClick={props.handleLogout}>Logout </Button>]}>
            </PageHeader>

            <Spin className="spin" spinning={spinning} size="default" >
                <Modal centered visible={modalOpen} footer={[]} onCancel={handleCancel}>
                <h1>Account</h1>
                    <Form form={form} className="form" name="login" initialValues={{ remember: false, }} onFinish={(values) => handleUpdateUser(values)}>
                        
                    <Form.Item name="email" label="Email"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                        ]}
                    >
                        <Input className="input" placeholder="Email" />
                    </Form.Item>

                    <Form.Item name="name" label="Full name"
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

                    <Button type="primary" shape='round' htmlType="submit">Update</Button>

                </Form>
                </Modal>
            </Spin>
        </div>
        
    )
}

export default CustomHeader;