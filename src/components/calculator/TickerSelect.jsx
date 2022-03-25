import React from 'react'
import { Select } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { selected } from './reducers/tickerSelectReducer'

export default function TickerSelect() {

    const dispatch = useDispatch()

    function onChangeTicker(event) {

        let tableWithHeaderModified = [{
            columns: [{ "name": `Precio Compra ${event.currentTarget.value}` }, { "name": `ARS a Vender (Comision)` }, { "name": `Unidades` }],
            headerId: 'ars'
        },
        {
            columns: [{ "name": `Precio Venta ${event.currentTarget.value ? event.currentTarget.value + 'D' : ''}` }, { "name": `USD Brutos` }, { "name": `USD Netos a Recibir` }],
            headerId: 'usd'
        }]

        let payloadSelected = {
            ticker: event.currentTarget.value,
            table: tableWithHeaderModified
        }

        dispatch(selected(payloadSelected));
    }

    return (
        <Select placeholder='Selecciona Ticker' onChange={onChangeTicker}>
            <option value='AL30'>AL30</option>
            <option value='AL29'>AL29</option>
            <option value='GD30'>GD30</option>
        </Select>
    )
}
