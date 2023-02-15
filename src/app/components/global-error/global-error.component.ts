import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styles: [],
})
export class GlobalErrorComponent implements OnInit {
  constructor(public errorService: ErrorService) {}

  ngOnInit(): void {}
}
