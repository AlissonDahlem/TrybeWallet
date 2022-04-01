const userEmailAction = (email) => ({
  type: 'EMAIL',
  email,
});

export const currenciesAction = (currencies) => ({
  type: 'CURRENCIES',
  currencies,
});

export default userEmailAction;
