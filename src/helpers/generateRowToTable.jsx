import React from 'react';
import PropTypes from 'prop-types';

class GenerateRowToTable extends React.Component {
  render() {
    const { description, tag, method, value, exchange, exchangeRates } = this.props;
    const exchangeName = exchangeRates[exchange].name;
    const valueExchangeUsed = exchangeRates[exchange].ask;
    const valueExchangeUserToNumber = parseFloat(valueExchangeUsed);
    const ValueExchangeUserFixed = valueExchangeUserToNumber.toFixed(2);
    const convertedValue = exchangeRates[exchange].ask * value;
    const convertedValueToTwoCase = convertedValue.toFixed(2);
    const paseFloatValue = parseFloat(value);
    const valueFixed = paseFloatValue.toFixed(2);
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ valueFixed }</td>
        <td>{ exchangeName }</td>
        <td>{ ValueExchangeUserFixed }</td>
        <td>{ convertedValueToTwoCase }</td>
        <td>Real</td>
      </tr>
    );
  }
}

GenerateRowToTable.propTypes = {
  description: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  exchange: PropTypes.string.isRequired,
  exchangeRates: PropTypes.shape({}).isRequired,
};

export default GenerateRowToTable;
