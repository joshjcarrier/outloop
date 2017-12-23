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
      this.props.history.push(`/`);
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
      <div className='center w100'>
        <div className='vh-100 fl w-25 pa2 white' style={{ backgroundColor: '#343A41' }}>
          <GlobalNav />
        </div>
        <div className='fl w-75 pa4 black'>
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`}>
              <div>
                <nav className="pa3 pa4-ns">
                  <a className="link dim black b f6 f5-ns dib mr3 ttu tracked" href="/" title="Home">Communities</a>
                  <a className="link dim gray    f6 f5-ns dib mr3 ttu tracked" href="/" title="Home">Departments</a>
                  <a className="link dim gray    f6 f5-ns dib mr3 ttu tracked" href="/" title="About">Projects</a>
                </nav>
                <h1 className='f2 lh-copy'>Communities</h1>
                <DiscoveryTileFeed />
              </div>
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
