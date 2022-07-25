import React, {Component} from 'react';
import {Card, Col, Row} from "antd";
import {Location} from "../models/location";
import {Current} from "../models/current";
import './home.css'

interface IProps {
    location?: Location;
    current?: Current;
}

class CurrentInfo extends Component<IProps, any> {

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Card title='City Info' bordered={false}>
                            <p>{this.props.location?.name}</p>
                            <p>{this.props.location?.region}</p>
                            <p>{this.props.location?.country}</p>
                            <p>{this.props.location?.localtime}</p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title='Current Weather' bordered={false}>
                            <p>{this.props.current?.temp}℃</p>
                            <p>{this.props.current?.condition}</p>
                            <img src={this.props.current?.icon} alt=''></img>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CurrentInfo;
