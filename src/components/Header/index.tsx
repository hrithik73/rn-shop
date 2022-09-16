import React from 'react';

import ProductHeader from './ProductsHeader';
import HomeHeader from './HomeHeader';

type HeaderProps = {
  type: 'home' | 'product';
};

const getComponent = {
  home: HomeHeader,
  product: ProductHeader,
};

const Header = ({ type }: HeaderProps) => {
  const CurrentHeader = getComponent[type || 'home'];

  return <CurrentHeader />;
};
export default Header;
