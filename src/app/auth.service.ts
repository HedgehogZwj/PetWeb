import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    isLoggedIn = false;
    currentUser = 'wladmin';
    identity = 'admin';
    ip = '192.168.144.1'
    login() {
        this.isLoggedIn = true;
    }
    logout() {
        this.isLoggedIn = false;
    }
    loggedIn() {
        return this.isLoggedIn;
    }
}