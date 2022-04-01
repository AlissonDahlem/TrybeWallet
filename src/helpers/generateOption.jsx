import React from 'react';
import PropTypes from 'prop-types';

class GenerateOption extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <option name="Moeda" value={ name }>{ name }</option>
    );
  }
}

GenerateOption.propTypes = {
  name: PropTypes.string.isRequired,
};

export default GenerateOption;
