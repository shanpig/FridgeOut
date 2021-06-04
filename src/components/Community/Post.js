import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRecommendPostHolder } from '../../redux/reducers/user/userActions';
import { timeDifference } from '../../utils/math';

export default function Post({ name, profile_image, timestamp, children }) {
  return (
    <PostContainer>
      <Profile>
        <ProfileImage src={profile_image} alt="" />
        <Name className="name">{name}</Name>
        <Time>{timeDifference(new Date(timestamp.toDate()))}</Time>
      </Profile>
      <Content>{children}</Content>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);

  & * {
    color: black;
    /* font-family: 'Roboto'; */
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
