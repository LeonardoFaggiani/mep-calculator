import { getTaxByBroker } from "../brokers/broker.services";

export const initialDataSourceBonds = {
    bondDataSourceArs: [{ "pcompra": 0, "finalAmount": 0, "unit": 0 }],
    bondDataSourceUsd: [{ "pventa": 0, "usdBruto": 0, "usdNeto": 0 }],
    bondDataSourceAutomaticByBroker: [{ "ticker": "N/D", "pcompra": 0, "pventa": 0 }, { "ticker": "N/D", "pcompra": 0, "pventa": 0 }]
};

export const initialColumns = {
    columnsArs: [{ "name": `Precio Compra` }, { "name": `ARS a Vender (Comision)` }, { "name": `Unidades` }],
    columnsUsd: [{ "name": `Precio Venta` }, { "name": `USD Brutos` }, { "name": `USD Netos a Recibir` }]
};

export function getColumnsByCurrency(tickerSelected) {

    const table = updateColumnWithTicker(tickerSelected.ticker);

    const ars = table.find(x => x.headerId === 'ars').columns;
    const usd = table.find(x => x.headerId === 'usd').columns;

    let response = {
        columnsArs: ars,
        columnsUsd: usd
    }  

    return response;
}

export function getQuoteDataSourceByTicker(contextData, moneyAmount, hasPriceManual) {

    let response = null,
    buyBond = 0,
    sellBond = 0,
    buyBondPrice = 0,
    sellBondPrice = 0,
    unitBond = 0,
    usdBruto = 0,
    dolarNeto = 0,
    taxComision = parseFloat(getTaxByBroker(contextData.brokerSelect.brokerId).totalCost),
    ticker = contextData.tickerSelect.ticker

    if (!ticker) {

        response = {
            bondDataSourceArs: [{ "pcompra": 0, "finalAmount": 0, "unit": 0 }],
            bondDataSourceUsd: [{ "pventa": 0, "usdBruto": 0, "usdNeto": 0 }],
            bondDataSourceAutomaticByBroker: [{ "ticker": "N/D", "pcompra": 0, "pventa": 0 }, { "ticker": "N/D", "pcompra": 0, "pventa": 0 }]
        }

        return response;
    }

    let isDollarBond = ticker.substring(ticker - 1) === "D";
    let sellTicker = "";

    if (isDollarBond)
        sellTicker = ticker.substring(0, ticker.length - 1);
    else
        sellTicker = `${ticker}D`;

    let finalAmount = (moneyAmount - (moneyAmount * taxComision) / 100)

    if (hasPriceManual) {       
        
        buyBond = contextData.tickerSelect.bonds.find(x => x.ticker === ticker);
        sellBond = contextData.tickerSelect.bonds.find(x => x.ticker === sellTicker);

        //Compro al precio de venta
        buyBondPrice = buyBond.precioVenta
        //Vendo al precio de compra
        sellBondPrice = sellBond.precioCompra

        unitBond = parseInt((finalAmount / buyBondPrice) * 100)
        usdBruto = (unitBond * sellBondPrice) / 100
        dolarNeto = usdBruto - ((usdBruto * taxComision) / 100)
    }

    response = {
        bondDataSourceArs: [{ "pcompra": buyBondPrice.toFixed(2), "finalAmount": finalAmount.toFixed(2), "unit": unitBond }],
        bondDataSourceUsd: [{ "pventa": sellBondPrice.toFixed(2), "usdBruto": usdBruto.toFixed(2), "usdNeto": dolarNeto.toFixed(2) }],
        bondDataSourceAutomaticByBroker: [{ "ticker": ticker, "pcompra": "N/A", "pventa": buyBondPrice.toFixed(2) }, { "ticker": sellTicker, "pcompra": sellBondPrice.toFixed(2), "pventa": "N/A" }]
    }

    return response;
}

function updateColumnWithTicker(ticker) {

    const columnTicker = [{
        columns: [{ "name": `Precio Compra ${ticker}` }, { "name": `ARS a Vender (Comision)` }, { "name": `Unidades` }],
        headerId: 'ars'
    },
    {
        columns: [{ "name": `Precio Venta ${ticker ? ticker + 'D' : ''}` }, { "name": `USD Brutos` }, { "name": `USD Netos a Recibir` }],
        headerId: 'usd'
    }]

    return columnTicker;
}