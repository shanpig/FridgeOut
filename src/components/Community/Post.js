import { theme } from '../../variables';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRecommendPostHolder } from '../../redux/reducers/user/userActions';
import { timeDifference } from '../../utils/math';

export default function Post({
  className,
  name,
  profile_image,
  timestamp,
  children,
}) {
  return (
    <PostContainer>
      <ProfileImage src={profile_image} alt="" />
      <Profile>
        <Name className="name">{name}</Name>
        <Time>{timeDifference(new Date(timestamp.toDate()))}</Time>
      </Profile>
      <Content className={className}>{children}</Content>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 15px;
  padding-top: 40px;
  background-color: rgba(255, 255, 255, 0.8);

  & * {
    color: ${theme.darkbrown};
    font-family: 'Noto Sans TC', 'Roboto';
    /* font-family: 'Roboto'; */
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const Name = styled.h2`
  font-size: 1.1em;
`;

const Time = styled.div`
  font-size: 0.8em;
  color: gray;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  background-color: ${theme.darkbrown};
  position: absolute;
  top: -25px;
  left: 50%;
  border: 2px solid white;
  transform: translateX(-50%);
  border-radius: 50%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
