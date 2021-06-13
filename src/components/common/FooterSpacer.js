import styled from 'styled-components';

export default function FooterSpacer() {
  return <Spacer></Spacer>;
}

const Spacer = styled.div`
  height: 60px;
  /* background-color: rgba(0, 0, 0, 0.6); */
  @media screen and (min-width: 769px) {
    display: none;
  }
`;
