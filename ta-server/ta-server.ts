import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import AlunosRouteController from './routes/alunos/alunosRouteController'
import RoteirosPackageRouteController, { resetServices } from './routes/roteiros/roteirosPackageController';
import NotasRouteController from './routes/turmas/notasRouteController';

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var server: http.Server = undefined;
var taserver: express.Application = express();
taserver.use(allowCrossDomain);
taserver.use(bodyParser.json());

taserver.use('/aluno', AlunosRouteController)
taserver.use('/roteiro', RoteirosPackageRouteController)
taserver.use('/notas', NotasRouteController)

openServer()

function openServer(): void{
  if(server === undefined) {
    resetServices();

    server = taserver.listen(3000, function () {
      console.log('Example app listening on port 3000!')
    })
  }
}

function closeServer(): void {
  server.close();
  server = undefined;
}

export { server, closeServer, openServer }
