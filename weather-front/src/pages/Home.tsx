import React, {createRef, useState} from 'react';
import {fetchData} from "../api/fetchData";
import {Button, Divider, Form, FormInstance, Input, message} from "antd";
import './home.css'
import CurrentInfo from "./Current";
import {Location} from "../models/location";
import {Current} from "../models/current";
import {ForecastTable} from "./Forecast";
import {useDispatch} from "react-redux";
import {IForecastAction} from "../store/reducer/forecast";

interface IState {
    location?: Location,
    current?: Current,
    showElem?: boolean
}

const layout = {
    labelCol: {span: 12},
    wrapperCol: {span: 16},
    labelAlign: 'left' as 'left'
};
const tailLayout = {
    wrapperCol: {offset: 12, span: 16},
};

export const Home: React.FC<IState> = function () {

    const formRef = createRef<FormInstance>();
    const [state, setState] = useState({
        location: {} as Location,
        current: {} as Current,
        showElem: false
    });

    const dispatch = useDispatch()

    const fetch = (form: any) => {
        fetchData(form.code).then(response => {
            const location = response.data.location;
            const temp = response.data.current.temp_c;
            const condition = response.data.current.condition.text;
            const icon = 'https:' + response.data.current.condition.icon;
            const forecast = response.data.forecast.forecastday;
            setState({
                location,
                current: {
                    temp,
                    condition,
                    icon
                },
                showElem: true
            })

            dispatch({
                type: IForecastAction.CHANGE,
                payload: {forecast: forecast}
            })

        }).catch(err => {
            console.log(err)
            message.error('Fetch weather data failed')
        })
    }

    return (
        <div>
            <Form id='home-form' {...layout} ref={formRef} onFinish={fetch}>
                <Form.Item label='Type a Zip Code to Search' name='code'
                           rules={[{required: true, message: 'Please input a zip code'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Go
                    </Button>
                </Form.Item>
            </Form>
            <div className='box' style={{display: state.showElem ? 'block' : 'none'}}>
                <CurrentInfo location={state.location} current={state.current}/>
                <Divider/>
                <ForecastTable/>
            </div>
        </div>
    );
}
