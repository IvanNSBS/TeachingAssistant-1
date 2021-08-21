import request = require("request-promise");
import { closeServer, openServer } from '../ta-server';
import { postRequest, deleteRequest, getRequest, urls, messages } from "./helpers";

describe("O servidor na rota de roteiros", () => {
  beforeAll(openServer);

  afterAll(closeServer);

  it("inicialmente retorna uma lista de roteiros vazia", () => {

    return getRequest(urls.roteiroUrl, body => expect(body).toBe("[]"))
            .catch(e => expect(e).toEqual(null));
  })

  it("cria roteiro corretamente", () => {
    let roteiro = {"json":{"id" : "saas", "titulo": "SaaS", "metaAssociada":"saas"}};
    let resposta = '{"id":"saas","titulo":"SaaS","metaAssociada":"saas"}';

    return postRequest(urls.roteiroUrl, roteiro, body => expect(body).toEqual(messages.createRotSuccess), 
            () => getRequest(urls.roteiroUrl, body => expect(body).toContain(resposta)))
              .catch(e => expect(e).toBe(null));
  })

  it("nao aceita roteiros duplicados", () => {
    let roteiro = {"json":{"id" : "ger_proj", "titulo": "Gerencia de Projetos", "metaAssociada":"ger_proj"}};
    let roteiro2 = {"json":{"id" : "ger_proj", "titulo": "Gerencia de Projetos 2", "metaAssociada":"ger_proj2"}};
    
    let resposta = '{"id":"ger_proj","titulo":"Gerencia de Projetos","metaAssociada":"ger_proj"}';
    let resposta2 = '{"id":"ger_proj","titulo":"Gerencia de Projetos 2","metaAssociada":"ger_proj2"}';

    return postRequest(urls.roteiroUrl, roteiro, body => expect(body).toEqual(messages.createRotSuccess), 
            () => postRequest(urls.roteiroUrl, roteiro2, body => expect(body).toEqual(messages.createRotFailure), 
              () => getRequest(urls.roteiroUrl, body => {
                expect(body).toContain(resposta);
                expect(body).not.toContain(resposta2);
              })))
              .catch(e => expect(e).toBe(null));
  })

  it("nao aceita roteiros invalido", () => {
    let roteiro = {"json":{"id" : "ger_proj"}};

    return postRequest(urls.roteiroUrl, roteiro, body => expect(body).toEqual(messages.createRotFailure))
            .catch(e => expect(e).toBe(null));
  })

  it("nao cria roteiro se estiver na lixeira", () => {
    let roteiro = {"json":{"id" : "delete_test", "titulo": "Gerencia de Projetos", "metaAssociada":"ger_proj"}};
    let roteiro2 = {"json":{"id" : "delete_test", "titulo": "Gerencia de Projetos 2", "metaAssociada":"ger_proj2"}};
    
    let resposta = '{"id":"delete_test","titulo":"Gerencia de Projetos","metaAssociada":"ger_proj"}';
    let resposta2 = '{"id":"delete_test","titulo":"Gerencia de Projetos 2","metaAssociada":"ger_proj2"}';

    return postRequest(urls.roteiroUrl, roteiro, body => expect(body).toEqual(messages.createRotSuccess), 
            () => deleteRequest(urls.roteiroUrl + "delete_test", body => expect(body).toEqual(messages.deleteRotSuccess), 
              () => postRequest(urls.roteiroUrl, roteiro2, body => expect(body).toEqual(messages.createRotFailure), 
                () => getRequest(urls.roteiroUrl, body => {
                  expect(body).not.toContain(resposta);
                  expect(body).not.toContain(resposta2);
                  }, 
                  () => getRequest(urls.lixeiraUrl, body => expect(body).toContain(resposta))))))
                  .catch(e => expect(e).toBe(null))
  })
})