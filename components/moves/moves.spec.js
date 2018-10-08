const { createMove, updateTookanIds } = require('./moves');
// const data = require('./data')
const expect = require('chai').expect;

// it('posts a move to the database and returns an object', async() => {
//   await createMove(data)
//   .then(res => {
//     expect(res).to.be.an('object')
//     expect(res).to.have.property('customer_id')
//   })
// })

it('updates a move in the database and returns an object', async() => {
  let body = {
    job_token: '1324985710839457',
    pickup_stop_id: 2344,
    delivery_stop_id: 5487
  }
  await updateTookanIds(25, body.job_token, body.pickup_stop_id, body.delivery_stop_id)
  .then(res => {
    expect(res).to.be.an('object')
    // expect(res).to.have.property('customer_id')
  })
})
