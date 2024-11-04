


require('dotenv').config();
const express = require('express');
const cors = require('cors');

//------------------ROUTES IMPORTS---------------------------------------------------|

// KITTENS
const routesKittens = require('./src/kitten/routes/kittensRoutes');
const routesRequests = require('./src/shelter/routes/requestsRoutes');



//---------------------App Configuration---------------------------------------------|
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = { origin: 'http://localhost:8080' };
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));



//-----------APIs SECTION-----------------------------------------------------------|

app.use('/api', routesKittens);
app.use('/api', routesRequests);



//--------------------Error Handling Middleware-------------------------------------|

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
});



//--------------------Server Initialization-----------------------------------------|
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

