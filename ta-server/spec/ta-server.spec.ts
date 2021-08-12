import request = require("request-promise");
import { closeServer } from '../ta-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../ta-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de alunos vazia", () => {
    return request.get(base_url + "aluno")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("só cadastra alunos", () => {
    var options:any = {method: 'POST', uri: (base_url + "aluno"), body:{name: "Mari", cpf: "962"}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({"failure": "O aluno não pode ser cadastrado"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });

  it("não cadastra alunos com CPF duplicado", () => {
    var aluno1 = {"json":{"nome": "Mari", "cpf" : "965", "email":""}};
    var aluno2 = {"json":{"nome": "Pedro", "cpf" : "965", "email":""}};
    var resposta1 = '{"nome":"Mari","cpf":"965","email":"","metas":{}}';
    var resposta2 = '{"nome":"Pedro","cpf":"965","email":"","metas":{}}';

    return request.post(base_url + "aluno", aluno1)
             .then(body => {
                expect(body).toEqual({success: "O aluno foi cadastrado com sucesso"});
                return request.post(base_url + "aluno", aluno2)
                         .then(body => {
                            expect(body).toEqual({failure: "O aluno não pode ser cadastrado"});
                            return request.get(base_url + "aluno")
                                     .then(body => {
                                        expect(body).toContain(resposta1);
                                        expect(body).not.toContain(resposta2);
                                      });
                          });
              })
              .catch(err => {
                 expect(err).toEqual(null)
              });            
 })


 it("Remove aluno corretamente", () => {
   var aluno1 = {"json":{"nome": "Mari", "cpf" : "9999", "email":""}};

   return request.post(base_url + "aluno", aluno1)
            .then(body => {
               expect(body).toEqual({success: "O aluno foi cadastrado com sucesso"});
               return request.delete(base_url + "aluno/9999")
                  .then(body => {
                     expect(body).toEqual("O aluno foi deletado com sucesso");
                  })
            })
            .catch(err => {
               expect(err).toEqual(null)
            }); 
 })  


 it("Tentar remover aluno que não existe falha", () => {
   return request.delete(base_url + "aluno/9916399")
      .then(body => {
         expect(body).toEqual("O aluno nao pode ser deletado");
      })
   .catch(err => {
      expect(err).toEqual(null)
   }); 
 })
 
})