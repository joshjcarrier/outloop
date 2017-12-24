import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import truncate from 'truncate';
import hdate from 'human-date';
import UserCompactCard from './UserCompactCard';

class ThreadCompactCard extends Component {

  render() {
    const thread = this.props.thread;
    const includeGroupContext = this.props.includeGroupContext || false;
    const humanReadableUpdatedAt = thread ? (<span title={hdate.prettyPrint(thread.updatedAt, { showTime: true })}>{hdate.relativeTime(thread.updatedAt)}</span>) : null;

    return (
      <article className="fl w-100 w-50-m w-third-ns h5">

        <div className='h-100 pr3 pb3 db'>

          <div className='h-100 flex flex-column pa3 ba b--light-gray br2'>
            <UserCompactCard className='pv2'
              user={thread ? thread.threadStarter.sender : null}
              tagline={thread ? (includeGroupContext ? <span>in <Link to={`${process.env.PUBLIC_URL}/group/${thread.group.id}`}
                className='black-80 helvetica no-underline dim'>
                {thread.group.displayName}
              </Link>&nbsp;-&nbsp;{humanReadableUpdatedAt}</span> : (<span>{humanReadableUpdatedAt}</span>)) : <Skeleton />} />
            <div className='f6 pt3 lh-copy helvetica overflow-hidden'>
              <div className='dt dt--fixed'>
                <div className='dtc h5'>
                  {thread ? truncate(thread.threadStarter.content.body.parsedBody, 240) : <Skeleton count='3' />}
                </div>
              </div>
            </div>
            <div className='f6 pt3 lh-copy helvetica'>
              {thread ? (thread.replies.totalCount > 0 ? <span><span role='img' aria-label='replies' title={`Replies: ${thread.replies.totalCount}`}>💬</span>&nbsp;{thread.replies.totalCount}</span> : null) : <Skeleton />}
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default ThreadCompactCard