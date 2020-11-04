import { CopyOutlined, DeleteOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Card, Layout, notification } from 'antd';
import React, { useState } from 'react';
import ConfirmModal from '../modal-confirm/index';
import avatar from './board-avt.jpg';
import './index.css';

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

    const onShare = (e) =>
    {
        e.stopPropagation();
        navigator.clipboard.writeText(process.env.REACT_APP_URL + process.env.PUBLIC_URL + "/#" + "/boards/" + props.board._id);

        notification.success({
            message: "Board URL copied to clipboard!",
            duration: 1.5,
            placement: "bottomLeft",
          });
    }

    return (
        <Layout>
            <Card title={props.board.name} className="card" style={{ width: 280, height: 290 }} hoverable="true" extra={created}
                cover={
                    <img alt="avatar" src={avatar}/>
                }
                actions={[
                <ShareAltOutlined key= "share" onClick = {onShare} />,
                <DeleteOutlined key="delete" onClick={onDelete}/>
                ]} >
            </Card>

            <ConfirmModal isModalOpened = {isModalOpened} status="error" title="Delete this board?" subtitle="This cannot be undone!" confirmLabel = "Delete" onConfirm ={onConfirm} onCancel = {onCancel}></ConfirmModal>
        </Layout>
       

    );
}

export default BoardListItem;