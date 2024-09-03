const axios = require('axios'); // Asegúrate de instalar axios: npm install axios
const {GetPayment} = require('../models/pago')

const getInfoController = async (req, res) => {
  try {
    const response = await axios.post(
      'https://pruebas.sypago.net:8086/api/v1/auth/token',
      {
        client_id: process.env.CLIENT_ID,
        secret: process.env.API_KEY
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    accessToken = response.data.access_token;
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al conectar con la API de SyPago:', error.message);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
    }
    return res.status(error.response ? error.response.status : 500).json({
      error: 'Error al conectar con la API de SyPago',
      message: error.message
    });
  }
};

const getOtpController = async (req, res) => {
  try {
    const datos = req.body;
    
    const response = await axios.post(
      'https://pruebas.sypago.net:8086/api/v1/request/otp',
      datos, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    console.log('Respuesta de OTP de SyPago:', response.data);
    return res.status(200).json(response.data);
  } catch (err) {
    console.error('Error al conectar con la API de SyPago:', err.message);
    if (err.response) {
      console.error('Detalles del error:', err.response.data);
    }
    return res.status(err.response ? err.response.status : 500).json({
      error: 'Error al conectar con la API de SyPago',
      message: err.message
    });
  }
};

const bankOptions = async (req, res) => {
  try {
    // Realizar la solicitud GET con axios
    const response = await axios.get(
      'https://pruebas.sypago.net:8086/api/v1/banks',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching bank options:', error);
    res.status(error.response?.status || 500).json({
      message: 'Error fetching bank options',
      error: error.message
    });
  }
};


const codeOtp = async (req, res) => {
  try{
    const datos = req.body;
    const response = await axios.post(
      'https://pruebas.sypago.net:8086/api/v1/transaction/otp',
      datos,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )
    console.log('Respuesta de OTP de Code:', response.data);
    return res.status(200).json(response.data);
  }catch (err) {
    console.error('Error al conectar con la API de SyPago:', err.message);
    if (err.response) {
      console.error('Detalles del error:', err.response.data);
    }
    return res.status(err.response ? err.response.status : 500).json({
      error: 'Error al conectar con la API de SyPago',
      message: err.message
    });
  }
}

const registerPayment = async (req, res) => {
  try {
    const {
      transaction_id,
      monto_pago,
      fecha_pago,
      metodo_pago,
      referencia,
      banco,
      sypago,
      status
    } = req.body;
    console.log(req.body);
    
    // Verifica que todos los campos necesarios estén presentes y no sean undefined
    if ([transaction_id, monto_pago, fecha_pago, metodo_pago, referencia, banco, status].includes(undefined)) {
      return res.status(400).json({
        status: false,
        message: 'Faltan parámetros requeridos'
      });
    }

    // Llama a GetPayment con los datos proporcionados
    const result = await GetPayment({
      transaction_id,
      monto_pago,
      fecha_pago,
      metodo_pago,
      referencia,
      banco,
      sypago: sypago || null, // Maneja valores undefined como null
      status: status || null
    });

    // Envía la respuesta al cliente
    return res.status(result.code).json({
      status: result.status,
      message: result.message,
      ...(result.insertId && { insertId: result.insertId })
    });
  } catch (error) {
    console.error('Error in registerPayment:', error);
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
}


const notificationSypago = async (req, res) => {
  try {
    const notificationData = req.body;

    // Verifica la estructura y datos de la notificación recibida
    console.log('Notificación recibida:', notificationData);

    // Envía la notificación de vuelta al cliente
    return res.status(200).json({
      status: true,
      message: 'Notificación recibida correctamente',
      data: notificationData
    });
  } catch (err) {
    console.error('Error en la notificación:', err);
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    });
  }
};



module.exports = { getInfoController, getOtpController,bankOptions,codeOtp,registerPayment,notificationSypago };
