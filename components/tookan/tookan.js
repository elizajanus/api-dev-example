'use strict'
const axios = require('axios');
const moment = require('moment');

const createTookanLocation = (move) => {
  axios({
      method: 'post',
      url: 'https://example.com/v2/customer/add',
      data: {
        "api_key": "example",
        "user_type": 0,
        "name": move.lane.pickup.name,
        "phone": move.lane.pickup.phone,
        "email": move.lane.pickup.email,
        "address": move.lane.pickup.address
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
}

const getTookanLocation = async (id) => {
  axios({
      method: 'post',
      url: 'https://example.com/v2/view_customer_profile',
      data: {
        "api_key": "example",
        "customer_id": id
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
}

const createTookanMove = (move, callback) => {

  const deliverytime = new Date(move.lane.delivery.time).toISOString();
  const pickuptime = new Date(move.lane.pickup.time).toISOString();

  axios({
      method: 'post',
      url: 'https://example.com/v2/create_multiple_tasks',
      data: {
        api_key: 'example',
        // fleet_id: 1,
        timezone: +300,
        has_pickup: 1,
        has_delivery: 1,
        layout_type: 0,
        geofence: 0,
        auto_assignment: false,
        tags: "",
        pickups: [{
          address: move.lane.pickup.address,
          time: moment(pickuptime).format('YYYY-MM-DD HH:mm:ss'),
          phone: move.lane.pickup.phone,
          template_name: "Pickup",
          template_data: [{
              label: "StockNumber",
              data: move.vehicle_stock
            },
            {
              label: "Year",
              data: move.vehicle_year
            },
            {
              label: "Make",
              data: move.vehicle_make
            },
            {
              label: "Model",
              data: move.vehicle_model
            },
            {
              label: "Color",
              data: move.vehicle_color
            },
            {
              label: "Odometer",
              data: move.vehicle_odometer
            }
          ],
          ref_images: [
            move.vehicle_image
          ],
          name: move.lane.pickup.name,
          email: move.lane.pickup.email,
          job_description: move.lane.description
        }],
        deliveries: [{
          address: move.lane.delivery.address,
          time: moment(deliverytime).format('YYYY-MM-DD HH:mm:ss'),
          phone: move.lane.delivery.phone,
          template_name: "Delivery",
          name: move.lane.delivery.name,
          email: move.lane.delivery.email,
          job_description: move.lane.id
        }]
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res)
      callback(res);
    }).catch(err => {
      console.log(err)
    })
}

module.exports = {
  createTookanMove,
  createTookanLocation,
  getTookanLocation
}