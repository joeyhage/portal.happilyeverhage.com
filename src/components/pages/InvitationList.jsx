import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import React from 'react';
import { Link } from 'react-router-dom';

import { getApiFor } from '../../util/apiFetch';
import InputGroup from '../common/InputGroup';

export default class InvitationList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchDone: false,
      invitations: [],
      searchQuery: '',
      filter: 'all'
    };
    this._handleChange = this._handleChange.bind(this);
    this._matchesFilter = this._matchesFilter.bind(this);
    this._updateFilter = this._updateFilter.bind(this);
  }

  render() {
    const { fetchDone, searchQuery } = this.state;
    return (
      <div className='container is-fluid' id='invitation-list-page'>
        {fetchDone &&
         <div className='columns is-centered'>
           <div className='column is-8'>
             <InputGroup id='search' className='input' type='text' label='Search' icon={faSearch}
                         value={searchQuery} handleChange={this._handleChange}
                         noValidation />
             <span>Filter</span>
             <br />
             <div className='buttons has-addons'>
               <span className={this._filterButtonClass('all')} id='all'
                     onClick={this._updateFilter}>All</span>
               <span className={this._filterButtonClass('accept')} id='accept'
                     onClick={this._updateFilter}>Accept</span>
               <span className={this._filterButtonClass('partial-accept')} id='partial-accept'
                     onClick={this._updateFilter}>Partial Accept</span>
               <span className={this._filterButtonClass('regret')} id='regret'
                     onClick={this._updateFilter}>Regret</span>
             </div>
             <table className='table is-hoverable is-fullwidth'>
               <thead>
               <tr>
                 <th>Name</th>
                 <th style={{ width: '20%' }} />
               </tr>
               </thead>
               <tbody>
               {this._mapPersonsToTable()}
               </tbody>
             </table>
           </div>
         </div>
        }
      </div>
    );
  }

  _filterButtonClass(id) {
    return this.state.filter === id ? 'button is-selected' : 'button';
  }

  _updateFilter({ target }) {
    this.setState({ filter: target.id });
  }

  _mapPersonsToTable() {
    const { invitations } = this.state;
    if (Boolean(invitations && invitations.length)) {
      return invitations.filter(this._matchesFilter).map((invitation, index) => (
        <tr key={index}>
          <td>{invitation.name}</td>
          <td><Link to={{
            pathname: '/invitation',
            state: { invitation_id: invitation.invitation_id }
          }}>View Invite</Link></td>
        </tr>
      ));
    }
    return [];
  }

  _matchesFilter(invitation) {
    const { invite_count, rsvp_count, rsvp_date } = invitation;
    const { searchQuery } = this.state;
    let filter;
    switch (this.state.filter) {
      case 'regret':
        filter = Boolean(rsvp_date) && rsvp_count === 0;
        break;
      case 'partial-accept':
        filter = Boolean(rsvp_date) && rsvp_count > 0 && invite_count !== rsvp_count;
        break;
      case 'accept':
        filter = Boolean(rsvp_date) && invite_count === rsvp_count;
        break;
      default:
        filter = true;
    }
    return filter && (!searchQuery || invitation.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  _handleChange({ value }) {
    this.setState({ searchQuery: value });
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    if (this.props.auth.isAuthenticated() && !Boolean(this.state.invitations && this.state.invitations.length)) {
      getApiFor('/allInvitations', this.props.auth)
        .then(json => this.setState({ invitations: json }))
        .finally(() => this.setState({ fetchDone: true }));
    }
  }
}