import { theme } from '../../variables';
import styled from 'styled-components';
import { timeDifference } from '../../utils/math';
import Logo from '../../images/logo-small-nobg.svg';

export default function Post({
  className,
  name,
  profile_image,
  timestamp,
  children,
}) {
  return (
    <PostContainer>
      <ProfileImage
        src={profile_image}
        alt=""
        onLoad={(e) => (e.target.style.opacity = 1)}
      />
      <Profile>
        <Name className="name">{name}</Name>
        <Time>{timeDifference(new Date(timestamp.toDate()))}</Time>
      </Profile>
      <Content className={className}>{children}</Content>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 15px;
  padding: 40px 10px 10px;
  background-blend-mode: lighten;
  background-color: rgba(255, 255, 255, 0.8);
  background-size: cover;
  background-position: 60px 30px;
  background-repeat: no-repeat;
  transition: all ease 0.2s;

  & * {
    color: ${theme.darkbrown};
    font-family: 'Noto Sans TC', 'Roboto';
  }

  &:hover {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.9);
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
  width: 60px;
  height: 60px;
  background-color: ${theme.darkbrown};
  position: absolute;
  top: -30px;
  left: 50%;
  border: 2px solid white;
  transform: translateX(-50%);
  border-radius: 50%;
  transition: opacity 0.3s ease;
  opacity: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
