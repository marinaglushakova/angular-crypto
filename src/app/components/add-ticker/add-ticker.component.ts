import { Component, Input } from '@angular/core';
import { tickers as data } from 'src/app/data/tickers';

@Component({
  selector: 'app-add-ticker',
  templateUrl: './add-ticker.component.html',
})
export class AddTickerComponent {
  @Input() inputTicker: string;
  tickersList: String[] = data;
  promptList: String[] = [];
  isAdded = false;

  onInput(event: InputEvent) {
    const inputText = event.toString().toUpperCase();
    if (!inputText) {
      this.promptList = [];
      return;
    }
    this.promptList = this.tickersList.filter((name) =>
      name.includes(inputText)
    );
  }

  onPromptClick(prompt: HTMLSpanElement) {
    console.log(prompt.innerText);
    this.inputTicker = prompt.innerText;
  }
}
