import React, {Component} from 'react';
import axios from 'axios';

import Input from './Input';
import ListPhones from './ListPhones';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

/**
 * React component
 */
class Phones extends Component {

  state = {
    phones: [],
    action: {
      type: '',
      serial: '',
      color: ''
    }
  };

  componentDidMount(){
    this.getPhones();
  }

  getPhones = () => {
    axios.get('/api/phones')
      .then(res => {
        if(res.data){
          this.setState({
            phones: res.data.data
          })
        }
      })
      .catch(err => console.log(err))
  };

  deletePhone = (id) => {
    axios.delete(`/api/phone/${id}`)
      .then(res => {
        if(res.data){
          this.getPhones()
        }
      })
      .catch(err => console.log(err))
  };

  updatePhone = (id) => {
    const task = {action: this.state.action};
    if(task.action && (task.action.type && task.action.serial && task.action.color)){
      axios.put(`/api/phones/${id}`, task)
        .then(res => {
          if(res.data){
            this.getPhones();
          }
        })
        .catch(err => console.log(err))
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Warning',
        text: task.action.id ?  'Input field required' : 'Nothing changed',
      });
    }
  };

  onClick = (id) => {
    let  { phones } = this.state;
    let phone = phones.find(item => {
      if(id === item._id) {
        return item.action;
      } else {
        return null;
      }
    });
    if(id !== this.state.action.id) {
      let statusCopy = Object.assign({}, this.state);
      statusCopy.action.type = phone.action.type;
      statusCopy.action.serial = phone.action.serial;
      statusCopy.action.color = phone.action.color;
      statusCopy.action.id = id;

      this.setState(statusCopy);
    }
  };

  handleChange = (el) => {
    let inputName = el.target.getAttribute('name');
    let inputValue = el.target.innerHTML.replace(/&nbsp;/gi, '').replace(/<div><br><\/div>/gi, '').replace(/<p><br><\/p>/gi, '');
    let statusCopy = Object.assign({}, this.state);
    if (this.state.action)
    statusCopy.action[inputName] = inputValue.trim();

    this.setState(statusCopy);
  };

  render() {
    let { phones } = this.state;

    return(
      <div>
        <h1>My Phone(s)</h1>
        <Input getPhones={this.getPhones}/>
        <ListPhones
          phones={ phones }
          deletePhone={ this.deletePhone }
          updatePhone={ this.updatePhone }
          handleChange={ this.handleChange }
          handleOnClick={ this.onClick }
        />
      </div>
    )
  }
}

Phones.propTypes = {
  phones: PropTypes.array,
  deletePhone: PropTypes.func,
  updatePhone: PropTypes.func,
  handleChange: PropTypes.func,
  handleOnClick: PropTypes.func,
};

export default Phones;
