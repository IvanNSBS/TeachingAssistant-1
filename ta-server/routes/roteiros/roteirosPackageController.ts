import {CadastroDeRoteiros} from './cadastroDeRoteiros';
import { Roteiro } from '../../../common/src/roteiros/roteiro';
import * as express from 'express';
import { LixeiraRoteiros } from './lixeiraRoteiros';

let RoteirosPackageRouteController = express.Router();
var cadastro: CadastroDeRoteiros = new CadastroDeRoteiros();
var lixeira: LixeiraRoteiros = new LixeiraRoteiros();

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

RoteirosPackageRouteController.delete("/:id", function(req: express.Request, res: express.Response) {
  var id = req.params.id;
  let deleted = cadastro.remover(id);

  if (deleted !== undefined) {
    lixeira.enviarParaLixeira(deleted);
    res.send({"success":"O roteiro foi enviado para a lixeira"});
  } 
  else {
    res.send({"failure":"O roteiro nao pode ser enviado para a lixeira"});
  }
})

RoteirosPackageRouteController.delete("/lixeira/:idList", function(req: express.Request, res: express.Response) {
  var queryString:string = req.params.idList;
  let idList = queryString.split(',');

  let deleted = lixeira.deletarPermanentemente(idList);
  if (deleted) {
    res.send({"success":"Os roteiros foram deletados permanentemente"});
  } 
  else {
    res.send({"failure":"ID invalido para algum roteiro"});
  }
})

RoteirosPackageRouteController.get("/lixeira", function(req: express.Request, res: express.Response) {
  res.send(JSON.stringify(lixeira.getRoteiros()));
})
export default RoteirosPackageRouteController;