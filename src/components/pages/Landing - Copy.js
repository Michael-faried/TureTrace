import React, {useEffect} from 'react';
import '../../App.css';
import Background from '../Background'
import Login from '../pages/Login'
import {init} from '../../web3Client';

export default function Landing({ navigation }) {
  useEffect(()=>{
    init();
   },[]);

  return (
    <Background>
      <Login />
    </Background>
  );
}