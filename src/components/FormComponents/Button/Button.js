import './Button.scss'
import React from 'react'

const Button = props => {

    const _buttonClicked = () => {
        console.log('_buttonClicked fired');
        props.onClick();
    }

    return( 
        <div className="Button">
            <button onClick={ _buttonClicked }>{ props.title }</button>
        </div>
    );
}
export default Button;