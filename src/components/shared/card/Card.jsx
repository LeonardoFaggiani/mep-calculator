import React from 'react'
import CardHeader from './CardHeader';
import CardBody from './CardBody';

class Card extends React.Component {

    render() {
        return (
            <div className={`card  ${this.props.classNameStyle}`}>
                {this.props.children}
            </div>
        )
    }
}


Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;