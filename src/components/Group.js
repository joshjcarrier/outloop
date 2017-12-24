import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
// import truncate from 'truncate';
import GroupFeed from './GroupFeed';

class Group extends Component {

  render() {
    // 1
    if (this.props.groupQuery && this.props.groupQuery.loading) {
      return <div></div>
    }

    // 2
    if (this.props.groupQuery && this.props.groupQuery.error) {
      return <div>Error. Check query or authentication token.</div>
    }

    // 3
    // const threadEdges = this.props.groupFeedQuery.viewer.discoveryFeed.threads.edges;
    return (
      <div className='fl w-100 vh-100'>
        <div className='fl w-20 vh-100 br b--light-gray'>
          <div className='flex flex-column'>
            <div className='pl4 pt4 bg-blue'>
              <h3 className='white-80 helvetica pt4'>{this.props.groupQuery.group.displayName}</h3>
              <div className='f6 white-70 helvetica pt2 pb4'>{this.props.groupQuery.group.description}</div>
            </div>
          </div>
          <div>
            <nav className='flex flex-column h-100 pt4'>
              <Link to={`${process.env.PUBLIC_URL}/`}
                className='w-100 f5 black-70 helvetica no-underline dib pl4 pv2 dim bg-light-blue'
                activeClassName='bg-white-30'>
                <span className='ph2'>
                  Conversations
                </span>
              </Link>
            </nav>
          </div>
        </div>
        <div className='fl w-80 pt4'>
          <GroupFeed id={this.props.groupQuery.group.id} />
        </div>
      </div>
    )
  }
}

// 1
const GROUP_QUERY = gql`
  # 2
  query OutloopGroupQuery($id: String!) {
    group(databaseId: $id) {
      description
      displayName
      id:databaseId
    }
  }
`

// 3
export default graphql(GROUP_QUERY, { name: 'groupQuery', options: (props) => ({ variables: { id: props.match.params.id } }) })(Group)