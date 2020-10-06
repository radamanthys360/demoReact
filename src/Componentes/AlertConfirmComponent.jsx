import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert'

function AlertConfirmComponent() {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="primary" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Informacion!</Alert.Heading>
            Guardado Correctamente.
        </Alert>
      );
    }
    return (null);
  }

  export default AlertConfirmComponent