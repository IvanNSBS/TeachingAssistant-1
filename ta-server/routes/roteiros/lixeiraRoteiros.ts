import { Roteiro } from '../../../common/src/roteiros/roteiro';

export class LixeiraRoteiros {
  roteiros: Roteiro[] = [];

  enviarParaLixeira(roteiro: Roteiro): Roteiro {
    this.roteiros.push(roteiro)
    return roteiro;
  }

  deletarPermanentemente(roteiroIds: string[]): boolean {
    let filteredRoteiros = this.roteiros.filter(rot => !this.containsKey(roteiroIds, rot.id));
    if(filteredRoteiros.length == this.roteiros.length - roteiroIds.length){
      this.roteiros = filteredRoteiros;
      return true;
    }

    return false;
  }

  restaurarRoteiros(roteiroIds: string[]): Roteiro[] {
    let filtered = this.roteiros.filter(rot => !this.containsKey(roteiroIds, rot.id));
    let removed = this.roteiros.filter(rot => this.containsKey(roteiroIds, rot.id));

    this.roteiros = filtered;
    return removed;
  }

  private containsKey(keyList: string[], key: string): boolean{
    return keyList.findIndex(k => k == key) !== -1;
  }

  getRoteiros(): Roteiro[] {
    return this.roteiros;
  }
}