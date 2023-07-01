import React, { Component } from 'react';
import styled from 'styled-components';
import Background from '../Background';
import { register } from '../../web3Client';
import { Navigate, Link } from 'react-router-dom';

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
  box-sizing: border-box;
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

const SignUpLink = styled(Link)`
  text-align: center;
  color: teal;
  text-decoration: none;
`;

class SignUp extends Component {
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

  validate() {
    let input = this.state.input;
    let isValid = true;
    if (typeof input['userpass'] !== 'undefined' && typeof input['confirmpass'] !== 'undefined') {
      if (input['userpass'] !== input['confirmpass']) {
        isValid = false;
      }
    }
    return isValid;
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.validate());
    console.log(this.state);
    if (this.validate()) {
      register(this.state.input['username'], this.state.input['useremail'], this.state.input['userpass']);
      this.setState({ redirect: true });
    }
  }

  compred = () => {
    this.setState({ compredirect: true });
  };

  render() {
    return (
      <Background>
        <Container>
          <Wrapper>
            <Title>CREATE A USER ACCOUNT</Title>
            <Form onSubmit={this.handleSubmit}>
              <Input type="text" name="username" placeholder="username" required onChange={this.handleChange} />
              <Input placeholder="email" name="useremail" required onChange={this.handleChange} />
              <Input type="password" name="userpass" placeholder="password" required onChange={this.handleChange} />
              <Input
                type="password"
                name="confirmpass"
                placeholder="confirm password"
                required
                onChange={this.handleChange}
              />
              <Button>CREATE</Button>
              <SignUpLink to="/user-login">ALREADY HAVE AN ACCOUNT?</SignUpLink>
            </Form>
            {this.state.redirect ? <Navigate to="/landing" /> : null}
          </Wrapper>
        </Container>
      </Background>
    );
  }
}

export default SignUp;
