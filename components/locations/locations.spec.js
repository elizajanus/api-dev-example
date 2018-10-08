const { getLocations, createLocation, getLocation } = require('./locations');
const expect = require('chai').expect;

it('gets all trips in the database and returns an array', async() => {
  await getLocations()
  .then(res => {
    expect(res).to.be.an('array')
    expect(res[0]).to.have.property('customer_id')
  })
})

it('posts a trip to the database and returns an object', async() => {
  let locationInput = {
    "customer_id": 1
  }
  await createLocation(locationInput)
  .then(res => {
    expect(res).to.be.an('object')
    expect(res).to.have.property('customer_id')
  })
})

it('finds a location by id', async() => {
  let id = 2;
  await getLocation(id)
  .then(res => {
    expect(res).to.be.an('object')
    // expect(res[0]).to.have.property('customer_id')
  })
})

// it('fails to find a location by id', async() => {
//   let id = 2;
//   await getLocation(id)
//   .then(res => {
//     //figure this out later
//     // expect(res).to.be.an('object')
//     // expect(res[0]).to.have.property('customer_id')
//   })
// })