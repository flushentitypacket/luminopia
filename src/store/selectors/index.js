import * as login from './login';
import * as channels from './channels';

export const loginSelectors = login;
export const channelsSelectors = channels;

export const getToken = state => state.login.token;
