import { faEnvelope, faHashtag, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { postApiWith } from '../../util/apiFetch';
import InputGroup from '../common/InputGroup';

export default class CreateInvite extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      invitation_id: '',
      submitting: false,
      serverError: false,
      submitSuccess: false,
      name: '',
      emailAddress: '',
      emailAddress2: '',
      inviteCount: ''
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleReset = this._handleReset.bind(this);
  }

  render() {
    const submitBtnClasses = classNames('button', { 'is-loading': this.state.submitting });
    return (
      <div className='container is-fluid'>
        <div className='columns is-centered'>
          <div className='column is-6'>
            {this.state.submitSuccess &&
             <article className='message is-success'>
               <div className='message-header'>
                 <p className='is-uppercase'>Success</p>
               </div>
               <div className='message-body'>
                 <Link to={{
                   pathname: '/invitation',
                   state: { invitation_id: this.state.invitation_id }
                 }}>View Invitation</Link>
               </div>
             </article>
            }
            <form onSubmit={this._handleSubmit} onReset={this._handleReset} autoComplete='nope'>
              <InputGroup id='name' className='input' type='text' label='Name' icon={faUser}
                          value={this.state.name} handleChange={this._handleChange}
                          required />
              <InputGroup id='emailAddress' className='input' type='text' label='Email Address' icon={faEnvelope}
                          value={this.state.emailAddress} handleChange={this._handleChange}
                          required />
              <InputGroup id='emailAddress2' className='input' type='text' label='Alt Email Address' icon={faEnvelope}
                          value={this.state.emailAddress2} handleChange={this._handleChange}
                          />
              <InputGroup id='inviteCount' className='input' type='number' label='Invite Count' icon={faHashtag}
                          value={this.state.inviteCount} handleChange={this._handleChange}
                          required />
              <div className='field is-grouped'>
                <div className='control'>
                  <button className={submitBtnClasses} type='submit' disabled={this.state.submitting}>
                    Submit
                  </button>
                </div>
                <div className='control'>
                  <button className='button is-text' type='reset' disabled={this.state.submitting}>
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  _handleChange({ id, value }) {
    this.setState({
      [id]: value
    });
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true, submitSuccess: false, serverError: false });

    const { name, emailAddress, emailAddress2, inviteCount } = this.state;
    const body = JSON.stringify({
      person: { name },
      invitation: {
        emailAddress,
        emailAddress2: emailAddress2 || '',
        inviteCount
      }
    });

    postApiWith('/create', this.props.auth, body)
      .then(json => {
        this._clearForm();
        this.setState({ invitation_id: json.invitation_id, submitSuccess: true });
      })
      .catch(() => this.setState({ serverError: true }))
      .finally(() => this.setState({ submitting: false }));
  }

  _handleReset(event) {
    event.preventDefault();
    this.setState({
      invitation_id: '',
      submitting: false,
      serverError: false,
      submitSuccess: false,
      name: '',
      emailAddress: '',
      emailAddress2: '',
      inviteCount: ''
    });
  }

  _clearForm() {
    this.setState({
      name: '',
      emailAddress: '',
      emailAddress2: '',
      inviteCount: ''
    });
  }
}