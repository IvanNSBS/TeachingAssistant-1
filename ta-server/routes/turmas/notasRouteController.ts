import * as express from 'express';
import { Turma } from '../../../common/src/turmas/turma';

let NotasRouteController = express.Router();
let turma: Turma = new Turma();

NotasRouteController.get('/', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(turma));
})

NotasRouteController.post('/', function (req: express.Request, res: express.Response) {
  var newTurma = <Turma>req.body; 
  turma = newTurma;
  res.send({"success": "Notas Cadastradas com sucesso"});
})

export default NotasRouteController;