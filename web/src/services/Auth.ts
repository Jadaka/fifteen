import auth0, { Auth0DecodedHash } from 'auth0-js';

import Store from '../modules/Store';

import {
  AUTH0_API_IDENTIFIER,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_REDIRECT_URI,
  AUTH0_RESPONSE_TYPE,
  AUTH0_SCOPE } from '../config';
import history from '../history';

console.log('AUTH0_API_IDENTIFIER = ', AUTH0_API_IDENTIFIER);

class Auth {
  private store: Store = new Store();
  private accessToken?: string;
  private idToken?: string;
  private expiresAt: number = 0;
  private auth0: auth0.WebAuth = new auth0.WebAuth({
    audience: AUTH0_API_IDENTIFIER,
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_REDIRECT_URI,
    responseType: AUTH0_RESPONSE_TYPE,
    scope: AUTH0_SCOPE,
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication(onAuthenticated: () => void) {
    this.auth0.parseHash((err, authResult: Auth0DecodedHash|null) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        onAuthenticated();
      } else if (err) {
        history.replace('/');
        console.log(`Error logging the user in. err: ${err}`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  /**
   * Given a decoded hash from auth0, stores the accessToken, idToken, and
   * expiration.
   */
  setSession(authResult: Auth0DecodedHash) {
    this.store.set('isLoggedIn', true);

    // Set the time that the access token will expire at
    let expiresAt: number =
      (authResult.expiresIn as number * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
  }

  /**
   * Renews the auth0 session. If the renewal with auth0 errors, the user will
   * be logged out.
   */
  renewSession(onAuthenticated: () => void) {
    this.auth0.checkSession({}, (err, authResult: Auth0DecodedHash) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        onAuthenticated();
      } else if (err) {
        this.logout();
        console.error(err);
      }
    });
  }

  /**
   * Remove tokens and expiration time. Once complete, the user will be
   * redirected to the input route.
   */
  logout(route: string = '/'): void {
    this.accessToken = undefined;
    this.idToken = undefined;
    this.expiresAt = 0;

    this.store.remove('isLoggedIn');
    history.replace(route);
  }

  /**
   * Returns whether the user is authenticated based on the token expiration.
   */
  isAuthenticated(): boolean {
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  /**
   * Returns whether the logged in flag is persisted in localStorage.
   */
  isPreviouslyLoggedIn(): boolean {
    return this.store.get('isLoggedIn');
  }
}

export default Auth;
