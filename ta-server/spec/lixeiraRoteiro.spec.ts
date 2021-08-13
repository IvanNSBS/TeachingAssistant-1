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

  function expectRoteiroToHaveThisData(roteiro: Roteiro, id: string, titulo: string, meta: string) {
    expect(roteiro.id).toBe(id);
    expect(roteiro.titulo).toBe(titulo);
    expect(roteiro.metaAssociada).toBe(meta);
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

  it("restaura um item da lixeira corretamente", () => {
    cadastrarRoteiro("saas_0", "Software As A Service", "Software As A Service");

    let roteiro = lixeira.restaurarRoteiros(["saas_0"]);
    expect(roteiro.length).toBe(1);
    expectRoteiroToHaveThisData(roteiro[0], "saas_0", "Software As A Service", "Software As A Service")
    expect(roteiro[0].questoes.length).toBe(0);
  })

  it("restaura mais de um item da lixeira corretamente", () => {
    cadastrarRoteiro("saas_0", "Software As A Service", "Software As A Service");
    cadastrarRoteiro("saas_1", "Software As A Service1", "Software As A Service1");

    let roteiro = lixeira.restaurarRoteiros(["saas_0", "saas_1"]);
    expect(roteiro.length).toBe(2);
    expectRoteiroToHaveThisData(roteiro[0], "saas_0", "Software As A Service", "Software As A Service")
    expectRoteiroToHaveThisData(roteiro[1], "saas_1", "Software As A Service1", "Software As A Service1")
    expect(roteiro[0].questoes.length).toBe(0);
    expect(roteiro[1].questoes.length).toBe(0);
  })

  it("Não restaura nada se ID for incorreto", () => {
    cadastrarRoteiro("saas_0", "Software As A Service", "Software As A Service");

    let roteiro = lixeira.restaurarRoteiros(["3", "saas_1"]);
    expect(roteiro.length).toBe(0);
    expect(lixeira.getRoteiros().length).toBe(1);
  })
})