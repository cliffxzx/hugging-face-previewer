import axios from 'axios';
import React from 'react'
import { Card, Form, Input } from 'shineout'

const InputBox=()=>{

    return(
        <Card style={{padding: '5% 15%'}}>
            <Form
                onSubmit={data => {
                    console.log(data)
                    // axios({
                    //     url: 'http://127.0.0.1:5000/callback',
                    //     method: "post",
                    //     data: data,
                    //     headers: {
                    //         'Access-Control-Allow-Origin' : 'http://127.0.0.1:5000',
                    //         'Access-Control-Allow-Methods':'GET,POST'
                    //     },
                    //     responseType: "json"
                    // })
                    // .then(function(response) {
                    //     console.log("response:")
                    //     console.log(response)
                    // })
                    // .catch(function(err) {
                    //     console.log(err)
                    // })

                    axios({
                        url: 'http://127.0.0.1:5000/callback',
                        method: "get",
                        params: data,
                        headers: {
                            'Access-Control-Allow-Origin' : 'http://127.0.0.1:5000',
                            'Access-Control-Allow-Methods': 'GET,POST'
                        },
                        responseType: "json"
                    })
                    .then(function(response) {
                        console.log("response:")
                        console.log(response)
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
                }}
            >
                <Input.Group>
                    <Input name="modelName" placeholder="model name" />
                    <Input name="input" placeholder="input text or file" />
                    <Card.Submit>Compute</Card.Submit>
                </Input.Group>

            </Form>             
        </Card>        
    )
}

export default InputBox