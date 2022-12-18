import React from 'react'
import { Card, Form, Input } from 'shineout'

const Signup=()=>{
    return(
        <Card style={{ width: 500 , marginLeft: '30%', marginTop: '5%', marginBottom: '5%'}}>
            <Card.Header>Sign Up</Card.Header>

            <Card.Body>
                <br />
                <Form
                    onSubmit={data => {
                        console.log(data)
                    }}
                >
                    <Form.Item label="Name">
                        <Input.Group>
                            <Input name='FirstName' placeholder="first name" />
                            -
                            <Input name='LastName' placeholder="last name" />
                        </Input.Group>
                    </Form.Item>
                    
                    <Form.Item label="User name">
                        <Input name="Username" placeholder="user" />
                    </Form.Item>

                    <Form.Item label="Email">
                        <Input name='Email' placeholder="123@email.com"/>
                    </Form.Item>

                    <Form.Item label="Password">
                        <Input.Password name="Password" />
                    </Form.Item>
                </Form>
            </Card.Body>

            <Card.Footer align="right">
                <Card.Submit>Submit</Card.Submit>
            </Card.Footer>
        </Card>
    )
}

export default Signup;