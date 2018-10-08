let newLaneLocationsBackForth = {
  syncWithTookan: 1,
    moves: [
      {
        sequence: 1,
        vehicle: {
          stockNumber: "0394857",
          make: "Mini",
          model: "Mini Cooper Countryman",
          vin: "092387475",
          color: "blue",
          year: "2011",
          image: "http://images.gtcarlot.com/pictures/65421182.jpg",
          odometer: "20000"
        },
        lane: 
        {
          pickup: {
              name: "West Broad",
              address: "8406 West Broad St,Richmond,VA,23294",
              email: "rob@socialautotransport.com",
              phone: "8042394505",
              time: "10/08/2018, 1:30 pm"
          },
          delivery: {
              name: "Midlo Recon",
              address: "5976 Midlothian Turnpike,Midlothian,VA,23113",
              email: "rob@socialautotransport.com",
              phone: "8042394505",
              time: "10/08/2018, 2:00 pm"
          }
      }
      },
      {
        sequence: 2,
        vehicle: {
          stockNumber: "02354668",
          make: "Ford",
          model: "F-150",
          vin: "3466892387475",
          color: "black",
          year: "2015",
          image: "https://i.ytimg.com/vi/WkuYUMhM6mk/maxresdefault.jpg",
          odometer: "30000"
        },
        lane: 
        { pickup:
         {
          name: "Bottoms Up Pizza",
          phone: "1234567890",
          email:"pizza@pizza.net",
          address: "1700 Dock St, Richmond, VA 23223",
          time: "10/08/2018, 2:30 pm"
        }, 
        delivery : 
        {
          name: "Bookbinders",
          phone: "1234567890",
          email:"book@books.net",
          address: "2306 E Cary St, Richmond, VA 23223",
          time: "10/08/2018 3:00 pm"
        }
      }
    }
    ]
  }
  module.exports = newLaneLocationsBackForth;