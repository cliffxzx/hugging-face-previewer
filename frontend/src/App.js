// import logo from './logo.svg';
import './App.css';
import {Button, Input, Select} from 'shineout'
import Navi from './Navi';
import React from 'react';
import AutoPlaySlide from './AutoplaySlides';

const data = ['ALBERT', 'YOLOS', 'GPT-2', 'OTHERS']

function App() {
  return (
    <div>
      <Navi/>
      <AutoPlaySlide />
      <Input.Group style={{width: '60%'}}>
        <Select keygen style={{ width: ''}} data={data} defaultValue="" placeholder="Model"/>
        <Input clearable placeholder="input something" style={{width: 360}} />
        <Button type='primary'>Compute</Button>
      </Input.Group>
      
      </div>
  );
}

export default App;
