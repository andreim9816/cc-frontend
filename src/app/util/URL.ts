export class URL {
  static readonly HOSTNAME = 'http://localhost:8080';
  static readonly API_URL = URL.HOSTNAME + '/api';
  static readonly AUTH_URL = URL.API_URL + '/auth';
  static readonly ACCOUNT_URL = URL.API_URL + '/accounts';
}
