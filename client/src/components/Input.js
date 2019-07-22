import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/**
 * React component
 */
class Input extends Component {

  state = {
    action: {
      type: '',
      serial: '',
      color: ''
    }
  };

  addPhone = () => {
    const task = {action: this.state.action};
    if(task.action && (task.action.type && task.action.serial && task.action.color)){
      axios.post('/api/phone', task)
        .then(res => {
          if(res.data){
            this.props.getPhones();
            this.setState({ action: {
                type: '',
                serial: '',
                color: ''
              }})
          }
        })
        .catch(err => console.log(err))
    } else {
      console.log('input field required')
    }
  };

  handleChange = (el) => {
    let inputName = el.target.name;
    let inputValue = el.target.value;

    let statusCopy = Object.assign({}, this.state);
    statusCopy.action[inputName] = inputValue;

    this.setState(statusCopy);
  };


  render() {
    let { action } = this.state;

    return (
      <div>
        <form>
        {
          action ?
            (
              Object.keys(action).map((item, index) => {
                return (
                  <span key={index}>
                    <label htmlFor={index}>{item}</label>
                    <input id={index} type="text" name={item} onChange={this.handleChange} value={action[item]} required />
                  </span>
                  )
              })
            )
            :
            (
              <li>No phone(s) left</li>
            )
        }
          <button type="submit" onClick={this.addPhone}>add phone</button>
        </form>
      </div>
  )
  }
}

Input.propTypes = {
  action: PropTypes.object,
};

export default Input
