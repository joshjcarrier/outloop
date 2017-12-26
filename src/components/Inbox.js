import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ThreadCompactCard from './ThreadCompactCard';

class Inbox extends Component {

  render() {
    const query = this.props.inboxQuery;

    // 2
    if (query && query.error) {
      return <div>Error. Check query or authentication token.</div>
    }

    // 3 
    const threadEdges = !query.loading ? query.viewer.inbox.threads.edges : [0, 1, 2];
    return (
      <div className='flex flex-column w-100 mt4'>
        <nav className='nowrap overflow-x-auto bb b--light-gray'>
          <a className="link dim gray    f6 helvetica dib ttu pa2 ml4" href="inbox" title="Unread">Unread</a>
          <a className="link dim black b f6 helvetica dib ttu pa2 ml4 bb bw2 b--blue" href="inbox" title="All">All</a>
        </nav>

        <h2 className='ml4 pt3 helvetica'>All Conversations</h2>

        <section className="ph4 w-100">
          {threadEdges.map(threadEdge => (
            <div className='fl w-100'>
              <ThreadCompactCard thread={threadEdge.node}
                includeGroupContext={true} />
            </div>
          )).reverse()}
        </section>
      </div>
    )
  }
}

// 1
const INBOX_QUERY = gql`
  # 2
  query OutloopInboxQuery {
    viewer { 
      inbox {
        threads(last: 6, type: ALL) {
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
export default graphql(INBOX_QUERY, { name: 'inboxQuery' })(Inbox)