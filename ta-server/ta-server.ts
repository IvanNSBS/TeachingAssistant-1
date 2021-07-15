import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';


import * as express from 'express';
import * as bodyParser from 'body-parser';

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var taserver: express.Application = express();
taserver.use(allowCrossDomain);
taserver.use(bodyParser.json());

taserver.get('/alunos', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se � mesmo Aluno!
  aluno = cadastro.cadastrar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno nao pode ser cadastrado"});
  }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  console.log("SERVER IS UPDATING ALUNO WITH CPF: " + aluno.cpf);
  aluno = cadastro.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } 
  else {
    res.send({"failure": "O aluno nao pode ser atualizado"});
  }
})

taserver.delete('/aluno/:cpf', function(req: express.Request, res: express.Response){
  var cpf = req.params.cpf;
  let deleted = cadastro.remover(cpf);

  console.log("Delete Success? " + deleted)

  if(deleted)
    res.send({"status": deleted})
  else
    res.send({"failure": "Aluno não encontrado"})
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})