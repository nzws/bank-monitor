const locale = {
  login: {
    title: 'Security alert: new login',
    body: ' - IP: {ip}\n - Device: {device}'
  },
  login_failed: {
    title: 'Security alert: login failed',
    body: ' - IP: {ip}\n - Device: {device}'
  },
  newDeal: {
    title: 'Update: {bankId}',
    body: ' - {name}\n - Amount: {amount}\n - Balance of bank: {balance}'
  },
  updateError: {
    title: 'Data update failed: {bankId}',
    body: '{message}'
  },
  revoked: {
    title: 'Account token revoked',
    body: 'IP: {ip}'
  },
  deposit_requested_rakuten: {
    title: 'Your deposit request has been sent: {bankId}',
    body: ' - Amount: {amount}\n - Fee: {fee}\n - Schedule: {schedule}'
  },
  deposit_requested_rakuten_failed: {
    title: 'Error: Your deposit request could not be sent: {bankId}',
    body: '{message}'
  },
  ping: {
    title: 'Ping!',
    body: '{message}'
  },
  merchant_updated: {
    title: 'The merchant name has been updated: {bankId}',
    body: ' - {name}\n - Amount: {amount}\n - Balance of bank: {balance}'
  }
};

export default locale;
