export const localeRunner = (locale, values = {}) => {
  Object.keys(values).forEach(key => {
    const replace = values[key];
    locale = locale.replace(new RegExp(`{${key}}`, 'g'), replace);
  });

  return locale;
};
