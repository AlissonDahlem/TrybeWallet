export const userEmailAction = (email) => ({
  type: 'EMAIL',
  email,
});

export const currenciesAction = (currencies) => ({
  type: 'CURRENCIES',
  currencies,
});

export const spentListAction = (spent) => ({
  type: 'EXPENSES',
  spent,
});
