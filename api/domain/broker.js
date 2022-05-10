const https = require('https');
const Bond = require('../domain/bond')

class Broker {

    constructor() {
        this.Url = `https://open.bymadata.com.ar/vanoms-be-core/rest/api/bymadata/free/public-bonds`
        this.BodyEndpoint = JSON.stringify({
            "T2": true,
            "T1": false,
            "T0": false,
            "Content-Type": "application/json"
        })
        this.AxiosConfig = {
            method: 'POST',
            url: this.Url,
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            headers: {
              'Content-Type': 'application/json'
            },
            data: this.BodyEndpoint
          }
    }   

    
  getBondsGreaterThanFiftyOperations(bondsResponse) {
    let bonds = [];

    bondsResponse.forEach(element => {
      if (element.numberOfOrders >= 0) {
        let bond = new Bond(element.bidPrice, element.offerPrice, element.symbol, element.numberOfOrders);
        bonds.push(bond);
      }      
    });

    return bonds;
  }

}  

module.exports = Broker