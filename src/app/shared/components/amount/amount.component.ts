import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amount',
  template: `{{(amount  / 100) | currency:'EUR':'symbol': '1.2-2':'de-DE'}}`
})
export class AmountComponent {
  @Input() amount = 0;
}
