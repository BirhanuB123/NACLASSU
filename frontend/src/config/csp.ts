// CSP configuration for both development and production
export const cspDirectives = {
  'default-src': ["'self'"],
  'connect-src': [
    "'self'",
    'https://*.paypal.com',
    'https://*.paypalobjects.com',
    'https://api-m.sandbox.paypal.com',
    'https://api-m.paypal.com',
    'ws://localhost:*',
    'wss://localhost:*',
    'http://localhost:*',
    'https://localhost:*',
    // Firebase domains
    'https://*.firebaseapp.com',
    'https://*.firebaseio.com',
    'https://*.googleapis.com',
    'https://*.firebase.com',
    'https://*.firebasestorage.app',
    'https://securetoken.googleapis.com',
    'https://identitytoolkit.googleapis.com',
    'wss://*.firebaseio.com',
    'wss://*.firebase.com',
    'https://www.googleapis.com',
    'https://securetoken.googleapis.com'
  ],
  'img-src': [
    "'self'",
    'data:',
    'blob:',
    'https://*.paypal.com',
    'https://*.paypalobjects.com',
    'https://lovable.dev',
    'https://*.google.com',
    'https://*.googleapis.com',
    'https://www.gstatic.com',
    'https://*.firebaseapp.com',
    'https://*.firebaseio.com',
    'https://*.firebase.com',
    'https://*.firebasestorage.app',
    'https://lh3.googleusercontent.com',
    'https://*.youtube.com',
    'https://img.youtube.com'
  ],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'http://localhost:*',
    'ws://localhost:*',
    'https://*.paypal.com',
    'https://*.paypalobjects.com',
    'https://www.paypal.com',
    'https://www.gstatic.com',
    'https://apis.google.com',
    'https://*.firebase.com',
    'https://*.firebaseio.com',
    'https://*.firebaseapp.com',
    'https://www.google.com',
    'https://www.gstatic.com/firebase/*',
    'https://*.firebasejs.com',
    'https://apis.google.com/js/platform.js',
    'https://www.gstatic.com/recaptcha/'
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://*.paypal.com',
    'https://*.paypalobjects.com',
    'https://fonts.googleapis.com',
    'https://*.googleapis.com',
    'https://*.firebase.com',
    'https://*.firebaseapp.com',
    'https://www.gstatic.com',
    'https://fonts.gstatic.com'
  ],
  'frame-src': [
    "'self'",
    'https://*.paypal.com',
    'https://*.paypalobjects.com',
    'https://*.google.com',
    'https://accounts.google.com',
    'https://www.google.com',
    'https://apis.google.com',
    'https://securetoken.googleapis.com',
    'https://identitytoolkit.googleapis.com',
    'https://*.firebaseapp.com',
    'https://www.recaptcha.net',
    'https://www.gstatic.com/recaptcha/',
    'https://www.youtube.com',
    'https://*.youtube.com',
    'https://www.youtube-nocookie.com'
  ],
  'font-src': [
    "'self'",
    'data:',
    'https://*.paypal.com',
    'https://*.paypalobjects.com',
    'https://fonts.gstatic.com',
    'https://fonts.googleapis.com',
    'https://*.firebase.com',
    'https://*.firebaseapp.com',
    'https://themes.googleusercontent.com',
    'https://www.gstatic.com'
  ],
  'worker-src': [
    "'self'",
    'blob:'
  ]
};

// Convert the directives object to a CSP header string
export const generateCSP = () => {
  return Object.entries(cspDirectives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
};
