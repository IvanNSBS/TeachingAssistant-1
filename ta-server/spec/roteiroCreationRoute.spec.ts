import request = require("request-promise");
import { closeServer, openServer } from '../ta-server';

var base_url = "http://localhost:3000/";

describe("O servidor na rota de roteiros", () => {
  beforeAll(openServer);

  afterAll(closeServer);

  it("inicialmente retorna uma lista de roteiros vazia", () => {
    return request.get(base_url + "roteiro")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("cria roteiro corretamente", () => {
    let roteiro = {"json":{"id" : "saas", "titulo": "SaaS", "metaAssociada":"saas"}};
    let resposta = '{"id":"saas","titulo":"SaaS","metaAssociada":"saas"}';

    return request.post(base_url + "roteiro", roteiro)
             .then(body => {
                expect(body).toEqual({success: "O roteiro foi cadastrado com sucesso"});

                return request.get(base_url + "roteiro")
                  .then(body => {
                    expect(body).toContain(resposta)
                  })
             })
             .catch(err => {
                expect(err).toEqual(null);
             }); 
  })

  it("nao aceita roteiros duplicados", () => {
    let roteiro = {"json":{"id" : "ger_proj", "titulo": "Gerencia de Projetos", "metaAssociada":"ger_proj"}};
    let roteiro2 = {"json":{"id" : "ger_proj", "titulo": "Gerencia de Projetos 2", "metaAssociada":"ger_proj2"}};
    
    let resposta = '{"id":"ger_proj","titulo":"Gerencia de Projetos","metaAssociada":"ger_proj"}';
    let resposta2 = '{"id":"ger_proj","titulo":"Gerencia de Projetos 2","metaAssociada":"ger_proj2"}';

    return request.post(base_url + "roteiro", roteiro)
             .then(body => {
                expect(body).toEqual({success: "O roteiro foi cadastrado com sucesso"});

                return request.post(base_url + "roteiro", roteiro2)
                  .then(body => {
                    expect(body).toEqual({failure: 'O roteiro não pode ser cadastrado'})

                    return request.get(base_url + "roteiro")
                    .then(body => {
                      expect(body).toContain(resposta);
                      expect(body).not.toContain(resposta2)
                    })
                  })
             })
             .catch(err => {
                expect(err).toEqual(null);
             }); 
  })
})