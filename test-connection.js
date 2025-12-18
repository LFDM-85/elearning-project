const axios = require('axios');

async function testConnection() {
  try {
    console.log('Testing connection to http://localhost:5000...');
    const response = await axios.get('http://localhost:5000');
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Connection failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testConnection();
