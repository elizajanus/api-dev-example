const { getTrips, createTrip, parseData } = require('./trips');
const mixLocationsBackForth = require('./mixLocationsBackForth');
const laneIdBackForth = require('./laneIdBackForth');
const newLaneLocationsBackForth = require('./newLaneLocationsBackForth');
const expect = require('chai').expect;

// it('gets all trips in the database and returns an array', () => {
//   return getTrips()
//   .then(res => {
//     expect(res).to.be.an('array')
//     expect(res[0]).to.have.property('id')
//   })
// })

it('Mixed Locations Back and Forth: parses incoming moves data into easily digestible pieces and returns a new trip object', () => {
  return parseData(mixLocationsBackForth)
  .then(res => {
    expect(res).to.be.an('object')
    expect(res).to.have.property('id')
  })
})

// it('Lane Id Back and Forth: parses incoming moves data into easily digestible pieces and returns a new trip object', () => {
//   return parseData(laneIdBackForth)
//   .then(res => {
//     expect(res).to.be.an('object')
//     expect(res).to.have.property('id')
//   })
// })

// it('new Locations Back and Forth: parses incoming moves data into easily digestible pieces and returns a new trip object', () => {
//   return parseData(newLaneLocationsBackForth)
//   .then(res => {
//     expect(res).to.be.an('object')
//     expect(res).to.have.property('id')
//   })
// })

// it('posts a trip to the database and returns an object', () => {
//   let trip = {
//     customer_id: 1
//   }
//     return createTrip(trip)
//     .then(res => {
//       expect(res).to.be.an('object')
//       expect(res).to.have.property('id')
//     })
// })