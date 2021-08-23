import {CadastroDeRoteiros} from './cadastroDeRoteiros';
import { Roteiro } from '../../../common/src/roteiros/roteiro';
import * as express from 'express';
import { LixeiraRoteiros } from './lixeiraRoteiros';

let RoteirosPackageRouteController = express.Router();
var cadastro: CadastroDeRoteiros = new CadastroDeRoteiros();
var lixeira: LixeiraRoteiros = new LixeiraRoteiros();

function resetServices(): void {
  cadastro = new CadastroDeRoteiros();
  lixeira = new LixeiraRoteiros();
}

RoteirosPackageRouteController.get('/', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getRoteiros()));
})

RoteirosPackageRouteController.get('/:id', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getRoteiros().find(a => a.id === req.params.id)));
})

RoteirosPackageRouteController.post('/', function (req: express.Request, res: express.Response) {
  var roteiro: Roteiro = <Roteiro> req.body;
  if(lixeira.getRoteiros().findIndex(rot => rot.id === roteiro.id) !== -1)
    roteiro = undefined;
  else 
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

RoteirosPackageRouteController.post("/lixeira/restaurar", function(req: express.Request, res: express.Response) {
  var idList: string[] = req.body;

  let restored = lixeira.restaurarRoteiros(idList);
  if (restored.length > 0) {
    restored.forEach(rot => cadastro.cadastrar(rot))
    res.send({"success":"Os roteiros foram restaurados com sucesso"});
  } 
  else {
    res.send({"failure":"ID invalido para algum roteiro"});
  }
})

RoteirosPackageRouteController.get("/lixeira", function(req: express.Request, res: express.Response) {
  res.send(JSON.stringify(lixeira.getRoteiros()));
})

RoteirosPackageRouteController.put('/', (req: express.Request, res: express.Response) => {
  const roteiro: Roteiro = <Roteiro>req.body;

  if (cadastro.atualizar(roteiro)) {
    res.send({ 'success': 'O roteiro foi atualizado com sucesso' });
  } else {
    res.send({ 'failure': 'O roteiro não foi atualizado' });
  }
});

export default RoteirosPackageRouteController;
export { resetServices }