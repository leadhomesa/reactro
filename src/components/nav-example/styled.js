import styled from 'styled-components';
import Link from 'react-router-dom/Link';
import { colors, pxtorem } from 'styles/index-example';

export const StyledNav = styled.div`
  height: ${pxtorem(70)};
  border-bottom: ${pxtorem(4)} ${colors.coral} solid;
  background-color: ${colors.storm};
  padding: 0 1rem;
  display: flex;
  align-items: center;
  color: ${colors.white};
  font-size: ${pxtorem(20)};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;