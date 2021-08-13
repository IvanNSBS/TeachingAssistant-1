import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import AlunosRouteController from './routes/alunos/alunosRouteController'
import RoteirosPackageRouteController from './routes/roteiros/roteirosPackageController';

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var server: http.Server;
var taserver: express.Application = express();
taserver.use(allowCrossDomain);
taserver.use(bodyParser.json());

taserver.use('/aluno', AlunosRouteController)
taserver.use('/roteiro', RoteirosPackageRouteController)


function openServer(): void{
  server = taserver.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })
}

function closeServer(): void {
  server.close();
}

export { server, closeServer, openServer }
