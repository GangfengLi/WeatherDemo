import React, {createRef, useState} from 'react';
import {Button, Form, FormInstance, Input} from "antd";
import './home.css'
import {Weather} from "../components/Weather";
import {useDispatch} from "react-redux";
import {triggerUpdateWeather} from "../store/slices/weatherSlice";

interface IState {
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
        showElem: false
    });

    const dispatch = useDispatch()

    const fetch = (form: any) => {
        const code: number = form.code;
        dispatch(triggerUpdateWeather({code}))
        setState({
            showElem: true
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
                <Weather/>
            </div>
        </div>
    );
}
