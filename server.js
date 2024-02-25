const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/config");
const Port = config.PORT;
const LHTLogger = require("./utils/logger");
const dbConnection = require("./config/dbConnection");
const routes = require("./routes/index");
const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use('/', routes);
app.listen(Port, () => {
    LHTLogger.info(
        'Server:listen',
        `Server is listening on port ${Port}`,
        {},
        'SakibHusainZaidi'
    )
})