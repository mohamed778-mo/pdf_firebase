const express = require('express');
const cors = require('cors');
const connection = require("./config/config");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bodyParser = require("body-parser");
const pdf_upload = require("./router/uploads_router")

const app = express();
app.use(express.json());

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.use('/app/pdf', pdf_upload);

connection();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Connection on port ${port}`);
});
