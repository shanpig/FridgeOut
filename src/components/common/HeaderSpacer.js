import { headerConfig } from '../../variables';

import styled from 'styled-components';

export default function HeaderSpacer() {
  return <Spacer />;
}

const Spacer = styled.div`
  height: ${headerConfig.mobile_height};
  @media screen and (min-width: 769px) {
    height: ${headerConfig.computer_height};
  }
`;
