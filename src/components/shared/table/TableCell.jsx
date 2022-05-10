import React from 'react'

function TableCell({ dataSourceProperties, data }) {

    return (
        <tr>
            {
                dataSourceProperties.map((dataSourceValue, index) => {
                    return <td key={index}> {data[`${dataSourceValue.value}`]}</td>
                })
            }
        </tr>
    )
}

TableCell.displayName = "Table.Cell";

export default TableCell
