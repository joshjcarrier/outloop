import React, { Component } from 'react'

class ViewerNavHeader extends Component {

  render() {
    return (
      <div className='flex items-center w-100 pa2 pv3'>
        <div className='w3'>
          <img
            src={this.props.viewer.avatar}
            className='w3 br-100 dib pt1' alt='Avatar' />
        </div>
        <div className='flex-column items-center w-100 pl2'>
          <div className='f5 white-70 b helvetica pt1'>
            {this.props.viewer.displayName}
          </div>
          <div className='f6 white-70 helvetica pt1'>
            {this.props.viewer.network.displayName} Network
            </div>
        </div>
        <div className='w2'>
          <span role='img' aria-label='notifications'>🔔</span>
        </div>
      </div>
    )
  }
}

export default ViewerNavHeader