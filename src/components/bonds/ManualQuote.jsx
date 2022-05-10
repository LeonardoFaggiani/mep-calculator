import Table from '../shared/table/Table';
import Card from '../shared/card/Card';
import { useEffect, useState, useContext } from 'react'
import { getColumnsByCurrency, getQuoteDataSourceByTicker, initialDataSourceBonds, initialColumns } from './QuoteBase.js'
import { SelectDataContext } from '../../context/DataContext';

function ManualQuote({moneyAmount}) {

    const { state } = useContext(SelectDataContext);

    const [ventaAmount, setVentaAmount] = useState("Ingrese precio venta");
    const [compraAmount, setCompraAmount] = useState("Ingrese precio compra");

    const [dataSourceResponse, setDataSourceUsdArs] = useState(initialDataSourceBonds);

    const [columnsResponse, setColumnUsdArs] = useState(initialColumns);

    const [sellerTicker, setSellerTicker] = useState("");


    let clearPlaceholder = (event) => {
    
        if (event.target.id === "ventaAmount" && !/^[0-9,.]*$/.test(ventaAmount)) {
            setVentaAmount("0");
        } 
        else
        {

            if (!/^[0-9,.]*$/.test(compraAmount)) {
                setCompraAmount("0");
            }
        }
    }

    let formatAmount = (event) => {

        let number = event.target.value.replace(/[^0-9]/g, '');

        // set the default value
        if (number.length === 0) number = "0.00";
        else if (number.length === 1) number = "0.0" + number;
        else if (number.length === 2) number = "0." + number;
        else number = number.substring(0, number.length - 2) + '.' + number.substring(number.length - 2, number.length);

        number = parseFloat(number);
        number = number.toFixed(2);

        let x = number.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';

        let finalNumber = x1 + x2;

        if (event.target.id === "ventaAmount") {
            setVentaAmount(finalNumber);
        } 
        else {
            setCompraAmount(finalNumber);
        }
    }

    let createManualQuotePayload = () => {

        let customPayload = {
            tickerSelect: {
                ticker: state.tickerSelect.ticker, bonds: [
                    {
                        "operations": 0,
                        "precioCompra": 0,
                        "precioVenta": parseFloat(ventaAmount),
                        "ticker": state.tickerSelect.ticker
                    },
                    {
                        "operations": 0,
                        "precioCompra": parseFloat(compraAmount),
                        "precioVenta": 0,
                        "ticker": sellerTicker
                    }
                ],
            },
            brokerSelect: {
                brokerId: state.brokerSelect.brokerId
            }
        }

        return customPayload;

    }

    let hasPrice = () => {
        return /^[0-9,.]*$/.test(ventaAmount) && /^[0-9,.]*$/.test(compraAmount);
    }

    let setTickerDollar = (ticker) => {

        if (!ticker)
            return

        let isDollarBond = ticker.substring(ticker - 1) === "D";

        if (isDollarBond)
            setSellerTicker(ticker.substring(0, ticker.length - 1));
        else
            setSellerTicker(`${ticker}D`)
    }

    useEffect(() => {

        const payloadByQuote = hasPrice() && state.tickerSelect.ticker ? createManualQuotePayload() : state

        setTickerDollar(state.tickerSelect.ticker);
        setDataSourceUsdArs(getQuoteDataSourceByTicker(payloadByQuote, moneyAmount, hasPrice()));
        setColumnUsdArs(getColumnsByCurrency(payloadByQuote));

    }, [moneyAmount, ventaAmount, compraAmount, state]);

    return (
        <div className='row mt-4'>
            <div className='col-4'>         
                <Card classNameStyle="text-center">
                    <Card.Header content="Cotización manual" />
                    <Card.Body>
                        <div className="input-group mb-1">
                            <span className="input-group-text customPaddingTicker">{state.tickerSelect.ticker != "" ? state.tickerSelect.ticker : "Ticker" } </span>
                            <input type="text" className="form-control" id="ventaAmount" maxLength={10} pattern="[+-]?\d+(?:[.,]\d+)?" onFocus={clearPlaceholder} onInput={formatAmount} value={ventaAmount} />
                        </div>
                        <div className="input-group mb-1">
                            <span className="input-group-text">{ sellerTicker.length !== 0 ? sellerTicker : "Ticker"}</span>
                            <input type="text" className="form-control" id="compraAmount" maxLength={10} pattern="[+-]?\d+(?:[.,]\d+)?" onFocus={clearPlaceholder} onInput={formatAmount} value={compraAmount} />
                        </div>
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
                <div className="card text-dark bg-warning mb-3">
                    <div className="card-header text-center cardTitleWarning">Importante</div>
                    <div className="card-body paddingWarningCard">
                        <ul>
                            <li>
                                Fuera del horario de mercado (11hs a 17hs) la calculadora puede calcular valores de ganancia no cercano a la realidad ya que suelen quedar ofertas con montos fuera de lo que marca el mercado.
                            </li>
                            <li>
                                Los bonos que aparecen son con los que se puede hacer dolar MEP.
                            </li>
                            <li>
                                Se recomienda operar con bonos que tengan <b>liquidez</b>. Actualmente los bonos con mayor liquidez son <b>AL30</b>, <b>GD30</b> y su correspondientes en dolar.
                            </li>
                            <li>
                                Las cotizaciones suelen tener un retraso de hasta <b>20 minutos</b>.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    )

}

export default ManualQuote;