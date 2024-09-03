const { AUTH,OTP,BANK,CODEOTP,REGISTERPAYMENT,NOTIFICATIONSYPAGO } = require('../global/_var');

/************ dependency ************/

const express = require('express');
const router = express.Router();

/************ controller  ***********/

const getInfoController = require('../controllers/getInfo.Controller')

router.post(AUTH,getInfoController.getInfoController)
router.post(OTP,getInfoController.getOtpController)
router.get(BANK,getInfoController.bankOptions)
router.post(CODEOTP,getInfoController.codeOtp)
router.post(REGISTERPAYMENT,getInfoController.registerPayment)
router.post(NOTIFICATIONSYPAGO,getInfoController.notificationSypago)

module.exports = router