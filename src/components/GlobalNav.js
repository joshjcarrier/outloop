import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import GroupNavLinkList from './GroupNavLinkList';
import ViewerNavHeader from './ViewerNavHeader';

class GlobalNav extends Component {

  render() {

    // 1
    if (this.props.globalNavQuery && this.props.globalNavQuery.loading) {
      return <div></div>
    }

    // 2
    if (this.props.globalNavQuery && this.props.globalNavQuery.error) {
      return <div>Error. Check query or authentication token.</div>
    }

    // 3
    const viewer = this.props.globalNavQuery.viewer;
    const linksToRender = viewer.groups.edges;

    return (
      <div className='vh-100 pa2'>
        <ViewerNavHeader viewer={viewer} />

        <ul class="list pl0 measure center">
          <li class="lh-copy pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 b"><span role='img' aria-label='discovery'>🏠</span> Discovery</li>
          <li class="lh-copy pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 b">✉ Inbox</li>
          <li class="lh-copy pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 b"><span role='img' aria-label='communities'>🌐</span> Communities</li>
        </ul>
        <GroupNavLinkList links={linksToRender} />

        <div className='dib v-btm'>
          <ul class="list pl0 measure center">
            <li class="lh-copy pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 b">Private Messages</li>
          </ul>
        </div>
      </div>
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
            databaseId
            displayName
            id
          }
        }
      }
    }
  }
`

// 3
export default graphql(GLOBAL_NAV_QUERY, { name: 'globalNavQuery' })(GlobalNav)