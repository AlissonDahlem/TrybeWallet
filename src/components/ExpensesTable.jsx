import React from 'react';
import { connect } from 'react-redux';
import GenerateRowToTable from '../helpers/generateRowToTable';

class ExpensesTable extends React.Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table className="ExpensesTable">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <thead>
          { expenses.length > 0 && expenses.map((element, index) => (
            <GenerateRowToTable
              key={ index }
              value={ element.value }
              description={ element.description }
              tag={ element.tag }
              method={ element.method }
              exchange={ element.currency }
              exchangeRates={ element.exchangeRates }
            />))}
        </thead>
      </table>
    );
  }
}

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
