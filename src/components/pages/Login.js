import React, { Component } from 'react';
import styled from 'styled-components';
import { login } from '../../web3Client';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Wrapper = styled.div`
  width: 80%;
  max-width: 400px;
  padding: 20px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.9);
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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      input: {},
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    login(this.state.input['username'], this.state.input['userpass']).then((res) => {
      console.log(res);
      if (res) {
        this.setState({ redirect: true });
      } else console.log('invalid login');
    });
  };

  render() {
    return (
      <Container>
        <VideoBackground src='/videos/login.mp4' autoPlay loop muted />
        <Wrapper>
          <Title>SIGN IN AS A USER</Title>
          <Form onSubmit={this.handleSubmit}>
            <Input placeholder="username" name="username" onChange={this.handleChange} />
            <Input type="password" placeholder="password" name="userpass" onChange={this.handleChange} />
            <Button type="submit">LOGIN</Button>
            <Link to="/sign-up" style={{ textAlign: 'center', color: 'teal', textDecoration: 'none' }}>
              CREATE A NEW ACCOUNT
            </Link>
          </Form>
          {this.state.redirect ? <Navigate to="/loggedin" /> : null}
        </Wrapper>
      </Container>
    );
  }
}

export default Login;
