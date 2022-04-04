const CURRENCIES = 'CURRENCIES';
const EXPENSES = 'EXPENSES';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: action.spent,
    };
  default:
    return state;
  }
};

export default wallet;
