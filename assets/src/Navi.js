// import logo from './logo.svg';
import {Menu} from 'shineout'
import React from 'react';

// navigation bar data
const data = [
  {
    id: '1',
    title: 'Home',
    link: 'http://http://localhost:3000/'
  },
  {
    id: '2',
    title: 'Reference',
    link: 'http://localhost:3000/#/reference'
  },
  {
    id: '3',
    title: 'Content',
    link: 'http://localhost:3000/#/content'
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