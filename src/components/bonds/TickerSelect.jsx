import React, { useContext } from 'react'
import { Select } from '@chakra-ui/react'
import { SelectDataContext } from '../../context/DataContext'

export default function TickerSelect({options}) {

    const { state, setState } = useContext(SelectDataContext);

    function onChangeTicker(event) {

        let payload = {
            ticker: event.currentTarget.value,
            bonds: options
        }

        setState({ ...state, tickerSelect: payload })
    }

    return (
        <Select placeholder='Selecciona Ticker' onChange={onChangeTicker}>
            {options.filter(x=> x.ticker.substring(x.ticker.length - 1) !== "D").map((tick, index) => <option key={index} value={tick.ticker}> {tick.ticker} </option>)}
        </Select>
    )
}
