import React from 'react'
import TableCell from './TableCell';

export class TableRow extends React.Component {
    render() {        
        return (
            <tbody>
                {this.props.dataSource.map((data, index) => <TableCell key={index}  data={data} dataSourceProperties={this.props.dataSourceProperties} />)}
            </tbody>
        )
    }
}

TableRow.displayName = "Table.Row";

export default TableRow
