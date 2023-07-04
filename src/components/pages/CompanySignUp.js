import React, { Component } from 'react';
import styled from 'styled-components';
import Background from '../Background';
import { Navigate } from 'react-router-dom';
import { register_comp } from '../../web3Client';
import { Link } from 'react-router-dom';


class CompanySignUp extends Component {
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
    if (typeof input['companypass'] !== 'undefined' && typeof input['confirmpass'] !== 'undefined') {
      if (input['companypass'] !== input['confirmpass']) {
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
      register_comp(
        this.state.input['companyname'],
        this.state.input['companyemail'],
        this.state.input['companypass']
      );
      this.setState({ redirect: true });
      console.log('companyyyy');
    }
  }

  userred = () => {
    console.log('hi');
    this.setState({ compredirect: true });
  };

  render() {
    return (
        <Container>
          <video src='/videos/login.mp4' autoPlay loop muted />
          <Wrapper>
            <Title>CREATE A BUSINESS ACCOUNT</Title>
            <Form onSubmit={this.handleSubmit}>
              <Input
                type="text"
                name="companyname"
                placeholder="Company Name"
                required
                onChange={this.handleChange}
              />
              <Input
                type="email"
                name="companyemail"
                placeholder="Company E-mail"
                required
                onChange={this.handleChange}
              />
              <Input
                type="password"
                name="companypass"
                placeholder="Password"
                required
                onChange={this.handleChange}
                />
              <Input
                type="password"
                name="confirmpass"
                placeholder="Confirm Password"
                required
                onChange={this.handleChange}
              />
              <Button type="submit">CREATE</Button>
              <SignUpLink to="/company-login">ALREADY HAVE AN ACCOUNT?</SignUpLink>
            </Form>
            {this.state.compredirect ? <Navigate to="/sign-up" /> : null}
            {this.state.redirect ? <Navigate to="/company-login" /> : null}
          </Wrapper>
        </Container>
    );
  }
}

export default CompanySignUp;

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
border-radius: 30px; /* set border radius to 10px */
background-color: rgba(255, 255, 255, 0.9); /* set opacity to 0.5 */
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
