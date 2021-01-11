import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    isLoggedIn = false;
    currentUser = 'zzy';
    identity = 'admin';
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