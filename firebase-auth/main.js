import Expo from 'expo';
import React, { Component } from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button, Spinner, Card, CardSection } from './src/components/common';
import { LoginForm } from './src/components/auth';
import { config } from './config/firebaseConfig';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: null
    };
  }

  componentWillMount() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) return this.setState({ authenticated: true });
      return this.setState({ authenticated: false });
    });
  }

  handleLogout() {
    firebase.auth().signOut();
  }

  renderContent() {
    const { authenticated } = this.state;
    switch (authenticated) {
      case true:
        return this.renderAuthContent();
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  renderAuthContent() {
    return (
      <Card>
        <CardSection>
          <Button onPress={this.handleLogout}>
            Log Out
          </Button>
        </CardSection>
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Authentication" />
            { this.renderContent() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

Expo.registerRootComponent(App);
