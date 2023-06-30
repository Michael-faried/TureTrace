import React, {Component} from 'react'
import styled from "styled-components";
import {login_comp} from '../../web3Client';
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


class CompanyLogin extends Component{
    constructor() {
    super();
    this.state = {
      input: {},
      compredirect: false,
      companyName: '',
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
    login_comp(this.state.input['Companyusername'],this.state.input['CompanyPass']).then((res)=>{
        if(res){
          this.setState({
            compRedirect: true,
            companyName: this.state.input['Companyusername'], // Store company name in state
          });
        }
      })
    // console.log(this.state.input['username']);
    // console.log(this.state.input['userpass']);
    }

render(){
  return (
    <Background>
    <Container>
      <Wrapper>
        <Title>SIGN IN AS A BUSINESS</Title>
        <Form onSubmit={this.handleSubmit}>
          <Input placeholder="Company Name" name='Companyusername' onChange={this.handleChange}/>
          <Input type='password' placeholder="Company Password" name='CompanyPass' onChange={this.handleChange}/>
          <Button type='submit' style={{alignSelf: 'center'}}>LOGIN</Button>
          <Link style={{alignSelf: 'center'}} to="/company-sign-up">CREATE A NEW ACCOUNT</Link>
        </Form>
        {this.state.compRedirect ? <Navigate to={{ pathname: '/products', state: { companyName: this.state.companyName } }} /> : null}
      </Wrapper>
    </Container>
    </Background>
  );
}
}
export default CompanyLogin;