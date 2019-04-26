import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export default class InputGroup extends React.Component {

  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    const { icon, id, label } = this.props;
    const controlClass = classNames('control', {
      'has-icons-left': Boolean(icon)
    });
    return (
      <div className='field'>
        <label className='label is-uppercase' htmlFor={id}>{label}</label>
        <div className={controlClass}>
          {this._buildControl()}
          {Boolean(icon) &&
           <span className='icon is-small is-left'>
              <FontAwesomeIcon icon={icon} alt={label} />
            </span>
          }
        </div>
      </div>
    );
  }

  _handleChange({ target }) {
    this.props.handleChange(target);
  }

  _buildControl() {
    const props = {
      id: this.props.id,
      className: this.props.className,
      value: this.props.value,
      placeholder: this.props.label,
      onChange: this._handleChange,
      onBlur: this._handleChange,
      required: this.props.required
    };

    return (<input type={this.props.type} {...props} autoComplete='off' />);
  }
}