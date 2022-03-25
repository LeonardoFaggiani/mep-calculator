import React from 'react'
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import "./Table.css"

class Table extends React.Component {

    render() {
        return (
            <table className={`table table-striped table-bordered ${this.props.classNameStyle}`}>
                {this.props.children}
            </table>
        )
    }
}

Table.Header = TableHeader;
Table.Row = TableRow;

export default Table;