import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-ticker',
  templateUrl: './add-ticker.component.html',
})
export class AddTickerComponent {
  @Input() inputTicker: string;
  @Input() fullTickersList: string[];
  @Output() addTickerEvent = new EventEmitter<string>();

  promptList: String[] = [];
  isAdded = false;
  isExist = true;

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

  onPromptClick(prompt: HTMLSpanElement) {
    this.inputTicker = prompt.innerText;
    this.promptList = [];
  }

  onAddButtonClick() {
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
