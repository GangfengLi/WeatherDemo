import React, {Component} from 'react';
import {Table} from "antd";
import {ForecastDay} from "../models/forecast";
import {ColumnsType} from "antd/es/table/Table";
import './home.css'

interface IProps {
    forecast?: ForecastDay[];
}

export class ForecastTable extends Component<IProps, any> {
    render() {
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

        const data = this.props.forecast;

        return (
            <div>
                <h2 className='h2'>Forecast</h2>
                <Table columns={columns} dataSource={data?.map((d, index) => ({
                    ...d, key: `${new Date().getTime()}_${index}`
                }))} pagination={false}>
                </Table>
            </div>
        );
    }
}
