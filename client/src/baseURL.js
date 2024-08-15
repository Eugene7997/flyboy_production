const dotenv = require('dotenv').config()
const baseUrl = process.env.CLIENT_ORIGIN ||"http://localhost:3000";

export default baseUrl;