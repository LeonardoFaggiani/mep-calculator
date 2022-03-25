import Table from '../shared/table/Table';
import Card from '../shared/card/Card';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'


let selectedVal = null
let columnsArs = []
let columnsUsd = []

function AutomaticQuote() {

    selectedVal = useSelector((state) => state.tickerSelect.value)

    

    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        let result = getDataFromBroker();
        setQuotes(result);
    }, [])


    if (selectedVal) {
        setColumnsByCurrency()        
    }

    return (
        <div className='row'>
            <div className='col-3'>
                <Card classNameStyle="text-center">
                    <Card.Header content="Cotizaciones Broker " />
                    <Card.Body>
                        <Table classNameStyle={"table-w-16"}>
                            <Table.Header columns={[{ "name": "Ticker" }, { "name": "P. Compra" }, { "name": "P. Venta" }]}></Table.Header>
                            <Table.Row dataSource={[{ "ticker": "AL30", "pcompra": "5600", "pventa": "5890" }, { "ticker": "AL30D", "pcompra": "5600", "pventa": "5890" }]} dataSourceProperties={[{ "value": "ticker" }, { "value": "pcompra" }, { "value": "pventa" }]}></Table.Row>
                        </Table>
                    </Card.Body>
                </Card>
            </div>

            <div className='col-4'>
                <Card classNameStyle="text-center">
                    <Card.Header content="Netos a conseguir segun mercado" />
                    <Card.Body>
                        <Table classNameStyle={"mb-0"}>
                            <Table.Header columns={columnsArs} />
                            <Table.Row dataSource={[{ "ticker": "AL30", "pcompra": "5600", "pventa": "5890" }]} dataSourceProperties={[{ "value": "ticker" }, { "value": "pcompra" }, { "value": "pventa" }]}></Table.Row>
                        </Table>

                        <div className="row">
                            <div className="col-12">
                                <Table>
                                    <Table.Header columns={columnsUsd} />
                                    <Table.Row dataSource={[{ "ticker": "AL30D", "pcompra": "5600", "pventa": "5890" }]} dataSourceProperties={[{ "value": "ticker" }, { "value": "pcompra" }, { "value": "pventa" }]}></Table.Row>
                                </Table>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )

}

function setColumnsByCurrency() {
    columnsArs = selectedVal.table.find(x => x.headerId === 'ars').columns;
    columnsUsd = selectedVal.table.find(x => x.headerId === 'usd').columns;
}

const getDataFromBroker = async () => {

    const result = await axios({
        method: 'GET',
        timeout: 0,
        url: 'https://bullmarketbrokers.com/Information/StockPrice/GetStockPrices?term=3&index=bonos',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=utf-8",
            "Cookie": "ASP.NET_SessionId=xkyo3obyiwz5joxfwfv2uryq"
        }
    })

    console.log(result)

    return result
};


export default AutomaticQuote;