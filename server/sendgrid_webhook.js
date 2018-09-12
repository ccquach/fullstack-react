const keys = require('./config/keys');

var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: keys.localTunnelSubdomain }, function(
  err,
  tunnel
) {
  console.log('LT running');
});
