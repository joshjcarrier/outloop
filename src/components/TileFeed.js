import React, { Component } from 'react'

class TileFeed extends Component {

  render() {
    return (
      <div>
        Tile Feed {this.props.match.params.id}
      </div>
    )
  }
}

export default TileFeed