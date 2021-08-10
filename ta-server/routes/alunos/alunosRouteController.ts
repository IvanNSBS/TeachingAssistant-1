import {Aluno} from '../../../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';
import * as express from 'express';

let AlunosRouteController = express.Router();
var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

AlunosRouteController.get('/', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

AlunosRouteController.post('/', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
  aluno = cadastro.cadastrar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

AlunosRouteController.put('/', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastro.atualizar(aluno);
  if (aluno) {
    res.send("object deleted");
  } 
  else {
    res.send({"failure": "O aluno nao pode ser atualizado"});
  }
})

AlunosRouteController.delete('/:cpf', function(req: express.Request, res: express.Response){
  var cpf = req.params.cpf;
  let deleted = cadastro.remover(cpf);

  if (deleted) {
    res.send("O aluno foi deletado com sucesso");
  } 
  else {
    res.send("O aluno nao pode ser deletado");
  }
})

export default AlunosRouteController;