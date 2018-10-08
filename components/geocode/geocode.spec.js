const Geocode  = require('./geocode');
const expect = require('chai').expect;

it('gets the latitude and longitude from an address', async() => {
  let address = "1700 Dock St, Richmond, VA 23223"
  await Geocode(address)
  .then(res => {
    expect(res).to.be.an('array')
    expect(res[0]).to.have.property('lat')
    expect(res[0]).to.have.property('lon')
  })
})


