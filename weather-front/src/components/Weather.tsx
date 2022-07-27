import React from 'react';
import {ForecastDay} from "../models/forecast";
import {ColumnsType} from "antd/es/table/Table";
import '../pages/home.css'
import {useSelector} from "react-redux";
import {Card, Col, Divider, Row, Table} from "antd";
import {RootState} from "../store/store";

const columns: ColumnsType<ForecastDay> = [
    {
        className: 'tableColum',
        title: 'Date',
        dataIndex: 'date'
    }, {
        className: 'tableColum',
        title: 'MinTemp(℃)',
        dataIndex: ['day', 'mintemp_c']
    }, {
        className: 'tableColum',
        title: 'MaxTemp(℃)',
        dataIndex: ['day', 'maxtemp_c']
    }, {
        className: 'tableColum',
        title: 'Weather',
        dataIndex: ['day', 'condition', 'text']
    }, {
        title: '',
        dataIndex: ['day', 'condition', 'icon'],
        render: (text) => {
            text = 'https:' + text;
            return <img src={text} alt=''/>
        }
    }
]

export const Weather: React.FC = function () {

    const {weather, loading} = useSelector((state: RootState) => state.weather);
    const data = weather?.forecast && weather?.forecast.length > 0 ? weather?.forecast.map((d: any, index: any) => ({
        ...d, key: `${new Date().getTime()}_${index}`
    })) : [];
    return (
        <div>
            <Row>
                <Col span={12}>
                    <Card loading={loading} title='City Info' bordered={false}>
                        <p>{weather?.location?.name}</p>
                        <p>{weather?.location?.region}</p>
                        <p>{weather?.location?.country}</p>
                        <p>{weather?.location?.localtime}</p>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card loading={loading} title='Current Weather' bordered={false}>
                        <p>{weather?.current?.temp}℃</p>
                        <p>{weather?.current?.condition}</p>
                        <img src={weather?.current?.icon} alt=''></img>
                    </Card>
                </Col>
            </Row>
            <Divider/>
            <h2 className='h2'>Forecast</h2>
            <Table columns={columns} loading={loading} dataSource={data} pagination={false}/>
        </div>
    )
}
