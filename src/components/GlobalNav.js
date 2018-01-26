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
      <div className='w5-l w3-m w3-ns w3 flex flex-column justify-between h-100 fixed'>
        <ViewerNavHeader viewer={viewer} />

        <nav className='flex flex-column h-100'>
          <NavLink to={`${process.env.PUBLIC_URL}/`}
            exact={true}
            className='w-100 f5 white-70 b helvetica no-underline dib pv2 dim bb b--dark-gray tc tl-l'
            activeClassName='bg-white-30 white-90'
            title='Discovery'>
            <span className='ph2 truncate'>
              <span role='img' aria-label='discovery'>🏠</span><span className='dn dib-l'>&nbsp;&nbsp;Discovery</span>
            </span>
          </NavLink>

          <NavLink to={`${process.env.PUBLIC_URL}/inbox`}
            className='w-100 f5 white-70 b helvetica no-underline dib pv2 dim bb b--dark-gray tc tl-l'
            activeClassName='bg-white-30 white-90'
            title='Inbox'>
            <span className='ph2 truncate'>
              <span role='img' aria-label='inbox'>✉️</span><span className='dn dib-l'>&nbsp;&nbsp;Inbox</span>
            </span>
          </NavLink>

          <div className='w-100 f5 white-70 helvetica no-underline dib pv2 vh-75 tc tl-l'>
            <div className='ph2 pb2 b truncate' title='Communities'>
              <span role='img' aria-label='communities'>🌐</span><span className='dn dib-l'>&nbsp;&nbsp;Communities</span>
            </div>

            <GroupNavLinkList links={linksToRender} />
          </div>
        </nav>

        {/* <div className='w-100 f5 white-70 b helvetica no-underline dib pt2 pb4 truncate'>
          <span className='ph2'>
            Private Messages
          </span>
        </div> */}
      </div >
    )
  }

}

// 1
const GLOBAL_NAV_QUERY = gql`
  # 2
  query OutloopGlobalNavQuery {
    viewer {
      user {
        displayName
        avatar(width: 80, height: 80)
        network {
          displayName
        }
      }
      groups(first: 10) {
        edges {
          node {
            avatar(width: 80, height: 80)
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