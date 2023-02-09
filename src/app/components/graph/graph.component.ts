import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
})
export class GraphComponent implements OnChanges {
  @Input() tickerToShow: string;
  @Output() closeGraphEvent = new EventEmitter();

  ngOnChanges(changes: { tickerToShow: SimpleChange }) {
    console.log(this.tickerToShow);
  }

  onCloseGraphClick() {
    this.closeGraphEvent.emit();
  }
}
