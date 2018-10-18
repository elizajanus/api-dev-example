let data = {
  customer_id: 1,
  syncWithTookan: 1,
    moves: [
      { lane_id: null,
        customer_id: 1,
        autoassign: false,
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
        pickup:
        {
          id: null,
          name: "Bookbinders",
          phone: "1234567890",
          email:"book@books.net",
          orderID: "3748590",
          address: "2306 E Cary St, Richmond, VA 23223",
          time: "10/04/2018, 2:00 pm",
          description: "description"
        },
       delivery : 
        {
          id: null,
          name: "Bottoms Up Pizza",
          phone: "1234567890",
          email:"pizza@pizza.net",
          orderID: "8398458",
          address: "1700 Dock St, Richmond, VA 23223",
          time: "10/04/2018 2:30 pm",
          description: "description"
        }
      },
      { lane_id: null,
        customer_id: 1,
        autoassign: false,
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
        pickup:
         {
          id: null,
          autoassign: false,
          name: "Bottoms Up Pizza",
          phone: "1234567890",
          email:"pizza@pizza.net",
          orderID: "3748590",
          address: "1700 Dock St, Richmond, VA 23223",
          time: "10/04/2018, 2:30 pm",
          description: "description"
        },
       delivery : 
        {
          id: null,
          name: "Bookbinders",
          phone: "1234567890",
          email:"book@books.net",
          orderID: "8398458",
          address: "2306 E Cary St, Richmond, VA 23223",
          time: "10/04/2018 3:00 pm",
          description: "description"
        }
      }
    ]
  }
  module.exports = databackup;