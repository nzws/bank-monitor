export const useName = item => {
  switch (item.data?.type) {
    case 'debit':
      return item.data?.merchant || '(Unknown shop)';
    case 'auto-payment':
    case 'immediate-transfer':
    case 'pay-easy':
      return item.data.to;
    case 'atm':
      return item.data.bank;
    case 'deposit-from-jp-bank':
      return `Deposit from JP Bank`;
    default:
      return item.name;
  }
};

export const descData = (item, isLong = false) => {
  const type = {
    debit: ['Debit', 'Visa debit'],
    'auto-payment': ['AP', 'Auto payment'],
    'immediate-transfer': ['Transfer', 'Immediate transfer'],
    'pay-easy': ['PE', 'Pay easy'],
    atm: ['ATM'],
    'deposit-from-jp-bank': ['', 'Deposit from JP-Bank']
  };

  const d = type[item];
  return d ? d[isLong ? 1 : 0] || d[0] : '';
};
