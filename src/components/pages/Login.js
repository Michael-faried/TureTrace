import React, {Component} from 'react'
import styled from "styled-components";
import {login, login_comp} from '../../web3Client';
import {Link} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import Background from '../Background';


const Container = styled.div`
        width: 100vw;
        height: 83vh;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

class Login extends Component{

  constructor() {
    super();
    this.state = {
      input: {},
      redirect: false,
      compredirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
      handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
          input
        });
      }

   handleSubmit = (e) => {
    e.preventDefault();
    login(this.state.input['username'],this.state.input['userpass']).then((res)=>{
      console.log(res);
      if(res)
      {
        this.setState({ redirect: true }) ;
      }
      else console.log("invalid login")
    }); 
    // console.log(this.state.input['username']);
    // console.log(this.state.input['userpass']);
    }

render(){
  return (
    <Background>
    <Container>
      <Wrapper>
        <Title>SIGN IN AS A USER</Title>
        <Form onSubmit={this.handleSubmit}>
          <Input placeholder="username" name='username' onChange={this.handleChange}/>
          <Input type='password' placeholder="password" name='userpass' onChange={this.handleChange}/>
          <Button type='submit' style={{alignSelf: 'center'}}>LOGIN</Button>
          <Link to="/sign-up" style={{alignSelf: 'center'}}>CREATE A NEW ACCOUNT</Link>
        </Form>
        { this.state.redirect ? (<Navigate to="/loggedin"/>) : null }
      </Wrapper>
    </Container>
    </Background>
  );
}
}
export default Login;