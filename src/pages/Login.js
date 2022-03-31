import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userEmailAction from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disableJoinButton: true,
    };
  }

  validade = () => {
    const minLengthToPassword = 6;
    const { email } = this.state;
    const { password } = this.state;
    const validPassword = password.length >= minLengthToPassword;
    const user = email.substring(0, email.indexOf('@'));
    const domin = email.substring(email.indexOf('@') + 1, email.length);
    const oneNegative = -1;
    const numberThree = 3;
    const validadeEmail = ((user.length >= 1)
      && (domin.length >= numberThree)
      && (user.search('@') === oneNegative)
      && (domin.search('@') === oneNegative)
      && (user.search(' ') === oneNegative)
      && (domin.search(' ') === oneNegative)
      && (domin.search('.') !== oneNegative)
      && (domin.indexOf('.') >= 1)
      && (domin.lastIndexOf('.') < domin.length - 1));
    if (validPassword === true && validadeEmail === true) {
      this.setState({
        disableJoinButton: false,
      });
    } else {
      this.setState({
        disableJoinButton: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;

    this.setState({
      [name]: target.value,
    }, () => this.validade());
  };

  render() {
    const { disableJoinButton, email } = this.state;
    const { userEmail } = this.props;
    return (
      <div>
        <label htmlFor="loginForm">
          <input
            data-testid="email-input"
            name="email"
            placeholder="E-mail"
            type="email"
            onChange={ (event) => { this.handleChange(event); } }
          />

          <input
            data-testid="password-input"
            name="password"
            placeholder="Senha"
            type="password"
            onChange={ (event) => { this.handleChange(event); } }
          />
          <Link to="/carteira">
            <button
              type="button"
              disabled={ disableJoinButton }
              onClick={ () => userEmail(email) }
            >
              Entrar
            </button>
          </Link>

        </label>
      </div>
    );
  }
}

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(userEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
