import styled from 'styled-components';
import { theme } from '../../variables';
import { useState, useEffect } from 'react';
import {
  registerUser,
  signInWithPopup,
  getUserData,
} from '../../utils/firebase';
import { setUser } from '../../redux/reducers/user/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const userTemplate = {
  identity: 'user',
  id: '',
  name: 'Random',
  email: '',
  profile: '',
  left_overs: [],
  my_favorites: [],
  my_kitchen: [],
  messages: [],
  recommend_post_holder: {},
};

export default function LoginPage() {
  const { identity, name } = useSelector((state) => state.user_info);
  const history = useHistory();
  const d = useDispatch();
  async function signIn() {
    let { uid, email, username, profileImage } = await signInWithPopup();
    if (!uid) return;
    getUserData(uid).then((data) => {
      if (!data) {
        let userData = {
          ...userTemplate,
          name: username,
          email,
          profile: profileImage,
          id: uid,
        };
        registerUser(userData);
        d(setUser(userData));
      } else {
        d(setUser(data));
      }
    });
  }

  useEffect(() => {
    if (identity !== 'none') history.goBack();
  }, [identity]);

  return (
    <Main>
      <LoginForm>
        <Title>Sign In</Title>
        <LoginButton onClick={() => signIn()}>
          <GoogleLogin />
          Click to sign in
        </LoginButton>
      </LoginForm>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  padding: 10%;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const LoginForm = styled.div`
  padding: 20px;
  background-color: white;
  text-align: center;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px 20px;
  border: 1px solid ${theme.orange};
`;

const GoogleLogin = styled(FcGoogle)``;
