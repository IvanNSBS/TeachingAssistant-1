import { CadastroDeRoteiros } from "../routes/roteiros/cadastroDeRoteiros";
import { Roteiro } from "../../common/src/roteiros/roteiro";

describe("O cadastro de roteiros", () => {
  var cadastro: CadastroDeRoteiros;

  function cadastrarRoteiro(id:string, titulo:string, metaAssociada:string) {
    let roteiro = new Roteiro(id, titulo, metaAssociada);
    if(roteiro !== undefined)
      cadastro.cadastrar(roteiro);
  }

  function expectSoUmRoteiro() {
    expect(cadastro.getRoteiros().length).toBe(1);
    var roteiro = cadastro.getRoteiros()[0];
    return roteiro;
  }

  beforeEach(() => cadastro = new CadastroDeRoteiros())

  it("é inicialmente vazio", () => {
    expect(cadastro.getRoteiros().length).toBe(0);
  })

  it("cadastra roteiros corretamente", () => {
    cadastrarRoteiro("saas_0", "Software As A Service", "Software As A Service");

    var roteiro = expectSoUmRoteiro();
    expect(roteiro.id).toBe("saas_0");
    expect(roteiro.titulo).toBe("Software As A Service");
    expect(roteiro.metaAssociada).toBe("Software As A Service");
    expect(roteiro.questoes.length).toBe(0);
  })

  it("não aceita roteiros com ID duplicado", () => {
    cadastrarRoteiro("saas_0", "Software As A Service", "Software As A Service");
    cadastrarRoteiro("saas_0", "Software As A Service 2", "Software As A Service 2");

    var roteiro = expectSoUmRoteiro();
    expect(roteiro.id).toBe("saas_0");
    expect(roteiro.titulo).toBe("Software As A Service");
  })

  it("não aceita os algum campo vazio", () => {
    cadastrarRoteiro("", "", "Software As A Service");
    expect(cadastro.getRoteiros().length).toBe(0);
  })
})