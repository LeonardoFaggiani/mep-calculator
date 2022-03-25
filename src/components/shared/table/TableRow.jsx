import React from 'react'

export class TableRow extends React.Component {
    render() {
        return (
            <tbody>
                {this.props.dataSource.map((data, index) => <RowItem key={index} data={data} dataSourceProperties={this.props.dataSourceProperties} />)}
            </tbody>
        )
    }
}

const RowItem = ({ data, dataSourceProperties }) => (
    <tr>
        {dataSourceProperties.map((dataSourceValue, index) => {
            return <td key={index}> {data[`${dataSourceValue.value}`]}</td>
        })}
    </tr>
)

TableRow.displayName = "Table.Row";

export default TableRow
