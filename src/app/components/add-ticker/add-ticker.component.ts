import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ApplicationRef,
  OnInit,
} from '@angular/core';
import { TickersService } from 'src/app/services/tickers.service';

@Component({
  selector: 'app-add-ticker',
  templateUrl: './add-ticker.component.html',
})
export class AddTickerComponent implements OnInit, AfterViewInit {
  @Input() inputTicker: string;
  @Output() addTickerEvent = new EventEmitter<string>();
  @ViewChild('input') inputField: ElementRef;

  fullTickersList: string[] = [];
  promptList: String[] = [];
  isExist = true;
  isAdded = false;

  constructor(
    private tickersService: TickersService,
    private applicationRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.tickersService.getAll().subscribe((tickers: string[]) => {
      this.fullTickersList = tickers;
    });
  }

  ngAfterViewInit(): void {
    this.inputField.nativeElement.focus();
  }

  onInput(event: InputEvent): void {
    this.isExist = true;
    this.isAdded = false;

    const inputText = event.toString().toUpperCase();
    if (!inputText) {
      this.clearState();
      return;
    }
    this.promptList = this.fullTickersList.filter((name) =>
      name.includes(inputText)
    );
  }

  onEnter(): void {
    this.addTicker();
  }

  onAddButtonClick(): void {
    this.addTicker();
  }

  onPromptClick(prompt: HTMLSpanElement): void {
    this.inputTicker = prompt.innerText;
    this.inputField.nativeElement.focus();
  }

  addTicker(): void {
    if (!this.inputTicker) return;
    this.isExist = this.checkIfTickerExists();
    this.isExist && this.addTickerEvent.emit(this.inputTicker);
    this.applicationRef.tick();

    if (this.isAdded) return;
    this.clearState();
  }

  checkIfTickerExists(): boolean {
    return (
      this.fullTickersList.filter(
        (name) => name === this.inputTicker.toString().toUpperCase()
      ).length > 0
    );
  }

  clearState(): void {
    this.inputTicker = '';
    this.promptList = [];
    this.isAdded = false;
    this.isExist = true;
  }
}
