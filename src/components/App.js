import React, { Component } from 'react';
import GlobalNav from './GlobalNav';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
// import AllTileFeed from './AllTileFeed';
import DiscoveryTileFeed from './DiscoveryTileFeed';
import TileFeed from './TileFeed';

class App extends Component {
  render() {
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
                  <a className="link dim black b f6 f5-ns dib mr3 ttu tracked" href="#" title="Home">Communities</a>
                  <a className="link dim gray    f6 f5-ns dib mr3 ttu tracked" href="#" title="Home">Departments</a>
                  <a className="link dim gray    f6 f5-ns dib mr3 ttu tracked" href="#" title="About">Projects</a>
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
    )
  }
}

// export default App
export default withRouter(App)
