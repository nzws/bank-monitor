import { useState } from 'react';
import { createContainer } from 'unstated-next';

const Container = () => {
  const bankId = useState('all');
  const status = useState('{}');

  return {
    bankId,
    status
  };
};

export default createContainer(Container);
