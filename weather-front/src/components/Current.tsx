import React from 'react';
import {Card, Col, Row} from "antd";
import '../pages/home.css'
import {useSelector} from "react-redux";
import {rootState} from "../store";

export const CurrentInfo: React.FC = function () {
    const {current} = useSelector((state: rootState) => state.current);
    return (
        <div>
            <Row>
                <Col span={12}>
                    <Card title='City Info' bordered={false}>
                        <p>{current.location?.name}</p>
                        <p>{current.location?.region}</p>
                        <p>{current.location?.country}</p>
                        <p>{current.location?.localtime}</p>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title='Current Weather' bordered={false}>
                        <p>{current.current?.temp}℃</p>
                        <p>{current.current?.condition}</p>
                        <img src={current.current?.icon} alt=''></img>
                    </Card>
                </Col>
            </Row>
            </div>
        );
}
