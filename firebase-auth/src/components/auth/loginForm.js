import React, { Component } from 'react';
import firebase from 'firebase';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Button, Card, CardSection, FormField, Spinner } from '../common';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
  }

  onChangeText(field, text) {
    this.setState({ [field]: text });
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        // if sign in unsuccessful, attempt to create a new account
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFailure);
      })
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  onLoginFailure() {
    this.setState({
      error: 'Authentication Failed.',
      loading: false
    });
  }

  renderError() {
    return (
      <Text style={styles.errorText}>
        {this.state.error}
      </Text>
    );
  }

  renderButton() {
    const { loading } = this.state;
    if (loading) return <Spinner size="small" />;
    return (
      <Button onPress={this.onButtonPress}>Log In</Button>
    );
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <Card>
        <CardSection>
          <FormField
            placeholder="example@email.com"
            label="email"
            value={email}
            onChangeText={text => this.onChangeText('email', text)}
          />
        </CardSection>
        <CardSection>
          <FormField
            secureTextEntry
            placeholder=""
            label="password"
            value={password}
            onChangeText={text => this.onChangeText('password', text)}
          />
        </CardSection>

        {error.length ? this.renderError() : null }

        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    paddingTop: 15,
    paddingBottom: 15
  }
});

export default LoginForm;