import React from 'react'

export class Title extends React.Component {

    render() {

        return (
            <h5 className="card-title">{this.props.content}</h5>
        )
    }
}

export default Title