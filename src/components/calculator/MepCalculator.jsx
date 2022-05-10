import TickerSelect from '../bonds/TickerSelect'
import AutomaticQuote from '../bonds/AutomaticQuote'
import ManualQuote from '../bonds/ManualQuote'
import React, { useEffect, useState } from 'react'
import { Input, Stack, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import axios from 'axios'
import BrokerSelect from '../brokers/BrokerSelect'
import SelectDataProvider from '../../context/DataContext'
import { getBrokers } from '../brokers/broker.services'

function MepCalculator() {

    const [ticker, setTicker] = useState([]);
    const [broker, setBroker] = useState([]);
    const [amount, setAmount] = useState(0);

    const fetchData = async () => {

        const response = await getDataFromBroker();

        var onlyTickerWithOperations = response.filter((bond) => {
            return bond.ticker.substring(bond.ticker.length - 1) === "D"
        });

        var tickerPesos = response.filter((bond) => {
            return onlyTickerWithOperations.find(x => x.ticker.substring(0, x.ticker.length - 1) === bond.ticker)
        });

        onlyTickerWithOperations = [...onlyTickerWithOperations, ...tickerPesos]

        onlyTickerWithOperations.sort(orderByTicker)

        return onlyTickerWithOperations
    }

    useEffect(async () => {

        setBroker(getBrokers());

        var tickers = await fetchData().catch(console.error);

        setTicker(tickers);
        
    }, []);

    return (

        <div>

            <div className='container'>

                <SelectDataProvider>
                    <div className='row'>
                        <div className="col-4">

                            <div className="mb-3 mt-3">
                                <Stack spacing={4}>
                                    <InputGroup>
                                        <InputLeftAddon children="ARS a Vender" />
                                        <Input type='text' value={amount} placeholder='Ej: 1000' onInput={event => setAmount(event.target.value)} />
                                    </InputGroup>
                                </Stack>
                            </div>

                        </div>

                        <div className="col-4">
                            <div className="mb-3 mt-3">
                                <TickerSelect options={ticker} />
                            </div>
                        </div>

                        <div className="col-4">
                            <div className="mb-3 mt-3">
                                <BrokerSelect options={broker} />
                            </div>
                        </div>

                    </div>

                    <AutomaticQuote moneyAmount={amount} />

                    <ManualQuote moneyAmount={amount} />
                    
                </SelectDataProvider>


            </div>

        </div>
    )
}

function orderByTicker(a, b) {

    if (a.ticker > b.ticker) {
        return 1;
    }

    if (a.ticker < b.ticker) {
        return -1;
    }

    return 0;
}

async function getDataFromBroker() {

    const response = await axios.get("https://mep-calculator.azurewebsites.net/api/broker").then(res => res.data);

    return response

};

export default MepCalculator;