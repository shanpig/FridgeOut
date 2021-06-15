import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

export default function GoBackButton() {
  const history = useHistory();
  return <Button onClick={history.goBack} />;
}

const Button = styled(BiArrowBack)`
  cursor: pointer;
  color: white;
  font-size: 1.3em;
  transform: scale(1.3);
`;
