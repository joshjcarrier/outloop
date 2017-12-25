import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton';

class UserCompactCard extends Component {

  render() {
    const user = this.props.user;
    const theme = this.props.theme || 'light';

    var fontColorClasses = 'black-70';
    var avatarBackgroundColorClasses = 'bg-light-gray';
    switch (theme) {
      case 'dark':
        fontColorClasses = 'white-70';
        avatarBackgroundColorClasses = 'bg-light-gray';
        break;
      default:
        break;
    }

    return (
      <div className={`${this.props.className} dt w-100`}>
        <div className='dt-row dtc-l w2_5 v-mid'>
          {user && user.avatar ? <img
            src={user.avatar}
            className='w2_5 h2_5 br-100 db center'
            alt='Avatar'
            title={`${user.displayName}${typeof this.props.tagline === 'string' ? ' - ' + this.props.tagline : ''}`} /> : <div className={`w2_5 h2_5 br-100 db center ${avatarBackgroundColorClasses}`} />}
        </div>
        <div className='dn dtc-l v-mid ph2'>
          <div className={`f6 ${fontColorClasses} b helvetica`}>
            {user ? user.displayName : <Skeleton />}
          </div>
          <div className={`f6 ${fontColorClasses} helvetica pt1`}>
            {this.props.tagline}
          </div>
        </div>
        {
          this.props.actionPane ?
            <div className='dt-row dtc-l v-mid tr w1'>
              {this.props.actionPane}
            </div> : null
        }
      </div>
    )
  }
}

export default UserCompactCard