import { json } from "body-parser";
import request = require("request-promise");
import { closeServer, openServer } from '../ta-server';
import { getRequest, postRequest, deleteRequest } from "./helpers";

var base_url = "http://localhost:3000/";

let roteiroUrl: string = base_url + "roteiro/";
let lixeiraUrl: string = base_url + "roteiro/lixeira/";

let createRotSuccess = {success: "O roteiro foi cadastrado com sucesso"};
let deleteRotSuccess = '{"success":"O roteiro foi enviado para a lixeira"}';
let permaDelSuccess = '{"success":"Os roteiros foram deletados permanentemente"}';

describe("O servidor na rota de lixeira", () => {
  beforeAll(openServer);

  afterAll(closeServer);

  it("inicialmente retorna uma lista de roteiros vazia", () => {

    return getRequest(base_url + "roteiro/lixeira", body => expect(body).toBe("[]"))
      .catch(e => expect(e).toEqual(null));
  })

  it("Remove permanentemente um roteiro", () => {
    let roteiro = {"json":{"id" : "saas", "titulo": "SaaS", "metaAssociada":"saas"}};
    let resposta1 = '{"id":"saas","titulo":"SaaS","metaAssociada":"saas"}';

    return postRequest(roteiroUrl, roteiro, body => expect(body).toEqual(createRotSuccess),
            () => deleteRequest(roteiroUrl+"saas", body => expect(body).toEqual(deleteRotSuccess), 
              () => deleteRequest(lixeiraUrl+"saas", body => expect(body).toEqual(permaDelSuccess), 
                () => getRequest(lixeiraUrl,  body => expect(body).not.toContain(resposta1)))))
            .catch(e => expect(e).toBe(null));
  }) 

  it("Remove permanentemente mais de um roteiro", () => {
    let roteiro1 = {"json":{"id" : "saas", "titulo": "SaaS", "metaAssociada":"saas"}};
    let roteiro2 = {"json":{"id" : "saas2", "titulo": "SaaS2", "metaAssociada":"saas2"}};

    let resposta1 = '{"id":"saas","titulo":"SaaS","metaAssociada":"saas"}';
    let resposta2 = '{"id":"saas2","titulo":"SaaS2","metaAssociada":"saas2"}';

    return postRequest(roteiroUrl, roteiro1, body => expect(body).toEqual(createRotSuccess),
            () => postRequest(roteiroUrl, roteiro2, body => expect(body).toEqual(createRotSuccess),
              () => deleteRequest(roteiroUrl+"saas", body => expect(body).toEqual(deleteRotSuccess),
                () => deleteRequest(roteiroUrl+"saas2", body => expect(body).toEqual(deleteRotSuccess),
                  () => deleteRequest(lixeiraUrl+ "saas,saas2", body => expect(body).toEqual(permaDelSuccess), 
                    () => getRequest(lixeiraUrl, body => {
                      expect(body).not.toContain(resposta1),
                      expect(body).not.toContain(resposta2);
                    }))))))
            .catch(e => expect(e).toBe(null)); 
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
                                    expect(body).toEqual("[]");

                                    return request.get(base_url + "roteiro")
                                        .then(body => {
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

  it("Restaura mais de um roteiro", () => {
    let roteiro = {"json":{"id" : "saasRestore1", "titulo": "SaaS Restore", "metaAssociada":"saas"}};
    let roteiro2 = {"json":{"id" : "saasRestore2", "titulo": "SaaS Restore2", "metaAssociada":"saas2"}};
    let ids = {"json":["saasRestore1", "saasRestore2"]}

    let resposta = '{"id":"saasRestore1","titulo":"SaaS Restore","metaAssociada":"saas"},' +
                   '{"id":"saasRestore2","titulo":"SaaS Restore2","metaAssociada":"saas2"}';

    return request.post(base_url + "roteiro", roteiro)
             .then(body => {
                expect(body).toEqual({success: "O roteiro foi cadastrado com sucesso"});

                return request.post(base_url + "roteiro", roteiro2)
                  .then(body => {
                    expect(body).toEqual({success: "O roteiro foi cadastrado com sucesso"});

                    return request.delete(base_url + "roteiro/saasRestore1")
                      .then(body => {
                        expect(body).toEqual('{"success":"O roteiro foi enviado para a lixeira"}');

                        return request.delete(base_url + "roteiro/saasRestore2")
                          .then(body => {
                            expect(body).toEqual('{"success":"O roteiro foi enviado para a lixeira"}');

                            return request.post(base_url + "roteiro/lixeira/restaurar", ids)
                              .then(body => {
                                expect(body).toEqual({success:"Os roteiros foram restaurados com sucesso"});

                                return(request.get(base_url + "roteiro/lixeira"))
                                  .then(body => {
                                    expect(body).toEqual("[]");

                                    return request.get(base_url + "roteiro")
                                      .then(body => {
                                        expect(body).toContain(resposta);
                                      })
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
})