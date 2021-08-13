import { Roteiro } from '../../../common/src/roteiros/roteiro';

export class LixeiraRoteiros {
  roteiros: Roteiro[] = [];

  enviarParaLixeira(roteiro: Roteiro): Roteiro {
    this.roteiros.push(roteiro)
    return roteiro;
  }

  restaurarDaLixeira(roteiroId: string): Roteiro {
    let roteiroIdx = this.roteiros.findIndex(rot => rot.id == roteiroId);
    if(roteiroIdx !== -1){
        let roteiro = this.roteiros[roteiroIdx];
        this.roteiros.splice(roteiroIdx, 1);

        return roteiro;
    }

    return undefined;
  }

  deletarPermanentemente(roteiroIds: string[]): boolean {
    let filteredRoteiros = this.roteiros.filter(rot => !this.containsKey(roteiroIds, rot.id));
    if(filteredRoteiros.length == this.roteiros.length - roteiroIds.length){
      this.roteiros = filteredRoteiros;
      return true;
    }

    return false;
  }

  private containsKey(keyList: string[], key: string): boolean{
    return keyList.findIndex(k => k == key) !== -1;
  }

  getRoteiros(): Roteiro[] {
    return this.roteiros;
  }
}