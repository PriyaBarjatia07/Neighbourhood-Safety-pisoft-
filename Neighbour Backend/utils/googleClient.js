const {google}= require ('googleapis');
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;

exports.oauth2client=new google.auth.OAuth2(
    "155243607559-3nqeucdg34b6j157aroosodhedejq55u.apps.googleusercontent.com",
    "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",
    'postmessage'
);