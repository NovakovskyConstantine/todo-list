export async function createTask(service, params): Promise<any> {
    const fields = "userLogin, task, description, isCompleted";
    const values = [params.login, params.task, params.description, false];
    console.log("values = ", values)
    const newTask = service.add("tasks", fields, values);

    return new Promise((resolve, reject) => {
        if (newTask) {
            return resolve(newTask);
        } else {
            return reject(`При попытке создать задачу произошла ошибка.`);
        }
    })
}