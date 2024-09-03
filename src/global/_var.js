require('dotenv').config();

/********** SERVER ********/

const PORT = process.env.PORT

/********** DATABASE *********/

const PG_USER = process.env._USER
const PG_NAME = process.env._NAME
const PG_PASS = process.env._PASS
const PG_HOST = process.env._HOST

/*********** KEY **********/

const KEY  =   process.env.KEY
const API_KEY = process.env.API_KEY
const CLIENT_ID = process.env.CLIENT_ID
/********** ROUTES *********/

const AUTH = process.env.AUTH
const OTP = process.env.OTP
const BANK = process.env.BANK
const CODEOTP = process.env.CODEOTP
const REGISTERPAYMENT = process.env.REGISTERPAYMENT
const NOTIFICATIONSYPAGO = process.env.NOTIFICATIONSYPAGO

module.exports = {
    //server
    PORT,
    //database
    PG_USER,
    PG_NAME,
    PG_PASS,
    PG_HOST,
    //key
    KEY,
    API_KEY,
    CLIENT_ID,
    AUTH,
    OTP,
    BANK,
    CODEOTP,
    REGISTERPAYMENT,
    NOTIFICATIONSYPAGO
}