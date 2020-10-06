import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert'

function AlertErrorComponent(props) {
   const [show] = useState(props.mostrar);
    if (show) {
      return (
        <Alert variant="danger">
          Ha ocurrido un error! : {props.error} .
        </Alert>
      );
    }
    return (null);
  }

  export default AlertErrorComponent