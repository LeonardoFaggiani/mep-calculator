import Table from '../shared/table/Table';
import Card from '../shared/card/Card';
import { getColumnsByCurrency, getQuoteDataSourceByTicker, initialDataSourceBonds, initialColumns } from './QuoteBase.js'
import { useContext, useEffect, useState } from 'react'
import { SelectDataContext } from '../../context/DataContext';
import TaxBroker from '../bonds/TaxBroker'

function AutomaticQuote({ moneyAmount }) {

    const { state } = useContext(SelectDataContext);

    const [dataSourceResponse, setDataSourceUsdArs] = useState(initialDataSourceBonds);

    const [columnsResponse, setColumnUsdArs] = useState(initialColumns);

    useEffect(() => {

        setDataSourceUsdArs(getQuoteDataSourceByTicker(state, moneyAmount, true));
        setColumnUsdArs(getColumnsByCurrency(state.tickerSelect));

    }, [moneyAmount, state]);

    return (
        <div className='row'>

            <div className='col-4'>
                <Card classNameStyle="text-center">
                    <Card.Header content="Cotización Broker " />
                    <Card.Body>
                        <Table>
                            <Table.Header columns={[{ "name": "Ticker" }, { "name": "P. Compra" }, { "name": "P. Venta" }]}></Table.Header>
                            <Table.Row isEditInline={false} dataSource={dataSourceResponse.bondDataSourceAutomaticByBroker} dataSourceProperties={[{ "value": "ticker" }, { "value": "pcompra" }, { "value": "pventa" }]}></Table.Row>
                        </Table>
                    </Card.Body>
                </Card>
            </div>

            <div className='col-4'>
                <Card classNameStyle="text-center">
                    <Card.Header content="Netos a conseguir segun mercado" />
                    <Card.Body>
                        <Table classNameStyle={"mb-0"}>
                            <Table.Header columns={columnsResponse.columnsArs} />
                            <Table.Row dataSource={dataSourceResponse.bondDataSourceArs} dataSourceProperties={[{ "value": "pcompra" }, { "value": "finalAmount" }, { "value": "unit" }]}></Table.Row>
                        </Table>

                        <div className="row">
                            <div className="col-12">
                                <Table>
                                    <Table.Header columns={columnsResponse.columnsUsd} />
                                    <Table.Row dataSource={dataSourceResponse.bondDataSourceUsd} dataSourceProperties={[{ "value": "pventa" }, { "value": "usdBruto" }, { "value": "usdNeto" }]}></Table.Row>
                                </Table>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>


            <div className="col-4">
                <TaxBroker />
            </div>

        </div>

    )
}

export default AutomaticQuote;