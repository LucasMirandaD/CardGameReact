import React from 'react'

function Success(props) {
  return (
    <div className="alert alert-success mt-4" id="success-message">
        {props.description}
    </div>
    )
}

export default Success