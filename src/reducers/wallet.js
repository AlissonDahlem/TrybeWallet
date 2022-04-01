const CURRENCIES = 'CURRENCIES';

const INITIAL_STATE = {
  currencies: [],
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default user;
