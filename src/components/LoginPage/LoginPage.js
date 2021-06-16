import { FcGoogle } from 'react-icons/fc';

import { theme } from '../../variables';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user/userActions';

import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { Animated } from 'react-animated-css';
import {
  registerUser,
  onUserChanged,
  getUserData,
  signInWithPopup,
} from '../../utils/firebase';

const NEW_USER_TEMPLATE = {
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
  const d = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const { identity } = useSelector((state) => state.user_info);

  async function signIn() {
    await signInWithPopup().then((userInfo) => {
      let { uid } = userInfo;

      if (!uid) return;

      getUserData(uid).then((data) => {
        window.localStorage.setItem('fridgeoutid', uid);
        activateUserData(data, userInfo);
      });
    });
  }

  function activateUserData(data, userInfo) {
    const { uid: id, email, username: name, profileImage: profile } = userInfo;
    const isNewUser = !data;
    if (isNewUser) {
      let userData = {
        ...NEW_USER_TEMPLATE,
        name,
        email,
        profile,
        id,
      };
      registerUser(userData);
      d(setUser(userData));
    } else {
      d(setUser(data));
    }
  }

  useEffect(() => {
    onUserChanged((userInfo) => {
      let { uid } = userInfo;

      if (!uid) return setIsLoading(false);

      getUserData(uid).then((data) => {
        activateUserData(data, userInfo);
      });
    });
  }, []);

  useEffect(() => {
    if (identity !== 'none') history.goBack();
  }, [identity, history]);

  if (isLoading) {
    return (
      <Main>
        <LoadingMessage>
          <ReactLoading type="spokes" />
          <Text>登入中，請稍後 ...</Text>
        </LoadingMessage>
      </Main>
    );
  }
  return (
    <Main>
      <Animated animationIn={'fadeIn'} animationInDuration={300}>
        <LoginForm>
          <Title>請先登入</Title>
          <LoginButton onClick={() => signIn()}>
            <GoogleLogin />以 Google 帳號登入
          </LoginButton>
        </LoginForm>
      </Animated>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  padding: 10%;
  justify-content: center;
  align-items: center;
  & * {
    color: black;
  }
`;

const Text = styled.div`
  text-align: center;
  color: white;
`;

const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 20px;
`;

const LoginForm = styled.div`
  padding: 20px;
  background-color: white;
  text-align: center;
  border-radius: 3px;
  box-shadow: 1px 1px 8px -5px black;
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
