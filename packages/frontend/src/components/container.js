import { useState } from 'react';
import { createContainer } from 'unstated-next';

const Container = () => {
  const bankId = useState('all');
  const status = useState('{}');
  status[0] = JSON.parse(status[0]);

  return {
    bankId,
    status
  };
};

export default createContainer(Container);
