var path = require('path');
var app = express();

app.use(express.static(__dirname + 'public')); //Serves resources from public folder
this.express.use('/public', express.static(publicPath));