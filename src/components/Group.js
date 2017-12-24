import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
// import truncate from 'truncate';
import GroupFeed from './GroupFeed';
import Skeleton from 'react-loading-skeleton';

class Group extends Component {

  render() {
    // 1
    const query = this.props.groupQuery;

    // 2
    if (query && query.error) {
      return <div>Error. Check query or authentication token.</div>
    }

    const group = !query.loading ? query.group : null;

    // 3
    return (
      <div className='dt w-100 h-100'>
        <div className='w5 dtc v-top  br b--light-gray'>
          <div className='pl4 pt4 pr2 bg-blue'>
            <h3 className='white-80 helvetica pt4'>{group ? group.displayName : <Skeleton />}</h3>
            <div className='f6 white-70 helvetica pt2 pb4'>{group ? group.description : <Skeleton />}</div>
          </div>

          <nav className='flex flex-column pt4'>
            <Link to={`${process.env.PUBLIC_URL}/`}
              className='w-100 f5 black-70 helvetica no-underline dib pl4 pv2 dim bg-light-blue'
              activeClassName='bg-white-30'>
              <span className='ph2'>
                Conversations
              </span>
            </Link>
          </nav>
        </div>

        <div className='dtc v-top vh-100 pt4'>
          <GroupFeed id={this.props.match.params.id} />
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