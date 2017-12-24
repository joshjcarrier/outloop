import React, { Component } from 'react';
import { graphql } from 'react-apollo';
// import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import ThreadCompactCard from './ThreadCompactCard';
// import truncate from 'truncate';
// import Skeleton from 'react-loading-skeleton';

class GroupFeed extends Component {

  render() {
    // 1
    var query = this.props.groupFeedQuery;

    // 2
    if (query && query.error) {
      return <div>Error. Check query or authentication token.</div>
    }

    // 3
    const allThreadEdges = !query.loading ? query.group.feed.threads.edges : [0, 1, 2];
    const unseenThreadEdges = !query.loading ? query.group.feed.unseenThreads.edges : [0, 1, 2];
    return (
      <div className='flex flex-column w-100'>
        <nav className='nowrap bb b--light-gray'>
          <a className="link dim black b f6 dib ttu pa2 ml4 bb bw2 b--blue" href="/" title="New Conversations">New Conversations</a>
          <a className="link dim gray    f6 dib ttu pa2 ml4" href="/" title="All Conversations">All Conversations</a>
          <a className="link dim gray    f6 dib ttu pa2 ml4" href="/" title="Files">Files</a>
        </nav>

        <input className="ml4 mt4 f6 f5-l input-reset fl black-80 bg-white bb b--solid bw1 b--light-gray pa3 lh-solid w-100 br2-ns br--left-ns" placeholder="Share something with this community" />

        <h2 className='ml4 pt2'>Trending now</h2>

        <section className="pl4 w-100">
          {allThreadEdges.map(threadEdge => (
            <ThreadCompactCard thread={threadEdge.node} />
          ))}
        </section>

        <h2 className='ml4 pt2'>New conversations</h2>

        <section className="pl4 w-100">
          {unseenThreadEdges.map(threadEdge => (
            <ThreadCompactCard thread={threadEdge.node} />
          ))}
        </section>
      </div>
    )
  }
}

// 1
const GROUP_FEED_QUERY = gql`
  # 2
  fragment ThreadFeed on GroupFeedThreadConnection {
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
  query OutloopGroupFeedQuery($id: String!) {
    group(databaseId: $id) {
      id:databaseId
      feed {
        threads(last:3, type: ALL) {
          ... ThreadFeed
        }
        unseenThreads: threads(last:3, type: UNSEEN) {
          ... ThreadFeed
        }
      }
    }
  }
`

// 3
export default graphql(GROUP_FEED_QUERY, { name: 'groupFeedQuery', options: (props) => ({ variables: { id: props.id } }) })(GroupFeed)