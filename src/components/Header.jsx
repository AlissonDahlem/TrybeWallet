import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import coinCurrencies from '../helpers/requestApi';
import { currenciesAction } from '../actions';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
    };
  }

  async componentDidMount() {
    const requestApi = await coinCurrencies();
    let filterKeys = [];
    filterKeys = Object.keys(requestApi);
    this.setState({
      currencies: filterKeys,
    });
  }

  render() {
    const { email, currenciesProp, expensesSum } = this.props;
    const { currencies } = this.state;
    currenciesProp(currencies);
    return (
      <>
        <h1 data-testid="email-field">{ email }</h1>
        <h2 data-testid="total-field">
          { expensesSum > 0 ? expensesSum : '0' }
        </h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  currenciesProp: PropTypes.func.isRequired,
  expensesSum: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  email: store.user.email,
  expensesSum: store.wallet.expensesSum,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesProp: (currencies) => dispatch(currenciesAction(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
