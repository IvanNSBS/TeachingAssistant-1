import { json } from "body-parser";
import request = require("request-promise");
import { closeServer, openServer } from '../ta-server';

var base_url = "http://localhost:3000/";

describe("O servidor na rota de lixeira", () => {
  beforeAll(openServer);

  afterAll(closeServer);

  it("inicialmente retorna uma lista de roteiros vazia", () => {
    return request.get(base_url + "roteiro/lixeira")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("Remove permanentemente um roteiro", () => {
    let roteiro = {"json":{"id" : "saas", "titulo": "SaaS", "metaAssociada":"saas"}};
    let resposta1 = '{"id" : "saas", "titulo": "SaaS", "metaAssociada":"saas"}';

    return request.post(base_url + "roteiro", roteiro)
             .then(body => {
                expect(body).toEqual({success: "O roteiro foi cadastrado com sucesso"});
                return request.delete(base_url + "roteiro/saas")
                   .then(body => {
                      expect(body).toEqual('{"success":"O roteiro foi enviado para a lixeira"}');
                      return request.delete(base_url + "roteiro/lixeira/saas")
                        .then(body => {
                            expect(body).toEqual('{"success":"Os roteiros foram deletados permanentemente"}');
                                                                    
                            return request.get(base_url + "roteiro/lixeira")
                            .then(body => {
                                expect(body).not.toContain(resposta1);
                            })
                        })
                   })
             })
             .catch(err => {
                expect(err).toEqual(null)
             }); 
  }) 

  it("Remove permanentemente mais de um roteiro", () => {
    let roteiro1 = {"json":{"id" : "saas", "titulo": "SaaS", "metaAssociada":"saas"}};
    let roteiro2 = {"json":{"id" : "saas2", "titulo": "SaaS2", "metaAssociada":"saas2"}};

    let resposta1 = '{"id" : "saas", "titulo": "SaaS", "metaAssociada":"saas"}';
    let resposta2 = '{"id" : "saas2", "titulo": "SaaS2", "metaAssociada":"saas2"}';

    return request.post(base_url + "roteiro", roteiro1)
             .then(body => {
                expect(body).toEqual({success: "O roteiro foi cadastrado com sucesso"});
                return request.post(base_url + "roteiro", roteiro2).then(body => {
                    expect(expect(body).toEqual({success: "O roteiro foi cadastrado com sucesso"}))
                    
                    return request.delete(base_url + "roteiro/saas")
                        .then(body => {
                            expect(body).toEqual('{"success":"O roteiro foi enviado para a lixeira"}')
                            
                            return request.delete(base_url + "roteiro/saas2")
                            .then(body => {
                                expect(body).toEqual('{"success":"O roteiro foi enviado para a lixeira"}')
                              
                                return request.delete(base_url + "roteiro/lixeira/saas,saas2")
                                    .then(body => {
                                        expect(body).toEqual('{"success":"Os roteiros foram deletados permanentemente"}')
                                        
                                        return request.get(base_url + "roteiro/lixeira")
                                            .then(body => {
                                                expect(body).not.toContain(resposta1);
                                                expect(body).not.toContain(resposta2);
                                            })
                                    })
                            })
                        })
                })
             })
             .catch(err => {
                expect(err).toEqual(null)
             }); 
  }) 

  it("Restaura um roteiro", () => {
    let roteiro = {"json":{"id" : "saasRestore", "titulo": "SaaS Restore", "metaAssociada":"saas"}};
    let ids = {"json":["saasRestore"]}

    let resposta = '{"id":"saasRestore","titulo":"SaaS Restore","metaAssociada":"saas"}';

    return request.post(base_url + "roteiro", roteiro)
             .then(body => {
                expect(body).toEqual({success: "O roteiro foi cadastrado com sucesso"});

                return request.delete(base_url + "roteiro/saasRestore")
                   .then(body => {
                      expect(body).toEqual('{"success":"O roteiro foi enviado para a lixeira"}');

                      return request.post(base_url + "roteiro/lixeira/restaurar", ids)
                        .then(body => {
                            expect(body).toEqual({success:"Os roteiros foram restaurados com sucesso"});
                            
                            return request.get(base_url + "roteiro/lixeira")
                                .then(body => {
                                    expect(body).not.toContain(resposta);

                                    return request.get(base_url + "roteiro")
                                        .then(body => {
                                            console.log("roteiros body: " + body)
                                            expect(body).toContain(resposta);
                                        })
                                })
                        })
                   })
             })
             .catch(err => {
                expect(err).toEqual(null)
             }); 
  }) 
})