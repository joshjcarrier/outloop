import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class GroupNavLink extends Component {

  render() {
    return (
      <NavLink to={`${process.env.PUBLIC_URL}/group/${this.props.group.databaseId}`}
        className='w5 f6 white-70 helvetica no-underline dib pv2 dim truncate'
        activeClassName='bg-white-30'
        title={this.props.group.displayName}>
        <span className='ph2'>
          {this.props.group.displayName}
        </span>
      </NavLink>
    )
  }
}

export default GroupNavLink