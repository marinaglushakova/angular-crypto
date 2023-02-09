import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-add-ticker',
  templateUrl: './add-ticker.component.html',
})
export class AddTickerComponent implements AfterViewInit {
  @Input() inputTicker: string;
  @Input() fullTickersList: string[];
  @Output() addTickerEvent = new EventEmitter<string>();
  @ViewChild('input') inputField: ElementRef;

  promptList: String[] = [];
  isAdded = false;
  isExist = true;

  ngAfterViewInit() {
    this.inputField.nativeElement.focus();
  }

  onInput(event: InputEvent) {
    const inputText = event.toString().toUpperCase();
    if (!inputText) {
      this.clearState();
      return;
    }
    this.promptList = this.fullTickersList.filter((name) =>
      name.includes(inputText)
    );
  }

  onEnter() {
    this.addTicker();
  }

  onAddButtonClick() {
    this.addTicker();
  }

  onPromptClick(prompt: HTMLSpanElement) {
    this.inputTicker = prompt.innerText;
    this.inputField.nativeElement.focus();
  }

  addTicker() {
    if (!this.inputTicker) return;
    this.isExist = this.checkIfTickerExists();
    this.isExist && this.addTickerEvent.emit(this.inputTicker);
    this.clearState();
  }

  checkIfTickerExists(): boolean {
    return (
      this.fullTickersList.filter(
        (name) => name === this.inputTicker.toString().toUpperCase()
      ).length > 0
    );
  }

  clearState() {
    this.inputTicker = '';
    this.promptList = [];
    this.isAdded = false;
    this.isExist = true;
  }
}
