import startServer from "./utils/server.js";
import { sequelize } from "./data/db.js";
import { PORT } from "./config/config.js";

const app = startServer();

app.listen(PORT, async () => {
	// if (process.env.NODE_ENV !== "production") {
	// 	await sequelize.sync({ force: true });
	// }

	console.log(`Server is listening http://localhost:${PORT}`);
});

// sequelize.sync({ force: true }).then(() => startServer());
