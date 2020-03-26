import { useState } from 'react';
import { createContainer } from 'unstated-next';

const Container = () => {
  const bankId = useState('all');
  const status = useState('{}');
  const prompt = useState(null);
  status[0] = JSON.parse(status[0]);

  return {
    bankId,
    status,
    prompt
  };
};

export default createContainer(Container);
