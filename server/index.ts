import express from "express";
import path from "path";
import cors from "cors";
import logger from "morgan";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 1337;

app.use(cors({ origin: 'http://localhost:3000/' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname + "/public/")));
}

app.get("/", (req, res, next) => {
    const homepage =
        process.env.NODE_ENV === "production"
        && path.join(__dirname + "./client/index.html");

    homepage && res.sendFile(homepage);
    !homepage && res.json({
        message: 'Developer is currently workng on this, Please come back later'
    });
});

app.listen(port, () => console.log("Server Started"));
