import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Header from '../Header/Header';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { initialFetchCall } from '../Utils/apiCalls';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recentTopics: [],
      uniqueLobbyistTopics: [],
      errors: ''
    };
  }

  componentDidMount() {
    this.setInitialState();
  }

  setInitialState = async () => {
    if (!this.state.recentTopics.length) {
      try {
        const recentTopics = await initialFetchCall();
        this.setState({ recentTopics });
      } catch (error) {
        this.setState({ errors: error.message });
      }
    }
  };

  render() {
    return (
      <div className="app">
        <Header />
        <Navigation />
        <main>
          <div>
            <Switch>
              <Route
                path="/"
                render={() => {
                  this.setInitialState();
                  return (
                    <CardContainer recentTopics={this.state.recentTopics} />
                  );
                }}
              />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;