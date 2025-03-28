require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('../src/models');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', require('../src/routes/user.routes'));

const PORT = process.env.PORT || 5001;
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
});
