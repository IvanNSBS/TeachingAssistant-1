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

    return request.post(base_url + "roteiro", roteiro)
             .then(body => {
                expect(body).toEqual({success: "O roteiro foi cadastrado com sucesso"});
                return request.delete(base_url + "roteiro/saas")
                   .then(body => {
                      expect(body).toEqual('{"success":"O roteiro foi enviado para a lixeira"}');
                      return request.delete(base_url + "roteiro/lixeira/saas")
                        .then(body => {
                            expect(body).toEqual('{"success":"Os roteiros foram deletados permanentemente"}');
                        })
                   })
             })
             .catch(err => {
                expect(err).toEqual(null)
             }); 
  }) 
})