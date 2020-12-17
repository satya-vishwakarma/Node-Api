const { google } = require('googleapis');
const google_config = require('../config/config');
const oauth2Client = new google.auth.OAuth2(
  google_config.installed.client_id,
  google_config.installed.client_secret,
  google_config.installed.redirect_uris
);

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

var login_url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: defaultScope
});

var googlePhoto = google.plus({ version: 'v1', oauth2Client });

module.exports = {
  login_url: login_url,
  googlePhoto: googlePhoto
}
