import React, { Component } from 'react';
import GlobalNav from './GlobalNav';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
// import AllTileFeed from './AllTileFeed';
import DiscoveryTileFeed from './DiscoveryTileFeed';
import Group from './Group';
import Inbox from './Inbox';
import QueryString from 'query-string';

class App extends Component {
  componentDidMount() {
    const parsed = QueryString.parse(this.props.location.hash) || {};
    const accessToken = parsed['access_token'];

    if (accessToken) {
      localStorage.setItem('YAMMER_AUTH_TOKEN', accessToken);
      window.location.replace(process.env.PUBLIC_URL);
    }

    const isAuthenticated = localStorage.getItem("YAMMER_AUTH_TOKEN") != null;
    if (!isAuthenticated) {
      window.location.replace('https://www.yammer.com/dialog/oauth?client_id=5hFM4jak52LokZ8aVbbQ&response_type=token');
    }
  }

  renderLogin() {
    return (<div>Logging in...</div>);
  }

  render() {
    const isAuthenticated = localStorage.getItem("YAMMER_AUTH_TOKEN") != null;

    if (!isAuthenticated) {
      return this.renderLogin();
    }

    return (
      <div className='dt w-100 vh-100'>
        <div className='dt-row'>
          <div className='dtc v-top h-100 w5-l w3-m w3-ns w3 fl pv2 white' style={{ backgroundColor: '#343A41' }}>
            <GlobalNav />
          </div>
          <div className='dtc v-top h-100 w-100'>
            <Switch>
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={DiscoveryTileFeed} />
              <Route path={`${process.env.PUBLIC_URL}/inbox`} component={Inbox} />
              <Route path={`${process.env.PUBLIC_URL}/group/:id`} component={Group} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

// export default App
export default withRouter(App)
