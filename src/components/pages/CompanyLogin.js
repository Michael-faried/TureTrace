import React, { Component } from 'react';
import styled from "styled-components";
import { login_comp } from '../../web3Client';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Background from '../Background';


const SignUpLink = styled(Link)`
  text-align: center;
  color: teal;
  text-decoration: none;
`;

class CompanyLogin extends Component {
  constructor() {
    super();
    this.state = {
      input: {},
      compRedirect: false,
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

  handleSubmit(e) {
    e.preventDefault();
    login_comp(this.state.input['Companyusername'], this.state.input['CompanyPass']).then((res) => {
      if (res) {
        this.setState({
          compRedirect: true,
          companyName: this.state.input['Companyusername'], // Store company name in state
        });
      }
    });
  }

  render() {
    return (
      <Background>
        <Container>
          <Wrapper>
            <Title>SIGN IN AS A BUSINESS</Title>
            <Form onSubmit={this.handleSubmit}>
              <Input placeholder="Company Name" name='Companyusername' onChange={this.handleChange} />
              <Input type='password' placeholder="Company Password" name='CompanyPass' onChange={this.handleChange} />
              <Button type='submit'>LOGIN</Button>
              <SignUpLink to="/company-sign-up">CREATE A NEW ACCOUNT</SignUpLink>
            </Form>
            {this.state.compRedirect ? <Navigate to={{ pathname: '/products', state: { companyName: this.state.companyName } }} /> : null}
          </Wrapper>
        </Container>
      </Background>
    );
  }
}

export default CompanyLogin;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Add this line to include padding and border in width calculation */
`;


const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 4px;
`;
