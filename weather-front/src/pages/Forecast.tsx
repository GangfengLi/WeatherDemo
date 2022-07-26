import React from 'react';
import {ForecastDay} from "../models/forecast";
import {ColumnsType} from "antd/es/table/Table";
import './home.css'
import {useSelector} from "react-redux";
import {rootState} from "../store";
import {Table} from "antd";

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

export const ForecastTable: React.FC = function (props, context) {

    const {forecast} = useSelector((state: rootState) => state.forecast);
    const data = forecast && forecast.length > 0 ? forecast.map((d: any, index: any) => ({
        ...d, key: `${new Date().getTime()}_${index}`
    })) : [];
    return (
        <div>
            <h2 className='h2'>Forecast</h2>
            <Table columns={columns} dataSource={data} pagination={false}/>
        </div>
    )
}
