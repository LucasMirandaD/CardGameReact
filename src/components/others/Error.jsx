import React from 'react'

function Error(props) {
  return (
    <div className="alert alert-danger mt-4" id="error-message">
        {props.description}
    </div>
  )
}

export default Error