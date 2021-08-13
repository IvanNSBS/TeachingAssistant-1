import { Roteiro } from '../../../common/src/roteiros/roteiro';

export class LixeiraRoteiros {
  roteiros: Roteiro[] = [];

  constructor(){
    for(let i = 0; i < 10; i++){
      this.roteiros.push(new Roteiro(i.toString(), i.toString(), i.toString()))
    }
  }

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

  getRoteiros(): Roteiro[] {
    return this.roteiros;
  }
}