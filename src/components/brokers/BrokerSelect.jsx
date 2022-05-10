import React, { useContext } from 'react'
import { Select } from '@chakra-ui/react'
import { SelectDataContext } from '../../context/DataContext'

export default function BrokerSelect({ options }) {

    const { state, setState } = useContext(SelectDataContext);

    function onChangeBroker(event) {

        var payload = {
            brokerId: event.target.value
        }

        setState({ ...state, brokerSelect: payload });
    }

    return (
        <Select placeholder='Seleccione Broker' onChange={onChangeBroker}>
            {options.map((broker, index) => <option key={index} value={broker.id}> {broker.description} </option>)}
        </Select>
    )
}
