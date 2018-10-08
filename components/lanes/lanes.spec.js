const { getLanes, createLane, getLane } = require('./locations');
const expect = require('chai').expect;

it('gets all trips in the database and returns an array', async() => {
  await getLanes()
  .then(res => {
    expect(res).to.be.an('array')
    expect(res[0]).to.have.property('customer_id')
  })
})

it('posts a trip to the database and returns an object', async() => {
  let input = {
    "customer_id": 1
  }
  await createLane(input)
  .then(res => {
    expect(res).to.be.an('object')
    expect(res).to.have.property('customer_id')
  })
})

it('finds a location by id', async() => {
  await getLane(id)
  .then(res => {
    expect(res).to.be.an('object')
    expect(res[0]).to.have.property('customer_id')
  })
})

it('fails to find a location by id', async(id) => {
  await getLane(id)
  .then(res => {
    //figure this out later
    // expect(res).to.be.an('object')
    // expect(res[0]).to.have.property('customer_id')
  })
})