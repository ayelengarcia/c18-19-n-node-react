const google = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.SECRET_ID, process.env.REDIRECT);