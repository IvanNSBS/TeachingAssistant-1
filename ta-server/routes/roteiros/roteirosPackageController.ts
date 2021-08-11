import {CadastroDeRoteiros} from './cadastroDeRoteiros';
import * as express from 'express';

let RoteirosPackageRouteController = express.Router();
var cadastro: CadastroDeRoteiros = new CadastroDeRoteiros();

RoteirosPackageRouteController.get('/', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getRoteiros()));
})

export default RoteirosPackageRouteController;