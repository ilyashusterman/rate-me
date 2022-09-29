// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get, child, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Dictionary } from "@reduxjs/toolkit";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5WqlAujmWhvLjBvdGTs2W-FjZahm-FXw",
    authDomain: "rate-me-8303f.firebaseapp.com",
    databaseURL: "https://rate-me-8303f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rate-me-8303f",
    storageBucket: "rate-me-8303f.appspot.com",
    messagingSenderId: "1000328871085",
    appId: "1:1000328871085:web:93a2654931d7e7da0f9a24"
};

// Initialize Firebase
const FireBase = initializeApp(firebaseConfig);
const Database = getDatabase(FireBase);
const Auth = getAuth(FireBase);

class DatabaseFB {
    public endpoint: string
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
    async all(): Promise<Array<Dictionary<any>>> {
        const endpoint = this.endpoint
        return await this.query(endpoint);
    }
    async query(endpoint: string): Promise<any> {
        const refRecords = ref(Database, endpoint);
        return await new Promise(async (resolve, reject) => {
            try {
                await onValue(refRecords, (snapshot) => {
                    const data = snapshot.val();
                    resolve(data);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
    async saveObj(key: string, obj: any) {
        await set(ref(Database, key), obj);
        return obj
    }
    async updateObj(key: string, obj: any) {
        let updates = {
            [key]: obj
        };
        return update(ref(Database), updates);
    }
    async getRecord(key: string) {
        const endpoint = `${this.endpoint}${key}`
        return await this.query(endpoint)
    }
    async isRecordExist(key: string) {
        const dbRef = ref(Database);
        return new Promise(async (resolve, reject) => {
            await get(child(dbRef, key)).then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(true)
                } else {
                    console.log("No data available");
                    resolve(false)
                }
            }).catch((error) => {
                console.error(error);
                reject(error)
            });
        })
    }
}

export { FireBase, Database, Auth, DatabaseFB };