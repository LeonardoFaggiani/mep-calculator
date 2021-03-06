import React from 'react'

export class CardBody extends React.Component {

    render() {

        return (
            <div className="card-body">{this.props.children}</div>
        )
    }
}

CardBody.displayName = "Card.Body";

export default CardBody