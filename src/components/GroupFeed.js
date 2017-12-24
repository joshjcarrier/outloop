import React, { Component } from 'react';
import { graphql } from 'react-apollo';
// import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
// import truncate from 'truncate';
import Skeleton from 'react-loading-skeleton';

class GroupFeed extends Component {

  render() {
    // 1
    var query = this.props.groupFeedQuery;

    // 2
    if (query && query.error) {
      return <div>Error. Check query or authentication token.</div>
    }

    // 3
    // const threadEdges = this.props.groupFeedQuery.viewer.discoveryFeed.threads.edges;
    return (
      <div className='flex flex-column w-100'>
        <nav className='nowrap bb b--light-gray'>
          <a className="link dim black b f6 dib ttu pa2 ml4 bb bw2 b--blue" href="/" title="New Conversations">New Conversations</a>
          <a className="link dim gray    f6 dib ttu pa2 ml4" href="/" title="All Conversations">All Conversations</a>
          <a className="link dim gray    f6 dib ttu pa2 ml4" href="/" title="Files">Files</a>
        </nav>

        <input className="ml4 mt4 f6 f5-l input-reset fl black-80 bg-white bb b--solid bw1 b--light-gray pa3 lh-solid w-100 br2-ns br--left-ns" placeholder="Share something with this community" />

        <h2 className='ml4 pt2'>New conversations</h2>

        <section class="pl4 w-100">
          {/* {threadEdges.map(threadEdge => (
            <article className="fl w-100 w-50-m w-third-ns h5">

              <div className='h-100 pr3 pb3 db'>

                <div className='h-100 flex flex-column pa3 ba b--light-gray br2'>
                  <div>
                    <div className='fl w3'>
                      <img
                        src={threadEdge.node.threadStarter.sender.avatar}
                        className='w3 br-100 dib pt1'
                        alt={threadEdge.node.threadStarter.sender.displayName}
                        title={threadEdge.node.threadStarter.sender.displayName} />
                    </div>
                    <div className='fl w-80 pl3 pt2'>
                      <div className='f5 b helvetica pt1 truncate'>
                        {threadEdge.node.threadStarter.sender.displayName}
                      </div>
                      <div className='f6 helvetica pt1 truncate'>
                        in <Link to={`${process.env.PUBLIC_URL}/group/${threadEdge.node.group.id}`}
                          className='black-80 helvetica no-underline dim'>
                          {threadEdge.node.group.displayName}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='f6 pt3 lh-copy helvetica overflow-hidden'>
                    <div className='dt dt--fixed'>
                      <div className='dtc h5'>
                        {truncate(threadEdge.node.threadStarter.content.body.parsedBody, 240)}
                      </div>
                    </div>
                  </div>
                  <div className='f6 pt3 lh-copy helvetica'>
                    <span role='img' aria-label='replies' title={`Replies: ${threadEdge.node.replies.totalCount}`}>💬</span>&nbsp;{threadEdge.node.replies.totalCount}
                  </div>
                </div>
              </div>
            </article>
          ))} */}
        </section>
      </div>
    )
  }
}

// 1
const GROUP_FEED_QUERY = gql`
  # 2
  query OutloopGroupFeedQuery($id: String!) {
    group(databaseId: $id) {
      displayName
      id:databaseId
    }
  }
`

// 3
export default graphql(GROUP_FEED_QUERY, { name: 'groupFeedQuery', options: (props) => ({ variables: { id: props.id } }) })(GroupFeed)