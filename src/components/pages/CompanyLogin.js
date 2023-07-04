import React, { useContext, useState } from 'react';
import styled from "styled-components";
import { login_comp } from '../../web3Client';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../Background';
import { CompanyContext } from '../CompanyContext';


function CompanyLogin() {
  const [input, setInput] = useState({});
  const [compRedirect, setCompRedirect] = useState(false);
  // const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();
  const { setCompanyName } = useContext(CompanyContext);

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login_comp(input['Companyusername'], input['CompanyPass']);
    if (res) {
      const companyName = input['Companyusername'];
      setCompRedirect(true);
      setCompanyName(companyName);
    }
  }
  

  // if (compRedirect) {
  //   navigate('/products', { state: { companyName } });
    
  // }

  if (compRedirect) {
    navigate('/products');
    
  }

  return (
      <Container>
        <video src='/videos/login.mp4' autoPlay loop muted />
        <Wrapper>
          <Title>SIGN IN AS A BUSINESS</Title>
          <Form onSubmit={handleSubmit}>
            <Input placeholder="Company Name" name='Companyusername' onChange={handleChange} />
            <Input type='password' placeholder="Company Password" name='CompanyPass' onChange={handleChange} />
            <Button type='submit'>LOGIN</Button>
            <SignUpLink to="/company-sign-up">CREATE A NEW ACCOUNT</SignUpLink>
          </Form>
        </Wrapper>
      </Container>
  );
}

export default CompanyLogin;

// Styles:

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
const SignUpLink = styled(Link)`
    text-align: center;
    color: teal;
    text-decoration: none;
  `;