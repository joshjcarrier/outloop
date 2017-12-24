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
        <div className='w5 dtc v-top br b--light-gray'>
          <div className='pl3 pt5 pr3 bg-blue contain bg-top' style={group ? { backgroundImage: `url(${group.headerImage})`, backgroundColor: group.color, backgroundBlendMode: 'soft-light' } : {}}>
            <h4 className='f4 white-90 helvetica'>{group ? group.displayName : <Skeleton count='2' />}</h4>
            <div className='f6 white-80 helvetica pb4'>{group ? group.description : <Skeleton count='4' />}</div>
          </div>

          <nav className='flex flex-column pt4'>
            <Link to={`${process.env.PUBLIC_URL}/`}
              className='w-100 f5 black-80 helvetica no-underline dib pl3 pv2 bg-light-blue'
              style={group ? { backgroundColor: group.color + "88" } : {}}
              activeClassName='bg-white-30'>
              <span className='ph2 helvetica'>
                Conversations
              </span>
            </Link>
          </nav>

          <nav className='flex flex-column pt3 bt b--light-gray mt4'>
            <div className='w-100 f5 black-80 helvetica dib pl3 pv2'>
              <span className='ph2 helvetica'>
                Experts
              </span>
            </div>
            {group ? group.members.edges.map(memberEdge => (
              <div className='w-100 f6 black-80 helvetica dib pl3 pv2'>
                <span className='ph2 helvetica truncate'>
                  {memberEdge.node.displayName}
                </span>
              </div>
            )) : null}
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
      color
      description
      displayName
      headerImage
      id:databaseId
      members(first:5) {
        edges {
          node {
            displayName
          }
        }
      }
    }
  }
`

// 3
export default graphql(GROUP_QUERY, { name: 'groupQuery', options: (props) => ({ variables: { id: props.match.params.id } }) })(Group)