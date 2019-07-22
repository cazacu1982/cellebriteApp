import React from 'react';
import PropTypes from 'prop-types';

/**
 * React component
 */
const ListPhones = ({ phones, deletePhone, updatePhone, handleChange, handleOnClick}) => {
  let date;
  return (
    <ul>
      {
        phones &&
        phones.length > 0 ?
          (
            phones.map(phone => {
              return (
                <span key={phone._id}>
                <li key={phone._id} onDoubleClick={() => deletePhone(phone._id)} title="double click to delete">{
                  <ul>
                    {
                      Object.entries(phone.action).map((item, index) => {
                        if (item[0] === 'created') date = new Date(item[1]);
                        if(typeof item[1] !== 'boolean') {
                          return typeof item[1] === 'object' ? Object.entries(item[1]).map((i, index) => {
                            return(
                              <ul key={index}>
                                <span> { item[0] } :</span>
                                <li key={index}>
                                  {i[1]}
                                </li>
                              </ul>
                              )
                            }) : item[0] !== 'created' ?
                            (
                              <ul key={index} title="click to edit">
                                <span> { item[0] } :</span>
                                <li key={index}
                                    contentEditable
                                    suppressContentEditableWarning
                                    onClick={ () => handleOnClick(phone._id) }
                                    onInput={ handleChange }
                                    name={item[0]}>
                                  { item[1] }
                                </li>
                              </ul>
                            ) :
                            (
                              <ul key={index}>
                                <span> { item[0] } :</span>
                              <li key={index} name={item[0]}>
                                { item[0] } : { date.toDateString() }
                              </li>
                              </ul>
                            )
                        }
                      })
                    }
                  </ul>
                }</li>
                <button type ='submit' id='update' onClick={() => updatePhone(phone._id)}>edit phone</button>
                </span>
              )
            })
          )
          :
          (
            <li>No phone(s) left</li>
          )
      }
    </ul>
  )
};

ListPhones.propTypes = {
  phones: PropTypes.array,
  deletePhone: PropTypes.func,
  updatePhone: PropTypes.func,
  handleChange: PropTypes.func,
  handleOnClick: PropTypes.func,
};

export default ListPhones
