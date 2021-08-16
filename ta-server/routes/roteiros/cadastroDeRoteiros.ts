import { Roteiro } from '../../../common/src/roteiros/roteiro';

export class CadastroDeRoteiros {
  roteiros: Roteiro[] = [];

  cadastrar(roteiro: Roteiro): Roteiro {
    let roteiroNaoRegistrado: boolean = !this.roteiros.find(rot => rot.id == roteiro.id);
    let roteiroNaoPossuiCamposVazios: boolean = roteiro.id !== "" && roteiro.titulo !== "" && roteiro.metaAssociada !== ""; 
    let roteiroEhValido = roteiroNaoRegistrado && roteiroNaoPossuiCamposVazios;

    if(roteiroEhValido){
      this.roteiros.push(roteiro)
      return roteiro;
    }

    return undefined;
  }

  roteiroNaoCadastrado(id: string): boolean {
    let index = this.roteiros.findIndex(a => a.id == id);
    return index != -1;
  }

  atualizar(roteiro: Roteiro): Roteiro {
    var result: Roteiro = this.roteiros.find(a => a.id == roteiro.id);
    //console.log(result);
    if(result){
      result = Object.assign(result,roteiro);
    }
    return result;
  }

  remover(id: string): Roteiro | undefined {
    var previousSize: number = this.roteiros.length;    

    let deletedRoteiro = this.roteiros.find(a => a.id === id);
    this.roteiros = this.roteiros.filter(a => a.id !== id)
    
    var newSize: number = this.roteiros.length;

    return deletedRoteiro;
  }

  getRoteiros(): Roteiro[] {
    return this.roteiros;
  }

  getRoteiro(id: string){
    return this.roteiros.find(a => a.id === id);
  }
}