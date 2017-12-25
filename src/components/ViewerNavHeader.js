import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton';
import UserCompactCard from './UserCompactCard';

class ViewerNavHeader extends Component {

  render() {
    const viewer = this.props.viewer;
    return (
      <UserCompactCard theme='dark'
        className='pa2 pb3'
        user={viewer}
        tagline={viewer ? `${viewer.network.displayName} Network` : <Skeleton />}
        actionPane={<div className='w1 center pt2 pt0-l pr0 pr2-l'><span role='img' aria-label='notifications' className={viewer ? 'o-90 bell' : 'o-20'}>🔔</span></div>} />
    )
  }
}

export default ViewerNavHeader