import { Timer } from './timer';
import { State } from './state';

@Component({
  selector: 'app-chrono',
  templateUrl: './chrono.component.html',
  styleUrls: ['./app.component.scss']
})
export class ChronoComponent {
  title = 'app works!';
  public _btnPlay: string = 'Start';
  public _timer: Timer = new Timer();
  public _state: State = new State();
  play(){
    this._timer.start();
    this._state.setPlay();
    this._btnPlay = ">";
  }
  stop(){
    this._timer.stop();
    this._state.setStop();
  }
  backward(){
    this._timer.reset();
    this._state.setBackward();
    this._btnPlay = 'Start';
  }
  }
