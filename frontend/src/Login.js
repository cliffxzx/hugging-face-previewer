import React from 'react'
import { Card, Form, Input } from 'shineout'

const Login=()=>{

    const handleClick=(()=>{
        window.alert("Please contact Cliff Chen()");
    })

    return(
        <Card style={{ width: 500 , marginLeft: '30%', marginTop: '5%', marginBottom: '5%'}}>
            <Card.Header>Sign In</Card.Header>

            <Card.Body>
                <br />
                <Form
                onSubmit={data => {
                    console.log(data)
                }}
                >
                <Form.Item label="User name">
                    <Input name="Username" placeholder="user" />
                </Form.Item>

                <Form.Item label="Password">
                    <Input.Password name="Password" />
                </Form.Item>
                </Form>
            </Card.Body>

            <Card.Footer align="right">
                <div align='left'>
                    <a href='http://localhost:3000/#/login' onClick={handleClick}>Forget Password</a>
                </div>
                <Card.Submit>Submit</Card.Submit>
            </Card.Footer>
        </Card>
    )
}

export default Login;