import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class DiscoveryTileFeed extends Component {

  render() {
    // 1
    if (this.props.discoveryTileFeedQuery && this.props.discoveryTileFeedQuery.loading) {
      return <div></div>
    }

    // 2
    if (this.props.discoveryTileFeedQuery && this.props.discoveryTileFeedQuery.error) {
      return <div>Error. Check query or authentication token.</div>
    }

    // 3
    const threadEdges = this.props.discoveryTileFeedQuery.viewer.discoveryFeed.threads.edges;
    return (
      <div className='w100'>
        {threadEdges.map(threadEdge => (
          <div className='fl w-third pa2'>
            <article class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
              <div class="tc">
                <div className='fl w-40 pa2'>
                  <img
                    src={threadEdge.node.threadStarter.sender.avatar}
                    className='br-100 h3 w3 dib' />
                </div>
                <div className='fl w-60 pa2'>
                  <div className='b'>
                    {threadEdge.node.threadStarter.sender.displayName}
                  </div>
                  <div>
                    in {threadEdge.node.group.displayName}
                  </div>
                </div>
              </div>
              <p class="lh-copy measure center f6 black-70">
                {threadEdge.node.threadStarter.content.body.parsedBody}
              </p>
            </article>
          </div>
        ))}
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
                createdAt
                sender {
                  ... on User {
                    avatar(width:80, height:80)
                    displayName
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

// 3
export default graphql(DISCOVERY_TILE_FEED_QUERY, { name: 'discoveryTileFeedQuery' })(DiscoveryTileFeed)