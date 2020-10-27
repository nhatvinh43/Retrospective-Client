import React from 'react';
import './index.css';
import { Modal, Layout, Result, Button } from 'antd';

const ConfirmModal = (props) =>
{
    return (
        <Layout>
            <Modal footer={[]} centered visible={props.isModalOpened} onCancel={props.onCancel}>
                <Result className="result" status={props.status} title={props.title} subTitle={props.subTitle} extra={[
                    <Button key="cancel" type="text" onClick = {props.onCancel}>Cancel</Button>,
                    <Button type="dashed" danger shape="round" key="console" onClick={props.onConfirm}>{props.confirmLabel}</Button>
                    ]}></Result>
            </Modal>
        </Layout>
    );
}

export default ConfirmModal;