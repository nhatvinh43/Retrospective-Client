import { Card } from 'antd';
import React, {useState} from 'react';
import './index.css';
import { Typography, Modal, Layout, Result, Button } from 'antd';
import { ShareAltOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import ConfirmModal from '../modal-confirm/index';
import avatar from '../../../public/board-avt.jpg';

const BoardListItem = (props) =>
{
    const [isModalOpened, setModalOpened] = useState(false);

    const created = new Date(props.board.created).toDateString();

    const onConfirm = (e) =>
    {
        e.stopPropagation();
        props.onConfirm();
        setModalOpened(false);
    }

    const onCancel = (e) =>
    {
        e.stopPropagation();
        setModalOpened(false);
    }

    const onDelete = (e) =>
    {
        e.stopPropagation();
        setModalOpened(true);
    }

    return (
        <Layout>
            <Card title={props.board.name} className="card" style={{ width: 280, height: 290 }} hoverable="true" extra={created}
                cover={
                    <img alt="avatar" src={avatar}/>
                }
                actions={[
                <ShareAltOutlined key= "share" />,
                <CopyOutlined key = "clone" />,
                    <DeleteOutlined key="delete" onClick={onDelete}/>
                ]} >
            </Card>

            <ConfirmModal isModalOpened = {isModalOpened} status="error" title="Delete this board?" subtitle="This cannot be undone!" confirmLabel = "Delete" onConfirm ={onConfirm} onCancel = {onCancel}></ConfirmModal>
        </Layout>
       

    );
}

export default BoardListItem;