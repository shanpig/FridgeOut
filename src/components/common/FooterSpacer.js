import styled from 'styled-components';

export default function FooterSpacer() {
  return <Spacer></Spacer>;
}

const Spacer = styled.div`
  height: 40px;
  background-color: rgba(0, 0, 0, 0.6);
  @media screen and (min-width: 769px) {
    height: 50px;
    display: none;
  }
`;
