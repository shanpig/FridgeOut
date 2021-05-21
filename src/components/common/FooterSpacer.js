import styled from 'styled-components';

export default function FooterSpacer() {
  return <Spacer></Spacer>;
}

const Spacer = styled.div`
  height: 50px;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;
