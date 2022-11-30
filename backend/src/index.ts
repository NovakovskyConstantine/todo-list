import { createServer } from "http";
import { TaskService } from "./task-service/task.service";
import { RouterService } from "./router-service/router.service";
import { UsersService } from "./users-service/users.service";
import { DBService } from "./db-service/db.service";
import { timeManagerConfig } from "./time-manager.config";
import { AuthService } from "./auth-service/auth.service";


const dbService = new DBService(timeManagerConfig.database);
const userService = new UsersService(dbService);
const authService = new AuthService(userService);
const taskService = new TaskService(dbService, authService);

const services = {
    dbService,
    users: userService,
    auth: authService,
    task: taskService
};

const routerService = new RouterService(services);

const hostname: string = 'localhost';
const port: number = 8000;

const requestListener = function (req, res) {
    console.log(req.url)
    routerService.processTheRequest(req, res);
};

const server = createServer(requestListener);
server.listen(port, hostname, undefined, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});