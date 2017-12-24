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
    }

    return (
      <div className={`${this.props.className} dt w-100`}>
        <div className='dt-row'>
          <div className='dtc w2_5 v-mid'>
            {user && user.avatar ? <img
              src={user.avatar}
              className='w2_5 h2_5 br-100 db' alt='Avatar' /> : <div className={`w2_5 h2_5 br-100 db ${avatarBackgroundColorClasses}`} />}
          </div>
          <div className='dtc v-mid pl2'>
            <div className={`f6 ${fontColorClasses} b helvetica`}>
              {user ? user.displayName : <Skeleton />}
            </div>
            <div className={`f6 ${fontColorClasses} helvetica pt1`}>
              {this.props.tagline}
            </div>
          </div>
          {
            this.props.actionPane ?
              <div className='dtc v-mid tr w1 pl2'>
                {this.props.actionPane}
              </div> : null
          }
        </div>
      </div>
    )
  }
}

export default UserCompactCard