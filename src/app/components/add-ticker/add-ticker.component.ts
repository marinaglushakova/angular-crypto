import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { TickersService } from 'src/app/services/tickers.service';
import { AddedTickersService } from 'src/app/services/added-tickers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-ticker',
  templateUrl: './add-ticker.component.html',
})
export class AddTickerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() inputTicker: string;
  @Output() addTickerEvent = new EventEmitter<string>();
  @ViewChild('input') inputField: ElementRef;

  fullTickersList: string[] = [];
  promptList: String[] = [];
  isNotExist = false;
  isAdded = false;
  subscription: Subscription;

  constructor(
    private tickersService: TickersService,
    public addedTickersService: AddedTickersService
  ) {}

  ngOnInit(): void {
    this.subscription = this.tickersService
      .getAll()
      .subscribe((tickers: string[]) => {
        this.fullTickersList = tickers;
      });
  }

  ngAfterViewInit(): void {
    this.inputField.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onInput(event: InputEvent): void {
    this.isNotExist = false;
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

    this.isNotExist = !this.checkIfTickerExists();
    this.isAdded = this.addedTickersService.checkIfAdded(this.inputTicker);

    if (this.isAdded || this.isNotExist) {
      return;
    }
    this.addTickerEvent.emit(this.inputTicker);
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
    this.isNotExist = false;
    this.isAdded = false;
  }
}
