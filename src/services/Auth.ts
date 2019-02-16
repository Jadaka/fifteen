import auth0, { Auth0DecodedHash } from 'auth0-js';

import history from '../history';

class Auth {
  private accessToken?: string;
  private idToken?: string;
  private expiresAt: number = 0;
  private auth0: auth0.WebAuth = new auth0.WebAuth({
    domain: 'obber.auth0.com',
    clientID: 'REur5wyNkihyed70nx6D7g5Njlb5cfzx',
    redirectUri: 'http://localhost:3000/auth/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult: Auth0DecodedHash|null) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
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
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt: number = (authResult.expiresIn as number * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    history.replace('/game');
  }

  /**
   * Renews the auth0 session. If the renewal with auth0 errors, the user will
   * be logged out.
   */
  renewSession() {
    this.auth0.checkSession({}, (err, authResult: Auth0DecodedHash) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
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

    localStorage.removeItem('isLoggedIn');
    history.replace(route);
  }

  /**
   * Returns whether the user is authenticated based on the token expiration.
   */
  isAuthenticated(): boolean {
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}

export default Auth;
