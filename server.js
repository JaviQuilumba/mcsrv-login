const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Microservice Login Running jc' });
});

app.use(cors({
  origin: 'http://lb-apigateway-1412267724.us-east-2.elb.amazonaws.com'
}));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
