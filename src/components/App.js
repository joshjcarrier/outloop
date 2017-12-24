import React, { Component } from 'react';
import GlobalNav from './GlobalNav';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
// import AllTileFeed from './AllTileFeed';
import DiscoveryTileFeed from './DiscoveryTileFeed';
import TileFeed from './TileFeed';
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
      <div className='flex vh-100'>
        <div className='h-100 fl w5 pv2 white' style={{ backgroundColor: '#343A41' }}>
          <GlobalNav />
        </div>
        <div className='w-75 mt4'>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`}>
              <DiscoveryTileFeed />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/group/:id`} component={TileFeed} />
            {/* <Route exact path='/' component={LinkList} /> */}
            {/* <Route exact path='/create' component={CreateLink}/> */}
          </Switch>
        </div>
      </div>
    );
  }
}

// export default App
export default withRouter(App)
