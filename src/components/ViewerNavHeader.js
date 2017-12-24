import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton';

class ViewerNavHeader extends Component {

  render() {
    const viewer = this.props.viewer;
    return (
      <div className='dt w-100 pa2 pv3'>
        <div className='dt-row'>
          <div className='dtc w2_5 v-mid'>
            {viewer ? <img
              src={viewer.avatar}
              className='w2_5 h2_5 br-100 db' alt='Avatar' /> : <div className='w2_5 h2_5 br-100 db bg-light-gray' />}
          </div>
          <div className='dtc v-mid pl2'>
            <div className='f5 white-70 b helvetica truncate'>
              {viewer ? viewer.displayName : <Skeleton />}
            </div>
            <div className='f6 white-70 helvetica pt1'>
              {viewer ? `${viewer.network.displayName} Network` : <Skeleton />}
            </div>
          </div>
          <div className='dtc v-mid w2 tr'>
            <span role='img' aria-label='notifications' className={viewer ? 'o-80' : 'o-20'}>🔔</span>
          </div>
        </div>
      </div>
      // <div className='flex items-center w-100 pa2 pv3'>
      //   <div className='w3'>
      //     {viewer ? <img
      //       src={viewer.avatar}
      //       className='w3 br-100 dib pt1' alt='Avatar' /> : <div className='w3 h3 br-100 dib pt1 bg-light-gray' />}
      //   </div>
      //   <div className='flex-column items-center w-100 pl2'>
      //     <div className='f5 white-70 b helvetica pt1'>
      //       {viewer ? viewer.displayName : <Skeleton />}
      //     </div>
      //     <div className='f6 white-70 helvetica pt1'>
      //       {viewer ? `${viewer.network.displayName} Network` : <Skeleton />}
      //     </div>
      //   </div>
      //   <div className='w2'>
      //     <span role='img' aria-label='notifications'>🔔</span>
      //   </div>
      // </div>
    )
  }
}

export default ViewerNavHeader