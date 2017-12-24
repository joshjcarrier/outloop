import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import truncate from 'truncate';
import Skeleton from 'react-loading-skeleton';

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
            <article className="fl w-100 w-50-m w-third-ns h5" key={threadEdge}>

              <div className='h-100 pr3 pb3 db'>

                <div className='h-100 flex flex-column pa3 ba b--light-gray br2'>
                  <div>
                    <div className='fl w3'>
                      {threadEdge.node ? <img
                        src={threadEdge.node.threadStarter.sender.avatar}
                        className='w3 br-100 dib pt1'
                        alt={threadEdge.node.threadStarter.sender.displayName}
                        title={threadEdge.node.threadStarter.sender.displayName} /> : <div className='w3 h3 br-100 dib pt1 bg-light-gray' />}
                    </div>
                    <div className='fl w-80 pl3 pt2'>
                      <div className='f5 b helvetica pt1 truncate'>
                        {threadEdge.node ? threadEdge.node.threadStarter.sender.displayName : <Skeleton />}
                      </div>
                      <div className='f6 helvetica pt1 truncate'>
                        {threadEdge.node ? <span>in <Link to={`${process.env.PUBLIC_URL}/group/${threadEdge.node.group.id}`}
                          className='black-80 helvetica no-underline dim'>
                          {threadEdge.node.group.displayName}
                        </Link></span> : <Skeleton />}
                      </div>
                    </div>
                  </div>
                  <div className='f6 pt3 lh-copy helvetica overflow-hidden'>
                    <div className='dt dt--fixed'>
                      <div className='dtc h5'>
                        {threadEdge.node ? truncate(threadEdge.node.threadStarter.content.body.parsedBody, 240) : <Skeleton count='3' />}
                      </div>
                    </div>
                  </div>
                  <div className='f6 pt3 lh-copy helvetica'>
                    {threadEdge.node ? (threadEdge.node.replies.totalCount > 0 ? <span><span role='img' aria-label='replies' title={`Replies: ${threadEdge.node.replies.totalCount}`}>💬</span>&nbsp;{threadEdge.node.replies.totalCount}</span> : null) : <Skeleton />}
                  </div>
                </div>
              </div>
            </article>
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
                createdAt
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
            }
          }
        }
      }
    }
  }
`

// 3
export default graphql(DISCOVERY_TILE_FEED_QUERY, { name: 'discoveryTileFeedQuery' })(DiscoveryTileFeed)