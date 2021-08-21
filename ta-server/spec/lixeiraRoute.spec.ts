import { json } from "body-parser";
import { get } from "request-promise";
import request = require("request-promise");
import { closeServer, openServer } from '../ta-server';
import { getRequest, postRequest, deleteRequest, urls, messages } from "./helpers";

var base_url = "http://localhost:3000/";


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

    return postRequest(urls.roteiroUrl, roteiro, body => expect(body).toEqual(messages.createRotSuccess),
            () => deleteRequest(urls.roteiroUrl+"saas", body => expect(body).toEqual(messages.deleteRotSuccess), 
              () => deleteRequest(urls.lixeiraUrl+"saas", body => expect(body).toEqual(messages.permaDelSuccess), 
                () => getRequest(urls.lixeiraUrl,  body => expect(body).not.toContain(resposta1)))))
            .catch(e => expect(e).toBe(null));
  }) 

  it("Remove permanentemente mais de um roteiro", () => {
    let roteiro1 = {"json":{"id" : "saas", "titulo": "SaaS", "metaAssociada":"saas"}};
    let roteiro2 = {"json":{"id" : "saas2", "titulo": "SaaS2", "metaAssociada":"saas2"}};

    let resposta1 = '{"id":"saas","titulo":"SaaS","metaAssociada":"saas"}';
    let resposta2 = '{"id":"saas2","titulo":"SaaS2","metaAssociada":"saas2"}';

    return postRequest(urls.roteiroUrl, roteiro1, body => expect(body).toEqual(messages.createRotSuccess),
            () => postRequest(urls.roteiroUrl, roteiro2, body => expect(body).toEqual(messages.createRotSuccess),
              () => deleteRequest(urls.roteiroUrl+"saas", body => expect(body).toEqual(messages.deleteRotSuccess),
                () => deleteRequest(urls.roteiroUrl+"saas2", body => expect(body).toEqual(messages.deleteRotSuccess),
                  () => deleteRequest(urls.lixeiraUrl+ "saas,saas2", body => expect(body).toEqual(messages.permaDelSuccess), 
                    () => getRequest(urls.lixeiraUrl, body => {
                      expect(body).not.toContain(resposta1),
                      expect(body).not.toContain(resposta2);
                    }))))))
            .catch(e => expect(e).toBe(null)); 
  }) 

  it("Restaura um roteiro", () => {
    let roteiro = {"json":{"id" : "saasRestore", "titulo": "SaaS Restore", "metaAssociada":"saas"}};
    let ids = {"json":["saasRestore"]}

    let resposta = '{"id":"saasRestore","titulo":"SaaS Restore","metaAssociada":"saas"}';

    return postRequest(urls.roteiroUrl, roteiro, body => expect(body).toEqual(messages.createRotSuccess), 
            () => deleteRequest(urls.roteiroUrl+"saasRestore", body => expect(body).toEqual(messages.deleteRotSuccess), 
              () => postRequest(urls.lixeiraUrl+"restaurar", ids, body => expect(body).toEqual(messages.restoreSuccess), 
                () => getRequest(urls.lixeiraUrl, body => expect(body).toEqual("[]"), 
                  () => getRequest(urls.roteiroUrl, body => expect(body).toContain(resposta))))))
      .catch(e => expect(e).toBe(null)) 
  }) 

  it("Restaura mais de um roteiro", () => {
    let roteiro = {"json":{"id" : "saasRestore1", "titulo": "SaaS Restore", "metaAssociada":"saas"}};
    let roteiro2 = {"json":{"id" : "saasRestore2", "titulo": "SaaS Restore2", "metaAssociada":"saas2"}};
    let ids = {"json":["saasRestore1", "saasRestore2"]}

    let resposta = '{"id":"saasRestore1","titulo":"SaaS Restore","metaAssociada":"saas"},' +
                   '{"id":"saasRestore2","titulo":"SaaS Restore2","metaAssociada":"saas2"}';

    return postRequest(urls.roteiroUrl, roteiro, body => expect(body).toEqual(messages.createRotSuccess), 
            () => postRequest(urls.roteiroUrl, roteiro2, body => expect(body).toEqual(messages.createRotSuccess, 
              () => deleteRequest(urls.roteiroUrl+"saasRestore1", body => expect(body).toEqual(messages.deleteRotSuccess), 
                () => deleteRequest(urls.roteiroUrl+"saasRestore2", body => expect(body).toEqual(messages.deleteRotSuccess),  
                  () => postRequest(urls.lixeiraUrl+"restaurar", ids, body => expect(body).toEqual(messages.restoreSuccess), 
                    () => getRequest(urls.lixeiraUrl, body => expect(body).toEqual("[]"), 
                      () => getRequest(urls.roteiroUrl, body => expect(body).toContain(resposta)))))))))
            .catch(e => expect(e).toBe(null));
  }) 
})