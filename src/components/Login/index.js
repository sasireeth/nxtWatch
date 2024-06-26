import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of withRouter

import {
  LoginContainer,
  ShadowContainer,
  LoginDivContainer,
  ImageEl,
  LoginFormContainer,
  InputEl,
  LabelEl,
  ButtonEl,
  ErrorMsg,
} from './styledComponents';

function Login() {
  const [visibility, setVisibility] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate(); // Use useNavigate hook instead of history prop

  const showPassword = (event) => {
    setVisibility(event.target.checked);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    });

    navigate('/'); // Use navigate function to navigate to home page
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken !== undefined) {
    return navigate('/');
  }

  return (
    <LoginContainer>
      <ShadowContainer>
        <ImageEl
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
        <LoginFormContainer onSubmit={formSubmit}>
          <LoginDivContainer>
            <LabelEl>USERNAME</LabelEl>
            <InputEl
              type="text"
              placeholder="Username"
              value={username}
              onChange={onChangeUsername}
            />
          </LoginDivContainer>
          <LoginDivContainer>
            <LabelEl>PASSWORD</LabelEl>
            <InputEl
              type={visibility ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </LoginDivContainer>
          <LoginDivContainer direction="row">
            <InputEl
              type="checkbox"
              id="checkbox"
              onChange={showPassword}
            />
            <LabelEl htmlFor="checkbox" $cursor="pointer">
              Show Password
            </LabelEl>
          </LoginDivContainer>
          <ButtonEl>Login</ButtonEl>
          {showSubmitError && (
            <ErrorMsg className="error-message">*{errorMsg}</ErrorMsg>
          )}
        </LoginFormContainer>
      </ShadowContainer>
    </LoginContainer>
  );
}

export default Login;
