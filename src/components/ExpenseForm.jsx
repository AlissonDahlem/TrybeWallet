import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GenerateOption from '../helpers/generateOption';

class ExpenseForm extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input data-testid="value-input" />
        <input data-testid="description-input" />
        <label htmlFor="Moeda">
          Moeda
          <select id="Moeda" data-testid="currency-input">
            {currencies.map((element) => (<GenerateOption
              key={ element }
              name={ element }
            />))}
          </select>
        </label>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(Array).isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

export default connect(mapStateToProps)(ExpenseForm);
