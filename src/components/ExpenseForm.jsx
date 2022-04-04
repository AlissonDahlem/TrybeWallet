import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import coinCurrencies from '../helpers/requestApi';
import GenerateOption from '../helpers/generateOption';
import { spentListAction, expenseSumAction } from '../actions/index';

const tagAlimentacao = 'Alimentação';

class FormExpenses extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: tagAlimentacao,
      expenses: {},
      expensesSum: 0,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { expensesEvent } = this.props;
    const { id, value, description, currency, method, tag, expensesSum } = this.state;
    const fetchAPI = await coinCurrencies();
    const stringToNumberValue = parseFloat(value);
    const stringToNumberExpenses = parseFloat(expensesSum);

    const exchange = fetchAPI[currency];
    const exchangeAsk = exchange.ask;

    const convertedValue = exchangeAsk * stringToNumberValue;

    const sumTotal = stringToNumberExpenses + convertedValue;

    this.setState({
      expensesSum: sumTotal,
      expenses: {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: fetchAPI,
      },
    }, () => {
      const { expenses } = this.state;
      expensesEvent(expenses);
      this.setState((prevState) => ({
        id: prevState.id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: tagAlimentacao,
      }));

      const { expensesSumToState } = this.props;
      expensesSumToState(sumTotal.toFixed(2));
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <div className="form-expenses">
          <label htmlFor="value-input">
            Valor:
            <input
              className="expenses-form"
              type="text"
              data-testid="value-input"
              id="value-input"
              value={ value }
              name="value"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description-input">
            Descrição:
            <input
              className="expenses-form"
              type="text"
              data-testid="description-input"
              id="description-input"
              value={ description }
              name="description"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda
            {' '}
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((element) => (<GenerateOption
                key={ element }
                name={ element }
              />))}
            </select>
          </label>

          <label htmlFor="method-pay">
            Forma de Pagamento:
            <select
              className="expenses-form1"
              data-testid="method-input"
              id="method-pay"
              value={ method }
              name="method"
              onChange={ this.handleChange }
            >
              <option name="dinheiro">Dinheiro</option>
              <option name="credito">Cartão de crédito</option>
              <option name="dedito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Categoria:
            <select
              className="expenses-form"
              data-testid="tag-input"
              id="tag-input"
              value={ tag }
              name="tag"
              onChange={ this.handleChange }
            >
              <option name="alimentacao">Alimentação</option>
              <option name="lazer">Lazer</option>
              <option name="trabalho">Trabalho</option>
              <option name="transporte">Transporte</option>
              <option name="saude">Saúde</option>
            </select>
          </label>

          <button
            className="expenses-form"
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>

        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expensesEvent: (value) => dispatch(spentListAction(value)),
  expensesSumToState: (sum) => dispatch(expenseSumAction(sum)),
});

FormExpenses.propTypes = {
  currencies: PropTypes.string,
  expensesEvent: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
