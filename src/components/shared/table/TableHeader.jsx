import React from 'react'

class TableHeader extends React.Component {
    render() {
        return (
            <thead className='table-dark'>
                <tr>
                    {this.props.columns.map((column, index) => <TableHeadItem key={index} columnName={column.name} />)}
                </tr>
            </thead>
        )
    }
}

const TableHeadItem = ({ columnName }) => <th >{columnName}</th>

TableHeader.displayName = "Table.Header";

export default TableHeader