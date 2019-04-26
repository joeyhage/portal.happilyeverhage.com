import React, { Component } from 'react';

import { getApiFor } from '../../util/apiFetch';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchDone: false,
      stats: {}
    };
  }

  render() {
    const { fetchDone, stats } = this.state;
    return (
      <div className='container is-fluid' style={{ marginTop: '5em' }}>
        {fetchDone &&
         <div className='level'>
           <div className='level-item has-text-centered'>
             <div>
               <p className='heading'>People Invited</p>
               <p className='title'>{stats.inviteCount || 0}</p>
             </div>
           </div>
           <div className='level-item has-text-centered'>
             <div>
               <p className='heading'>People RSVP'd</p>
               <p className='title'>{stats.rsvpCount || 0}</p>
             </div>
           </div>
           <div className='level-item has-text-centered'>
             <div>
               <p className='heading'>Will Not Attend</p>
               <p className='title'>{stats.willNotAttend || 0}</p>
             </div>
           </div>
         </div>
        }
      </div>
    );
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const { stats } = this.state;
    if (this.props.auth.isAuthenticated() && !stats.hasOwnProperty('inviteCount')) {
      getApiFor('/stats', this.props.auth)
        .then(json => this.setState({ stats: json }))
        .finally(() => this.setState({ fetchDone: true }));
    }
  }
}

export default Home;
