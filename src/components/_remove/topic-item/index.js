import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


import CSSModules from 'react-css-modules'
import styles from './style.scss'

import { getProfile } from '../../reducers/user'
import { showSign } from '../../actions/sign'

import connectReudx from '../../common/connect-redux'

// import FollowTopic from './components/follow'

// 样式1
const medium = ({ topic, me, isSignin, showSign }) => {
  return (<div styleName="item">

            <div styleName="left">
              <Link to={`/posts?topic_id=${topic._id}`}>
                <i className="load-demand" data-load-demand={`<img class=${styles.avatar} src=${topic.avatar} />`}></i>
                {topic.name}
              </Link>
              {topic.brief}
            </div>

          </div>)
}

export class TopicItem extends Component {

  static mapStateToProps = (state, props) => {
    return {
      me: getProfile(state),
      isSignin: getProfile(state)._id ? true : false
    }
  }

  static mapDispatchToProps = { showSign }

  constructor(props) {
    super(props)
    const { topic } = this.props
    this.state = {
      topic: topic
    }
    this.callback = this.callback.bind(this)
  }

  callback(status) {
    const { topic } = this.state

    topic.follow_count += status ? 1 : -1
    topic.follow = status

    this.setState({
      topic: topic
    })
  }

  render () {
    const { topic, me, isSignin, showSign } = this.props
    return medium({ topic, me, isSignin, showSign })
  }

}

TopicItem.propTypes = {
  me: PropTypes.object.isRequired,
  isSignin: PropTypes.bool.isRequired,
  showSign: PropTypes.func.isRequired
}

TopicItem = CSSModules(TopicItem, styles)

export default connectReudx(TopicItem)
