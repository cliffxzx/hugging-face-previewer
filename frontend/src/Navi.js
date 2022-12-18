// import logo from './logo.svg';
import {Menu} from 'shineout'
import React from 'react';

// navigation bar data
const data = [
  {
    id: '1',
    title: 'Home',
    link: 'http://172.27.101.167:3000/'
  },
  {
    id: '2',
    title: 'Reference',
    link: 'http://172.27.101.167:3000/#/reference'
  },
  {
    id: '3',
    title: 'Content',
    link: 'http://172.27.101.167:3000/#/content'
  },
  {
    id: '4',
    title: 'Log in',
    link: 'http://172.27.101.167:3000/#/login',
    children: [
      {
        id: '5',
        title: 'Sign in',
        link: 'http://172.27.101.167:3000/#/login'
      },
      {
        id: '6',
        title: 'Sign up',
        link: 'http://172.27.101.167:3000/#/signup'
      },
    ],
  }
]

class Navi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: ['1'],
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(da) {
    this.setState({
      active: [da.id],
    })
  }

  render() {
    const { active } = this.state
    return (
      <Menu
        mode="horizontal"
        keygen="id"
        linkKey="link"
        data={data}
        renderItem={d => d.title}
        active={da => active.includes(da.id)}
        inlineIndent={24}
        onClick={this.handleClick}
      />
    )
  }
}

export default Navi;