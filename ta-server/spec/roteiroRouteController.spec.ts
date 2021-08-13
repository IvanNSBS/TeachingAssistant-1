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
})