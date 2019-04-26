import React from 'react';

export default class Landing extends React.Component {

  render() {
    return (
      <div className='container is-fluid' style={{marginTop:'5em'}}>
        <h4 className='title is-4'>
          You are not logged in! Please{' '}
          <button className='button is-small' onClick={this.props.auth.login}>
            Log In
          </button>
          {' '}to continue.
        </h4>
      </div>
    );
  }
}