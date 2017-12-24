import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import GroupNavLinkList from './GroupNavLinkList';
import ViewerNavHeader from './ViewerNavHeader';

class GlobalNav extends Component {

  render() {

    // 1
    const query = this.props.globalNavQuery;

    // 2
    if (query && query.error) {
      return <div>Error. Check query or authentication token.</div>
    }

    // 3
    const viewer = query.viewer;
    const linksToRender = viewer ? viewer.groups.edges : null;

    return (
      <div className='flex flex-column justify-between h-100'>
        <ViewerNavHeader viewer={viewer} />

        <nav className='flex flex-column h-100'>
          <NavLink to={`${process.env.PUBLIC_URL}/`}
            className='w-100 f5 white-70 b helvetica no-underline dib pv2 dim bb b--dark-gray'
            activeClassName='bg-white-30'>
            <span className='ph2'>
              <span role='img' aria-label='discovery'>🏠</span>&nbsp;&nbsp;Discovery
            </span>
          </NavLink>

          <NavLink to={`${process.env.PUBLIC_URL}/inbox`}
            className='w-100 f5 white-70 b helvetica no-underline dib pv2 dim bb b--dark-gray'
            activeClassName='bg-white-30'>
            <span className='ph2'>
              <span role='img' aria-label='inbox'>✉</span>&nbsp;&nbsp;Inbox
            </span>
          </NavLink>

          <div className='w-100 f5 white-70 helvetica no-underline dib pv2 bb b--dark-gray'>
            <div className='ph2 pb2 b'>
              <span role='img' aria-label='communities'>🌐</span>&nbsp;&nbsp;Communities
            </div>

            <GroupNavLinkList links={linksToRender} />
          </div>
        </nav>

        <div className='w-100 f5 white-70 b helvetica no-underline dib pt2 pb4'>
          <span className='ph2'>
            Private Messages
          </span>
        </div>
      </div >
    )
  }

}

// 1
const GLOBAL_NAV_QUERY = gql`
  # 2
  query OutloopGlobalNavQuery {
    viewer {
      displayName
      avatar(width: 80, height: 80)
      network {
        displayName
      }
      groups(first: 10) {
        edges {
          node {
            displayName
            id:databaseId
          }
        }
      }
    }
  }
`

// 3
export default graphql(GLOBAL_NAV_QUERY, { name: 'globalNavQuery' })(GlobalNav)