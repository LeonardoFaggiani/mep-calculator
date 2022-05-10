import Table from '../shared/table/Table';
import Card from '../shared/card/Card';
import React, { useEffect, useState, useContext } from 'react'
import { getTaxByBroker } from '../brokers/broker.services'
import { SelectDataContext } from '../../context/DataContext'

function TaxBroker() {


    const { state } = useContext(SelectDataContext);    

    const [dataSourceTax, setDataSourceTax] = useState([{
        "id":"",
        "bondTax": "0",
        "marketTax": "0",
        "totalCost": "0"
    }]);


    useEffect(() => {
        updateTax(state.brokerSelect.brokerId);
    }, [state]);

    let updateTax = (brokerId) => {
        setDataSourceTax([getTaxByBroker(brokerId)]);
    }

    return (
        <>
            <Card classNameStyle="text-center">
                <Card.Header content="Comisión segun broker" />
                <Card.Body>
                    <Table classNameStyle={"mb-0"}>
                        <Table.Header columns={[{ "name": `Compra/Venta de Bonos` }, { "name": `Dcho de Mercado` }, { "name": `Total` }]} />
                        <Table.Row  dataSource={dataSourceTax} dataSourceProperties={[{ "value": "bondTax" }, { "value": "marketTax" }, { "value": "totalCost" }]}></Table.Row>
                    </Table>
                </Card.Body>
            </Card>
        </>
    )
}

export default TaxBroker;