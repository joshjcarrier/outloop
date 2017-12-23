import React, { Component } from 'react';
import GlobalNav from './GlobalNav';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
// import AllTileFeed from './AllTileFeed';
import DiscoveryTileFeed from './DiscoveryTileFeed';
import TileFeed from './TileFeed';
import ClientOAuth2 from 'client-oauth2';

var auth = new ClientOAuth2({
  clientId: '5hFM4jak52LokZ8aVbbQ',
  accessTokenUri: 'https://www.yammer.com/oauth2/access_token.json',
  authorizationUri: 'https://www.yammer.com/oauth2/authorize',
  redirectUri: 'https://joshjcarrier.github.io/outloop/'
})

class App extends Component {
  componentDidMount() {
    const self = this;
    const isAuthenticated = localStorage.getItem("YAMMER_AUTH_TOKEN") != null;
    const codeMatch = this.props.location.search.match("code");
    if (!isAuthenticated) {
      if (codeMatch) {
        auth.code.getToken(this.props.location.search, { query: { client_id: '5hFM4jak52LokZ8aVbbQ', client_secret: '29sjksBRw0oIXi2A3cFmGPPkzGsDGvbCjTudIdSxs', code: codeMatch[0] } })
          .then(function (user) {
            localStorage.setItem('YAMMER_AUTH_TOKEN', user['access_token']['token']);
            self.props.history.push(`/`);
          }).catch(function (e) {
            window.location.replace(auth.code.getUri());
          });
      }
      else {
        window.location.replace(auth.code.getUri());
      }
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
            <Route exact path='/'>
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
            <Route path='/group/:id' component={TileFeed} />
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
