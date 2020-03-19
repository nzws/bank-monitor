import api from './api';

const updateStatus = async setStatus => {
  const data = {};

  const { result } = await api({
    path: 'api/status',
    method: 'POST'
  });
  result.forEach(v => (data[v.bankId] = v));

  setStatus(JSON.stringify(data));
};

export default updateStatus;
