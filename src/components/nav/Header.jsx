import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import HageWeddingLogo from '../../images/Hage_Wedding_Logo_140.png';

import NavItem from './NavItem';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActiveNavbar: false
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  render() {
    const burgerClass = classNames('navbar-burger', 'burger', {
      'is-active': this.state.isActiveNavbar
    });
    const navigationClass = classNames('navbar-menu', {
      'is-active': this.state.isActiveNavbar
    });
    return (
      <nav className='navbar' id='navigation'>
        <div className='container'>
          <div className='navbar-brand'>
            <Link to='/' className='navbar-item'>
              <img
                src={HageWeddingLogo}
                alt='Happily Ever Hage'
                width='70'
                height='70'
              />
            </Link>
            <div className={burgerClass} data-target='navigation' onClick={this.toggleNavbar}>
              <span />
              <span />
              <span />
              <br />
              <p>Menu</p>
            </div>
          </div>

          <div className={navigationClass}>
            <div className='navbar-start' />
            <div className='navbar-end'>
              <NavItem to='/' location={this.props.location}>
                Home
              </NavItem>
              <NavItem to='/list' location={this.props.location}>
                Invitation List
              </NavItem>
              <NavItem to='/create-invite' location={this.props.location}>
                Create Invite
              </NavItem>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({ isActiveNavbar: false });
    }
  }

  toggleNavbar() {
    this.setState(prevState => ({ isActiveNavbar: !prevState.isActiveNavbar }));
  }
}

export default withRouter(Header);