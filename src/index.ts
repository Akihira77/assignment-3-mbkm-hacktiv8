import "dotenv/config.js";
import startServer from "./utils/server.js";
import { sequelize } from "./data/db.js";

const app = startServer();

const port = Number(process.env.PORT || 7000);
app.listen(port, async () => {
    // await sequelize.sync({ force: true });

    console.log(`Server is listening http://localhost:${port}`);
});

// sequelize.sync({ force: true }).then(() => startServer());
