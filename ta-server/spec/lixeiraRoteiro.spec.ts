import { LixeiraRoteiros } from "../routes/roteiros/lixeiraRoteiros";
import { Roteiro } from "../../common/src/roteiros/roteiro";

describe("A lixeira de roteiros", () => {
  var lixeira: LixeiraRoteiros = new LixeiraRoteiros();

  function cadastrarRoteiro(id:string, titulo:string, metaAssociada:string) {
    let roteiro = new Roteiro(id, titulo, metaAssociada);
    if(roteiro !== undefined)
      lixeira.enviarParaLixeira(roteiro);
  }

  function expectSoUmRoteiro() {
    expect(lixeira.getRoteiros().length).toBe(1);
    var roteiro = lixeira.getRoteiros()[0];
    return roteiro;
  }

  beforeEach(() => lixeira = new LixeiraRoteiros())

  it("é inicialmente vazio", () => {
    expect(lixeira.getRoteiros().length).toBe(0);
  })

  it("envia roteiros para lixeira corretamente", () => {
    cadastrarRoteiro("saas_0", "Software As A Service", "Software As A Service");

    var roteiro = expectSoUmRoteiro();
    expect(roteiro.id).toBe("saas_0");
    expect(roteiro.titulo).toBe("Software As A Service");
    expect(roteiro.metaAssociada).toBe("Software As A Service");
    expect(roteiro.questoes.length).toBe(0);
  })

  it("restaura da lixeira corretamente", () => {
    cadastrarRoteiro("saas_0", "Software As A Service", "Software As A Service");

    let roteiro = lixeira.restaurarDaLixeira("saas_0");
    expect(roteiro.id).toBe("saas_0");
    expect(roteiro.titulo).toBe("Software As A Service");
    expect(roteiro.metaAssociada).toBe("Software As A Service");
    expect(roteiro.questoes.length).toBe(0);
  })

})