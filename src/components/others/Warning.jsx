import React from 'react'

function Warning(props) {
  return (
    <div className="alert alert-warning mt-4" id="warning-message">
        {props.description}
    </div>
  )
}

export default Warning