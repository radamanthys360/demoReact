import React from 'react';

const taringuero = ( props ) => {
    return (
        <div>
            <p>Yo soy {props.nombre} y Tengo {props.edad} años de edad!</p>
            <p>{props.children}</p>
        </div>
    )
};

export default taringuero;