import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GenerateOption from '../helpers/generateOption';
import { spentListAction } from '../actions/index';
import coinCurrencies from '../helpers/requestApi';

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      spent: '0',
      description: '',
      currencie: 'USD',
      payment: 'Dinheiro',
      category: 'Alimentação',
      expenses: [],
      exchangeRates: {},
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value,
    });
  }

  addButton = async () => {
    const { spent, description, currencie, payment, category, expenses, exchangeRates } = this.state;
    const request = await coinCurrencies();
    console.log(request);

    this.setState({
      exchangeRates: request,
    });

    const convertedToObject = {
      id: expenses.length,
      value: spent,
      description,
      currency: currencie,
      method: payment,
      tag: category,
      exchangeRates: request,
    };

    this.setState((prevState) => ({
      expenses: [...prevState.expenses, convertedToObject],
    }), () => this.auxiliarCallback());
  }

  auxiliarCallback = () => {
    const { spentList } = this.props;
    const { expenses } = this.state;

    spentList(expenses);
    this.setState({
      spent: 0,
      description: '',
      currencie: 'USD',
      payment: 'Dinheiro',
      category: 'Alimentação',
    });
  }

  render() {
    const { currencies } = this.props;
    const { spent, description, currencie, payment, category } = this.state;
    return (
      <form>
        <input
          placeholder="Valor"
          name="spent"
          data-testid="value-input"
          onChange={ this.handleChange }
          type="number"
          value={ spent }
        />
        <input
          placeholder="Descrição"
          data-testid="description-input"
          name="description"
          onChange={ this.handleChange }
          value={ description }
        />

        <label htmlFor="Moeda">
          Moeda:
          {' '}
          <select
            name="currencie"
            id="Moeda"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currencie }
          >
            {currencies.map((element) => (<GenerateOption
              key={ element }
              name={ element }
            />))}
          </select>
        </label>

        <label htmlFor="payment">
          Método de pagamento:
          {' '}
          <select
            data-testid="method-input"
            name="payment"
            onChange={ this.handleChange }
            value={ payment }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="categories">
          Categoria:
          {' '}
          <select
            name="category"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ category }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button onClick={ this.addButton } type="button">Adicionar despesa</button>

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

const mapDispatchToProps = (dispatch) => ({
  spentList: (spent) => dispatch(spentListAction(spent), () => console.log(spent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
