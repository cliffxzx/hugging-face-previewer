import {Button, Input, Select} from 'shineout'
import React from 'react';

const data = ['ALBERT', 'YOLOS', 'GPT-2', 'OTHERS']

class InputBox extends React.Component {
    render() {
        return (
            <Input.Group style={{padding: '5% 15%'}}>
                <Select keygen style={{ width: ''}} data={data} defaultValue="" placeholder="Model"/>
                <Input clearable placeholder="input something" style={{width: 360}} />
                <Button type='primary'>Compute</Button>
            </Input.Group>
        )
    }
}

export default InputBox