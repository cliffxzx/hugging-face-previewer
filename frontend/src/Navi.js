// import logo from './logo.svg';
import './App.css';
import {Menu} from 'shineout'
import React from 'react';

// navigation bar data
const data = [
  {
    id: '1',
    title: 'Home',
  },
  {
    id: '2',
    title: 'Reference',
  },
  {
    id: '3',
    title: 'Content',
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