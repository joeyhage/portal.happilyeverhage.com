import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import React from 'react';
import { Link } from 'react-router-dom';

import { getApiFor } from '../../util/apiFetch';
import InputGroup from '../common/InputGroup';

export default class People extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchDone: false,
      people: [],
      searchQuery: ''
    };
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    return (
      <div className='container is-fluid'>
        {this.state.fetchDone &&
         <div className='columns is-centered'>
           <div className='column is-8'>
             <InputGroup id='search' className='input' type='text' label='Search' icon={faSearch}
                         value={this.state.searchQuery} handleChange={this._handleChange}
                         noValidation />
             <table className='table is-hoverable is-fullwidth'>
               <thead>
               <tr>
                 <th>Name</th>
                 <th style={{ width: '20%' }} />
               </tr>
               </thead>
               <tbody>
               {this.mapPersonsToTable()}
               </tbody>
             </table>
           </div>
         </div>
        }
      </div>
    );
  }

  mapPersonsToTable() {
    const { people, searchQuery } = this.state;
    return Boolean(people) ? people.map((person, index) => (
      (!searchQuery || person.name.toLowerCase().includes(searchQuery.toLowerCase()))
      ?
      <tr key={index}>
        <td>{person.name}</td>
        <td><Link to={{
          pathname: '/invitation',
          state: { invitation_id: person.invitation_id }
        }}>View Invite</Link></td>
      </tr>
      : <tr key={index} />
    )) : [];
  }

  _handleChange({ value }) {
    this.setState({ searchQuery: value });
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    if (this.props.auth.isAuthenticated() && !Boolean(this.state.people && this.state.people.length)) {
      getApiFor('/allPersons', this.props.auth)
        .then(json => this.setState({ people: json }))
        .finally(() => this.setState({ fetchDone: true }));
    }
  }
}