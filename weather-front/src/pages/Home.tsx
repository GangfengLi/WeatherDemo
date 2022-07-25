import React, {Component, createRef, RefObject} from 'react';
import {fetchData} from "../api/fetchData";
import {Button, Divider, Form, FormInstance, Input, message} from "antd";
import './home.css'
import CurrentInfo from "./Current";
import {Location} from "../models/location";
import {Current} from "../models/current";
import {ForecastDay} from "../models/forecast";
import {ForecastTable} from "./Forecast";

interface IState {
    location?: Location,
    current?: Current,
    forecast?: ForecastDay[],
    showElem: boolean
}

const layout = {
    labelCol: {span: 12},
    wrapperCol: {span: 16},
    labelAlign: 'left' as 'left'
};
const tailLayout = {
    wrapperCol: {offset: 12, span: 16},
};

class Home extends Component<any, IState> {
    formRef: RefObject<FormInstance>

    constructor(props: any, context: any) {
        super(props, context);
        this.formRef = createRef<FormInstance>()
        this.state = {
            showElem: false
        }
    }

    fetchData = (form: any) => {
        fetchData(form.code).then(response => {
            const location = response.data.location;
            const temp = response.data.current.temp_c;
            const condition = response.data.current.condition.text;
            const icon = 'https:' + response.data.current.condition.icon;
            const forecast = response.data.forecast.forecastday;
            this.setState({
                location,
                current: {
                    temp,
                    condition,
                    icon
                },
                forecast,
                showElem: true
            })
        }).catch(err => {
            console.log(err)
            message.error('Fetch weather data failed')
        })
    }

    render() {
        return (
            <div>
                <Form id='home-form' {...layout} ref={this.formRef} onFinish={this.fetchData}>
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
                <div className='box' style={{display: this.state.showElem ? 'block' : 'none'}}>
                    <CurrentInfo location={this.state.location} current={this.state.current}/>
                    <Divider/>
                    <ForecastTable forecast={this.state.forecast}/>
                </div>
            </div>
        );
    }
}

export default Home;
