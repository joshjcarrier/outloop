import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class GroupNavLink extends Component {

  render() {
    return (
      <NavLink to={`${process.env.PUBLIC_URL}/group/${this.props.group.id}`}
        className='f6 white-70 helvetica no-underline dib pv2 dim'
        activeClassName='bg-white-30 white-90'
        title={this.props.group.displayName}>
        <span className='ph2 dn db-l truncate'>
          {this.props.group.displayName}
        </span>
        <div className='ph2 db dn-l'>
          <img
            src={this.props.group.avatar}
            className='w2_5 h2_5 br2 db ml1'
            alt='Avatar'
            title={`${this.props.group.displayName} group`} />
        </div>
      </NavLink>
    )
  }
}

export default GroupNavLink