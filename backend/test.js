// Import the axios library
import axios from 'axios';
import config from 'config';

// Define the API endpoint
const apiUrl = 'https://api.duffel.com/air/offer_requests?return_offers=false&supplier_timeout=10000';

// Configure the request headers
const headers = {
    'Accept-Encoding': 'gzip',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Duffel-Version': 'v1',
    'Authorization': `Bearer duffel_test_DuK2CNFO55L5BHkwlq6uekB2E4PE2SMnaXbSFuy16zg`  // Replace <YOUR_ACCESS_TOKEN> with your actual Duffel API access token
};

// Set up the request data
const data = {
    "data": {
        "slices": [
            {
                "origin": "LHR",
                "destination": "JFK",
                "departure_time": {
                    "to": "17:00",
                    "from": "09:45"
                },
                "departure_date": "2024-07-24",
                "arrival_time": {
                    "to": "17:00",
                    "from": "09:45"
                }
            }
        ],
        "private_fares": {
            "QF": [
                {
                    "corporate_code": "FLX53",
                    "tracking_reference": "ABN:2345678"
                }
            ],
            "UA": [
                {
                    "corporate_code": "1234",
                    "tour_code": "578DFL"
                }
            ]
        },
        "passengers": [
            {
                "family_name": "Earhart",
                "given_name": "Amelia",
                "loyalty_programme_accounts": [
                    {
                        "account_number": "12901014",
                        "airline_iata_code": "BA"
                    }
                ],
                "type": "adult"
            },
            {
                "age": 14
            },
            {
                "fare_type": "student"
            },
            {
                "age": 5,
                "fare_type": "contract_bulk_child"
            }
        ],
        "max_connections": 0,
        "cabin_class": "economy"
    }
};

// Make the POST request
axios.post(apiUrl, data, { headers })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });
