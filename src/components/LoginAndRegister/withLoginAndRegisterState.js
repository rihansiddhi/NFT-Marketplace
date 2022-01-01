import React  from "react";
import {login_initial_state, register_initial_state} from "./initial_state";

const withLoginAndRegisterState = (WrappedComponent) => class WithLoginAndRegisterState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: login_initial_state(),
      registerState: register_initial_state(),
    };
  }

  handleStateChange = ({
                    form,
                    key,
                    value,
  }) => {
    if (form && key) {
      const stateVariable = form === 'login' ? 'loginState' : 'registerState';
      this.setState({
        [stateVariable]: {...this.state[stateVariable], [key]: value},
      });
    }
  };

  resetState = (form) => {
    const stateVariable = form === 'login' ? 'loginState' : 'registerState';
    this.setState({
      [stateVariable]: form === 'login' ? login_initial_state() : register_initial_state(),
    });
  }

  render() {
    return (
        <WrappedComponent
          {...this.props}
          state={{...this.state}}
          handleStateChange={this.handleStateChange}
          resetState={this.resetState}
        />
    );
  }
};

export default withLoginAndRegisterState;