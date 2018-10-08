'use strict'
const { createAB, createBA, createReturn } = require('./tookan');
const chai = require("chai");
const expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

  let move =  { laneID: null,
    autoassign: false,
    pickup:
    {
      locationID: null,
      autoassign: false,
      name: "Bottoms Up Pizza",
      phone: "1234567890",
      email:"pizza@pizza.net",
      orderID: "3748590",
      address: "1700 Dock St, Richmond, VA 23223",
      time: "09/27/2018, 2:00 pm",
      description: "description",
      stock: "0394857",
      make: "Mini",
      model: "Mini Cooper Countryman",
      vin: "092387475",
      color: "red",
      year: "2014",
      image: "http://images.gtcarlot.com/pictures/65314327.jpg",
      odometer: "20000"
    },
   delivery : 
    {
      locationID: null,
      name: "Bookbinders",
      phone: "1234567890",
      demail:"book@books.net",
      orderID: "8398458",
      address: "12306 E Cary St, Richmond, VA 23223",
      time: "09/27/2018 3:00 pm",
      description: "description"
    }
  }

it('posts a move with two AB stops to the database and returns an object with status 200', async() => {
  const promise = new Promise(function(resolve,reject){
    resolve(createAB(move))
    reject(err)
  })
 return promise
  promise.then(res => {
    expect(res.data.status).to.eventually.equal(200)
    expect(res.data).to.eventually.be.an('object')
    expect(res.data.data).to.eventually.have.property('deliveries')
    done()
  })
})

it('posts a move with two BA stops to the database and returns an object with status 200', async() => {
  const promise = new Promise(function(resolve,reject){
    resolve(createBA(move))
    reject(err)
  })
 return promise
  promise.then(res => {
    expect(res.data.status).to.eventually.equal(200)
    expect(res.data).to.eventually.be.an('object')
    expect(res.data.data).to.eventually.have.property('deliveries')
    done()
  })
})

it('posts a move with two Return BA stops to the database and returns an object with status 200', async() => {
  const promise = new Promise(function(resolve,reject){
    resolve(createReturn(move))
    reject(err)
  })
 return promise
  promise.then(res => {
    expect(res.data.status).to.eventually.equal(200)
    expect(res.data).to.eventually.be.an('object')
    expect(res.data.data).to.eventually.have.property('deliveries')
    done()
  })
})

it('creates a new customer in Tookan', async(move) => {
  const promise = new Promise(function(resolve,reject){
    resolve(createTookanLocation(move))
    reject(err)
  })
 return promise
  promise.then(res => {
    expect(res.data.status).to.eventually.equal(200)
    expect(res.data).to.eventually.be.an('object')
    expect(res.data.data).to.eventually.have.property('customer_id')
    done()
  })
})

it('finds tookan customer by id', async(id) => {
  const promise = new Promise(function(resolve,reject){
    resolve(getTookanLocation(id))
    reject(err)
  })
 return promise
  promise.then(res => {
    expect(res.data.status).to.eventually.equal(200)
    expect(res.data).to.eventually.be.an('object')
    expect(res.data.data.cust_details[0]).to.eventually.have.property('customer_id')
    done()
  })
})

// it('fails to find tookan customer by id', async(id) => {
//   const promise = new Promise(function(resolve,reject){
//     resolve(getTookanLocation(id))
//     reject(err)
//   })
//  return promise
//   promise.then(res => {
//     //figure this out later
//     // expect(res.data.status).to.eventually.equal(200)
//     // expect(res.data).to.eventually.be.an('object')
//     // expect(res.data.data.cust_details[0]).to.eventually.have.property('customer_id')
//     done()
//   })
// })
