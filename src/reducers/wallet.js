const CURRENCIES = 'CURRENCIES';
const EXPENSES = 'EXPENSES';
const EXPENSES_SUM = 'EXPENSES_SUM';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expensesSum: 0,
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
      expenses: [...state.expenses, action.spent],
    };
  case EXPENSES_SUM:
    return {
      ...state,
      expensesSum: action.sum,
    };
  default:
    return state;
  }
};

export default wallet;
