import {CadastroDeRoteiros} from './cadastroDeRoteiros';
import { Roteiro } from '../../../common/src/roteiros/roteiro';
import * as express from 'express';

let RoteirosPackageRouteController = express.Router();
var cadastro: CadastroDeRoteiros = new CadastroDeRoteiros();

RoteirosPackageRouteController.get('/', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getRoteiros()));
})

RoteirosPackageRouteController.post('/', function (req: express.Request, res: express.Response) {
  var roteiro: Roteiro = <Roteiro> req.body;
  
  roteiro = cadastro.cadastrar(roteiro);
  if (roteiro) {
    res.send({"success": "O roteiro foi cadastrado com sucesso"});
  } 
  else {
    res.send({"failure": "O roteiro não pode ser cadastrado"});
  }
})

export default RoteirosPackageRouteController;