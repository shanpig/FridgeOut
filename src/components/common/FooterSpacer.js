import styled from 'styled-components';

export default function FooterSpacer() {
  return <Spacer />;
}

const Spacer = styled.div`
  height: 60px;
  @media screen and (min-width: 769px) {
    display: none;
  }
`;
