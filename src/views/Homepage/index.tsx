import React from 'react';
import CategoryProduct from './CategoryProduct';
import Banner from './components/Banner';
import HorizontalCardProduct from './HorizontalCardProduct';
import VerticalProductCard from './VerticalProductCard';

const HomePage = () => {
  return (
    <div>
      <CategoryProduct />
      <Banner />
      <HorizontalCardProduct
        category={'vagetables'}
        heading={'Top vegetables'}
      />
      <VerticalProductCard category={'vagetables'} heading={'Top vegetables'} />
    </div>
  );
};

export default HomePage;
