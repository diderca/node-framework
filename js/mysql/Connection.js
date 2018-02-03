"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class Connection {
    constructor(options) {
        if (!options || !options.host || typeof options.host !== 'string' || options.host.trim() === '') {
            throw new Error('options.host is required');
        }
        else if (!options.database || typeof options.database !== 'string' || options.database.trim() === '') {
            throw new Error('options.database is required');
        }
        else if (options.port && (typeof options.port !== 'number' || options.port < 1 || options.port > 65535)) {
            throw new Error('options.port is invalid');
        }
        else if (options.user && typeof options.user !== 'string') {
            throw new Error('options.user is invalid');
        }
        else if (options.password && typeof options.password !== 'string') {
            throw new Error('options.password is invalid');
        }
        else if (options.connectionLimit && (typeof options.connectionLimit !== 'number' || options.connectionLimit <= 0)) {
            throw new Error('options.connectionLimit is invalid');
        }
        this.pool = mysql.createPool(options);
    }
    getPoolConnection() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                resolve(connection);
            });
        });
    }
    executeQuery(connection, sql, params) {
        return new Promise((resolve, reject) => {
            connection.query(sql, params, (err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    query(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeQuery(yield this.getPoolConnection(), sql, params);
        });
    }
}
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map