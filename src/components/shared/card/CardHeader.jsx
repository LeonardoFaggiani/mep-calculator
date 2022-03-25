import React from 'react'

class CardHeader extends React.Component {

    render() {
        return (
            <h5 className='card-header'>
                {this.props.content}
            </h5 >
        )
    }
}

CardHeader.displayName = "Card.Header";

export default CardHeader;