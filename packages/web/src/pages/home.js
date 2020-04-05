import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/bank/all');
  }, []);

  return <div>Loading...</div>;
};

export default Home;
