import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import config from './Rest'

export function getCycle(jwt) {
    return new Promise((resolve, reject) => {
        config
        .cycle(jwt)
        .then(res => {
            if (res.data)
                resolve(res.data)
            else
                reject(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export function getAllJournalEntries(jwt) {
    return new Promise((resolve, reject) => {
        config
        .allJournalEntries(jwt)
            .then(res => {
                if (res.data)
                    resolve(res.data)
                else
                    reject(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function updateJournalEntry(entry, jwt) {
    return new Promise((resolve, reject) => {
        config.updateJournalEntry(entry, jwt)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function postJournalEntry(entry, jwt) {
    return new Promise((resolve, reject) => {
        config.addJournalEntry(entry, jwt)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

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