import React from 'react';
import styled from 'styled-components';

const MenuContainer = styled.aside`
  position: fixed;
  top: 20px;
  left: 20px;
  bottom: 20px;
  width: 400px;
  height: 100%;
`;

const Menu: React.FC = ({ children }) => {
  return <MenuContainer>{children}</MenuContainer>;
};

export default Menu;
