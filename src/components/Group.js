import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
// import truncate from 'truncate';
import GroupFeed from './GroupFeed';
import UserCompactCard from './UserCompactCard';
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
        <div className='w4 w5-l dtc v-top br b--light-gray'>
          <div className='w4 w5-l fixed overflow-hidden'>
            <div className='pl3 pt4 pt5-l pr3 pb3 bg-blue bg-animate contain bg-top' style={group ? { backgroundImage: `url(${group.headerImage})`, backgroundColor: group.color, backgroundBlendMode: 'soft-light' } : {}}>
              <h4 className='f4 white-90 helvetica ph2 overflow-hidden'>{group ? group.displayName : <Skeleton count='2' />}</h4>
              <div className='f6 white-80 helvetica ph2 overflow-hidden dn db-l'>{group ? group.description : <Skeleton count='4' />}</div>
            </div>

            <nav className='flex flex-column pt2'>
              <Link to={`${process.env.PUBLIC_URL}/`}
                className='w-100 f5 black-80 helvetica no-underline dib pl2 pv2 bg-light-blue bg-animate'
                style={group ? { backgroundColor: group.color + "88" } : {}}>
                <span className='ph2 helvetica'>
                  Conversations
                </span>
              </Link>
            </nav>

            <nav className='flex flex-wrap pt3 bt b--light-gray pl2 pr2 mt4'>
              <div className='w-100 f5 black-80 helvetica dib pa2'>
                <span className='ph2 helvetica'>
                  Experts
                </span>
              </div>
              {group ? group.members.edges.map(memberEdge => {
                var user = memberEdge.node;
                const statusLocator = memberEdge.node.displayName.match(/[(](.*)[)][ ]{0,1}/i);
                var statusMessage = null;
                if (statusLocator) {
                  user = {
                    avatar: user.avatar,
                    displayName: memberEdge.node.displayName.replace(statusLocator[0], '')
                  };
                  statusMessage = statusLocator[1];
                }

                return (
                  <div className='w-auto w-100-l dib pl1 pr1'>
                    <UserCompactCard className='pv2'
                      user={user}
                      tagline={statusMessage} />
                  </div>
                )
              }) : null}
            </nav>
          </div>
        </div>

        <div className='dtc v-top vh-100 pt4 pr4 tl'>
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
            avatar(width: 80, height: 80)
            displayName
          }
        }
      }
    }
  }
`

// 3
export default graphql(GROUP_QUERY, { name: 'groupQuery', options: (props) => ({ variables: { id: props.match.params.id } }) })(Group)