import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export default class NavItem extends React.Component {

  render() {
    const navItemClasses = classNames('navbar-item', 'is-uppercase', {
      'is-page-link': this.props.location,
      'is-active': this.props.location && this.props.location.pathname === this.props.to
    });
    return (
      <Link to={this.props.to} className={navItemClasses}>
        {this.props.children}
      </Link>
    );
  }
}