import { useState } from 'react';
import { createContainer } from 'unstated-next';

const Container = () => {
  const isViewingHist = useState(false);

  return {
    isViewingHist
  };
};

export default createContainer(Container);
