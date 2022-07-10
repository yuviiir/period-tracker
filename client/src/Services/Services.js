import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

export function signUp(username, password) {
    return new Promise((resolve, reject) => {
        UserPool.signUp(username, password, [], null, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

export function login(username, password) {
    const user = new CognitoUser({
        Username: username,
        Pool: UserPool
    })
    
    const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password
    })
    
    return new Promise((resolve, reject) => {
        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                resolve(data)
            },
            onFailure: (data) => {
                reject(data)
            }
        })
    })
}