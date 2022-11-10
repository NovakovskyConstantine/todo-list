import * as mysql from "mysql2";

import { IDBConstructorOptions } from "./db.interface";

export class DBService {
    private _host: string;
    private _name: string;
    private _user: { name: string, password: string };
    private _connection: { user: string, data?: mysql.Connection };

    constructor (options: IDBConstructorOptions) {
        this._host = options.host;
        this._name = options.name;
        this._user = options.user;

        console.log(`Запущен сервис: DBService`);
        this._createConnection();
    }

    private _createConnection(): void {
        const connection: { user: string, data?: mysql.Connection } = {
            user: this._user.name
        };
        connection.data = mysql.createConnection({
            host: this._host,
            database: this._name,
            user: this._user.name,
            password: this._user.password
        });
        connection.data.connect(err => {
            if (err) {
                console.error("Ошибка: " + err.message);
            } else if (this._connection) {
                console.log(`Пользователь ${this._user.name} уже подключен к базе данных`);
            } else {
                this._connection = connection;
                console.log(`Пользователь ${this._user.name} подключился к базе данных`);
            }
        });
    }

    public closeDataBase(): void {
        this._closeConnection();
    }

    private _closeConnection(): void {
        if (this._connection) {
            this._connection.data.end(err => {
                if (err) {
                    console.error(`Ошибка: ${err.message}`);
                } else {
                    console.log(`Соединение пользователя ${this._user.name} закрыто`);
                }
            })
        } else {
            console.log(`Соединение пользователя ${this._user.name} не найдено`);
        }
    }

    public async add(table: string, fields: string, data: any[]): Promise<any> {
        let values = "";
        data.forEach((el, index) => {
            if (index === 0) {
                values += "?";
            } else {
                values += ", ?"
            }
        })
        if (this._connection) {
            return new Promise((resolve, reject) => {
                this._connection.data.query(`INSERT INTO time_manager.${table}(${fields}) VALUES(${values})`, data, (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(result);
                    }
                });
            })
        }
    }

    public async find(table: string, query: string): Promise<any> {
        if (this._connection) {
            return new Promise((resolve, reject) => {
                this._connection.data.query(`SELECT * FROM time_manager.${table} WHERE ${query}`, (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(result);
                    }
                });
            })
        }
    }

    public async change(table: string, newData: string, query: string): Promise<any> {
        if (this._connection) {
            return new Promise((resolve, reject) => {
                this._connection.data.query(`UPDATE time_manager.${table} SET ${newData} WHERE ${query}`, (err, result) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(result);
                    }
                });
            })
        }
    }
}