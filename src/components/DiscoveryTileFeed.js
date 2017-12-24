import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ThreadCompactCard from './ThreadCompactCard';

class DiscoveryTileFeed extends Component {

  render() {
    const query = this.props.discoveryTileFeedQuery;

    // 2
    if (query && query.error) {
      return <div>Error. Check query or authentication token.</div>
    }

    // 3 
    const threadEdges = !query.loading ? query.viewer.discoveryFeed.threads.edges : [0, 1, 2];
    return (
      <div className='flex flex-column w-100 mt4'>
        <nav className='nowrap bb b--light-gray'>
          <a className="link dim black b f6 dib ttu pa2 ml5 bb bw2 b--blue" href="/" title="Home">Communities</a>
          <a className="link dim gray    f6 dib ttu pa2 ml4" href="/" title="Home">Departments</a>
          <a className="link dim gray    f6 dib ttu pa2 ml4" href="/" title="About">Projects</a>
        </nav>

        <h2 className='ml5 pt3'>Communities</h2>

        <section className="pl5 w-100">
          {threadEdges.map(threadEdge => (
            <ThreadCompactCard thread={threadEdge.node}
              includeGroupContext={true} />
          ))}
        </section>
      </div>
    )
  }
}

// 1
const DISCOVERY_TILE_FEED_QUERY = gql`
  # 2
  query OutloopDiscoveryTileFeedQuery {
    viewer { 
      discoveryFeed {
        threads(last: 6) {
          edges {
            node {
              group {
                id:databaseId
                displayName
              }
              threadStarter {
                content {
                  ... on NormalMessageContent {
                    body {
                      parsedBody
                    }
                  }
                }
                sender {
                  ... on User {
                    avatar(width:80, height:80)
                    displayName
                  }
                }
              }
              replies(last:1) {
                totalCount
              }
              updatedAt
            }
          }
        }
      }
    }
  }
`

// 3
export default graphql(DISCOVERY_TILE_FEED_QUERY, { name: 'discoveryTileFeedQuery' })(DiscoveryTileFeed)