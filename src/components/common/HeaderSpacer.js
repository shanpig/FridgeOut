import { head } from 'lodash';
import styled from 'styled-components';
import { headerConfig } from '../../variables';

export default function HeaderSpacer() {
  return <Spacer></Spacer>;
}

const Spacer = styled.div`
  height: ${headerConfig.mobile_height};
  @media screen and (min-width: 769px) {
    height: ${headerConfig.computer_height};
  }
`;
