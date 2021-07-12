import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';


import * as express from 'express';
import * as bodyParser from 'body-parser';

var alunos: CadastroDeAlunos = new CadastroDeAlunos();

var taserver: express.Application = express();
taserver.use(bodyParser.json());

taserver.get('/alunos', function (req, res) {
  var aluno: string = JSON.stringify(alunos.getAlunos());
  res.send(aluno);
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
  console.log(req.body)
  aluno = alunos.criar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso" + "\nBody: " + req.body});
  } 
  else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = alunos.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } 
  else {
    res.send({"failure": "O aluno não pode ser atualizado"});
  }
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})