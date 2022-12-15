import React from 'react'
import { Card, Form, Input } from 'shineout'

const Login=()=>{
    return(
        <Card style={{ width: 500 , marginLeft: '30%', marginTop: '5%', marginBottom: '5%'}}>
            <Card.Header>Login</Card.Header>

            <Card.Body>
                <br />
                <Form
                onSubmit={data => {
                    console.log(data)
                }}
                >
                <Form.Item label="User name">
                    <Input name="Username" defaultValue="user" />
                </Form.Item>

                <Form.Item label="Password">
                    <Input name="Password" defaultValue="" />
                </Form.Item>
                </Form>
            </Card.Body>

            <Card.Footer align="right">
                <Card.Submit>Submit</Card.Submit>
            </Card.Footer>
        </Card>
    )
}

export default Login;