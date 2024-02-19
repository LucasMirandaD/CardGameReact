import React from 'react'

function InputForm(props) {
  return (
    <div className="form-group">
        <label htmlFor={props.id}>{props.description}</label>
        <input 
          type={props.type} 
          className="form-control" 
          id={props.id} 
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          value={props.value}
          onChange={props.onChange}
        />
    </div>
  )
}

InputForm.defaultProps = {
  readOnly: false
};

export default InputForm