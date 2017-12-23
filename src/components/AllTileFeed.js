import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class AllTileFeed extends Component {

  render() {
    // 1
    if (this.props.allTileFeedQuery && this.props.allTileFeedQuery.loading) {
      return <div>Loading</div>
    }

    // 2
    if (this.props.allTileFeedQuery && this.props.allTileFeedQuery.error) {
      return <div>Error</div>
    }

    // 3
    const threadEdges = this.props.allTileFeedQuery.allFeed.threads.edges;
    return (
      <div>
        {threadEdges.map(threadEdge => (
          <div className='fl w-third pa2'>
            <div className='fl w-100 pa2'>
              <div className='fl w-25 pa2'>
                <img
                  src={threadEdge.node.sender.avatar}
                  className='br-100 h3 w3 dib' />
              </div>
              <div className='fl w-50 pa2'>
                <div className='b'>
                  {threadEdge.node.sender.displayName}
                </div>
                <div>
                  {threadEdge.group.displayName} Network
                </div>
              </div>
              <div className='fl w-25 pa2'>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

// 1
const ALL_TILE_FEED_QUERY = gql`
  # 2
  query OutloopAllTileFeedQuery {
    allFeed {
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
`

// 3
export default graphql(ALL_TILE_FEED_QUERY, { name: 'allTileFeedQuery' })(AllTileFeed)