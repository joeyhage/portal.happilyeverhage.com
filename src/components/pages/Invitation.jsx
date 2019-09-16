import React from 'react';
import dateFormat from 'dateformat';

import { getApiFor } from '../../util/apiFetch';

export default class Invitation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchDone: false,
      invite: { invitation_id: props.location.state.invitation_id }
    };
  }

  render() {
    const { fetchDone, invite } = this.state;
    return (
      <div className='container is-fluid'>
        {fetchDone &&
         <div className='tile is-ancestor'>
           <div className='tile is-parent'>
             <div className='tile is-child notification'>
               <h2 className='title is-2'>{invite.name}</h2>
               {Boolean(invite.email_address) &&
                <h4 className='subtitle is-4'>
                  <a href={'mailto:' + invite.email_address} target='_blank'
                     rel='noopener noreferrer'>{invite.email_address}</a>
                  {Boolean(invite.email_address_2) &&
                   <span style={{whiteSpace:'nowrap'}}> &amp;&nbsp;
                     <a href={'mailto:' + invite.email_address_2} target='_blank'
                        rel='noopener noreferrer'>{invite.email_address_2}</a>
                   </span>
                  }
                </h4>
               }
               <hr />
               <div className='level'>
                 <div className='level-item has-text-centered'>
                   <div>
                     <p className='heading'># Invited</p>
                     <p className='title'>{invite.invite_count || 0}</p>
                   </div>
                 </div>
                 <div className='level-item has-text-centered'>
                   <div>
                     <p className='heading'># RSVP'd</p>
                     <p className='title'>{invite.rsvp_count || 0}</p>
                   </div>
                 </div>
                 <div className='level-item has-text-centered'>
                   <div>
                     <p className='heading'>RSVP Date</p>
                     <p className='title'>
                       {Boolean(invite.rsvp_date)
                        ? dateFormat(invite.rsvp_date, 'mediumDate', true)
                        : 'N/A'
                       }
                     </p>
                   </div>
                 </div>
               </div>
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
    const { invite } = this.state;
    if (this.props.auth.isAuthenticated() && !Boolean(invite.hasOwnProperty('invite_count'))) {
      getApiFor('/invitations/' + invite.invitation_id, this.props.auth)
        .then(json => this.setState({ invite: json }))
        .finally(() => this.setState({ fetchDone: true }));
    }
  }
}