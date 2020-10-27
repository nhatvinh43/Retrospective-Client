import React from 'react';
import './index.css';
import { Modal, Layout, Input, Button, Result } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const NewBoardModal = (props) =>
{   

    return (
        <Layout>
            <Modal footer={[]} centered visible={props.isModalOpened} onCancel={props.onCancel}>
                <Result title="New board" className="result" status={props.status} icon={<PlusCircleFilled style={{fontSize: 60}}></PlusCircleFilled>} extra={[
                    <Input id="newBoardName" size="large" allowClear="true" placeholder="New board name" onChange={props.onChange} onPressEnter={props.onConfirm} value={props.newBoardName} />,
                    <Button id="addNewBoardButton" type="primary" shape="round" onClick = {props.onConfirm}>Create</Button>
                ]}>
                  
                </Result>
            </Modal>
        </Layout>
    );
}

export default NewBoardModal;