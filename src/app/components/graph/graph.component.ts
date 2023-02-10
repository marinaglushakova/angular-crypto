import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TickerPriceService } from '../../services/ticker-price.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
})
export class GraphComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() tickerToShow: string;
  @Output() closeGraphEvent = new EventEmitter();
  @ViewChild('graph') graphDiv: ElementRef;
  @ViewChild('column') columnDiv: ElementRef;
  graphArray: number[] = [];
  normalizedGraph: number[] = [];
  subscription: Subscription;
  maxGraphElements = 1;

  constructor(private tickerPriceService: TickerPriceService) {}

  ngOnChanges(changes: { tickerToShow: SimpleChange }): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.graphArray = [];
    this.showGraph();
  }

  ngAfterViewInit(): void {
    this.calculateMaxGraphElements();
    window.addEventListener('resize', this.calculateMaxGraphElements);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.calculateMaxGraphElements);
    this.subscription.unsubscribe();
  }

  onCloseGraphClick(): void {
    this.subscription.unsubscribe();
    this.closeGraphEvent.emit();
  }

  showGraph(): void {
    this.subscription = this.tickerPriceService
      .getPrice(this.tickerToShow)
      .subscribe((price: number) => {
        this.graphArray.push(price);
        this.normalizeGraph();
        while (this.graphArray.length > this.maxGraphElements) {
          this.graphArray.shift();
        }
      });
  }

  normalizeGraph(): void {
    const maxValue = Math.max(...this.graphArray);
    const minValue = Math.min(...this.graphArray);

    if (maxValue === minValue) {
      this.normalizedGraph = this.graphArray.map(() => 50);
      return;
    }

    this.normalizedGraph = this.graphArray.map(
      (price) => 5 + ((price - minValue) * 95) / (maxValue - minValue)
    );
  }

  calculateMaxGraphElements(): void {
    const graphWidth = this.graphDiv?.nativeElement.clientWidth;
    const columnWidth = this.columnDiv?.nativeElement.clientWidth ?? 38;

    this.maxGraphElements = graphWidth / columnWidth;
  }
}
