import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton';
import UserCompactCard from './UserCompactCard';

class ViewerNavHeader extends Component {

  render() {
    const { user } = this.props.viewer || {};
    return (
      <UserCompactCard theme='dark'
        className='pa2 pb3'
        user={user}
        tagline={user ? `${user.network.displayName} Network` : <Skeleton />}
        actionPane={<div className='w1 center pt2 pt0-l pr0 pr2-l'><span role='img' aria-label='notifications' className={user ? 'w1 o-90 bell' : 'w1 o-20'}>🔔</span></div>} />
    )
  }
}

export default ViewerNavHeader