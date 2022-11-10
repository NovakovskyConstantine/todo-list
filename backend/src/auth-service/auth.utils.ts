import { sign } from "jsonwebtoken";

export async function signJWT(login: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        sign({
            login,
            iat: Math.floor(Date.now() / 1000)
        },
        secret, {
            algorithm: "HS256"
        }, (error, token) => {
            if (error) {
                reject(error)
            } else {
                resolve(token as string)
            }
        })
    })
}

export async function findUser(service, params): Promise<void> {
    return await service.findUser(params)
        .then(result => result)
        .catch(result => result);
}

export async function userAutorization(service, params): Promise<void> {
    return await service._userAutorization(params)
        .then(result => result)
        .catch(result => {
            return new Promise((resolve, reject) => {
                if (result === "User not found") {
                    reject({
                        statusCode: 404,
                        statusMessage: "User not found"
                    });
                } else if (result === "Bad password") {
                    reject ({
                        statusCode: 403,
                        statusMessage: "Bad password"
                    });
                }
            });
        });
}