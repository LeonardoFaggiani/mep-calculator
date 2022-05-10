const brokerTaxes = [
    {
        "id": "1",
        "bondTax": "0.50",
        "marketTax": "0.010",
        "totalCost": "0.51"
    },
    {
        "id": "",
        "bondTax": "0",
        "marketTax": "0",
        "totalCost": "0"
    }
]

const brokers = [
    {
        "id": 1,
        "description": "Bull Market Broker S.A."
    }
]




export function getTaxByBroker(id) {
    return brokerTaxes.find(x => x.id === id);
}

export function getBrokers() {
    return brokers;
}