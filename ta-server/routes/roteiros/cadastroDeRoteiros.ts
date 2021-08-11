import { Roteiro } from '../../../common/src/roteiros/roteiro';

export class CadastroDeAlunos {
  roteiros: Roteiro[] = [];

  constructor(){
    for(let i = 0; i < 10; i++){
      this.roteiros.push(new Roteiro(`roteiro_${i}`, `roteiro_${i}`, `meta_${i}`))
    }
  }

  cadastrar(roteiros: Roteiro): Roteiro {
    var result = null;
    return result;
  }

  roteiroNaoCadastrado(id: string): boolean {
    let index = this.roteiros.findIndex(a => a.id == id);
    return index != -1;
  }

  atualizar(roteiro: Roteiro): Roteiro {
    var result: Roteiro = this.roteiros.find(a => a.id == roteiro.id);
    return result;
  }

  remover(id: string): boolean {
    var previousSize: number = this.roteiros.length;    
    this.roteiros = this.roteiros.filter(a => a.id != id)
    var newSize: number = this.roteiros.length;
    
    return newSize != previousSize;
  }

  getRoteiros(): Roteiro[] {
    return this.roteiros;
  }
}