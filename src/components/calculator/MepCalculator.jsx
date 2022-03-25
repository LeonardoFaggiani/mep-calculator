import React from 'react';
import TickerSelect from './TickerSelect'
import AutomaticQuote from './AutomaticQuote'

import { Input, Stack, InputGroup, InputLeftAddon } from '@chakra-ui/react'

function MepCalculator() {

    return (

        <div>

            <div className='container'>

                <div className='row'>
                    <div className="col-3">

                        <div className="mb-3 mt-3">
                            <Stack spacing={4}>
                                <InputGroup>
                                    <InputLeftAddon children="ARS a Vender" />
                                    <Input type='text' placeholder='Ej: 1000' />
                                </InputGroup>
                            </Stack>
                        </div>

                    </div>

                    <div className="col-3">
                        <div className="mb-3 mt-3">
                            <TickerSelect />
                        </div>
                    </div>
                </div>

                <AutomaticQuote />

            </div>

        </div>
    )
}

export default MepCalculator;