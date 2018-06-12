import { Injectable } from '@angular/core';
import { sounds } from './sounds';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private base64Header = 'data:audio/wav;base64,';

  private play(sound: string) {
    const snd = new Audio(`${this.base64Header}${sound}`);
    snd.play();
  }

  beep() {
    return this.play(sounds.beep);
  }

  gameOver() {
    return this.play(sounds.gameOver);
  }
}
