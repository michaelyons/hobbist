import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { tweetPostRequest } from '../Utils/apiCalls';
import './PostTweet.css';

class PostTweet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetText: '',
      error: '',
      tweetRecent: false
    };
  }

  componentDidMount() {
    this.populateTweet();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.postTweet();
    this.setState({
      tweetText: 'Successful Tweet!'
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  populateTweet = () => {
    const tweetText = `@${
      this.props.congressTwitterName
    }\n https://projects.propublica.org/represent/lobbying/r/${
      this.props.filingId
    }`;
    this.setState({
      tweetText
    });
  };

  postTweet = () => {
    const infoPayload = {
      userId: this.props.currentTwitterUser,
      status: this.state.tweetText
    };
    tweetPostRequest(infoPayload);
  };

  render() {
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Tweet your Representative</p>
        </header>
        <div className="media">
          <div className="card-content">
            <div className="media-content">
              <form className="card-content" onSubmit={this.handleSubmit}>
                <textarea
                  className="subtitle"
                  name="tweetText"
                  rows="10"
                  cols="52"
                  onChange={this.handleChange}
                  value={this.state.tweetText}
                />
                <button
                  onClick={this.postTweet}
                  className="subtitle send-tweet"
                >
                  Send Tweet
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostTweet.propTypes = {
  currentTwitterUser: PropTypes.string,
  congressTwitterName: PropTypes.string,
  congressRealName: PropTypes.string,
  filingId: PropTypes.number
};

export default PostTweet;
