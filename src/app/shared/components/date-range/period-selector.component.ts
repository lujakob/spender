import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy, OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
moment.locale('de');

const defaultRangeStart = '2020-07';

interface Period {
  title: string;
  value: string;
}

export type Range = 'month' | 'year';

@Component({
  selector: 'app-period-selector',
  templateUrl: './period-selector.component.html',
  styleUrls: ['./period-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodSelectorComponent implements OnInit, OnDestroy {
  options: Period[];
  selected: number;
  selectedIsFirst: boolean;
  selectedIsLast: boolean;
  private subs: Subscription;

  @Input() range: Range = 'month';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.setOptions();

  }

  onPrev() {
    if (this.selected > 0) {
      this.selected--;
      this.onSelect();
    }
  }

  onNext() {
    if (this.selected < this.options.length - 1) {
      this.selected++;
      this.onSelect();
    }
  }

  onSelect() {
    const period = this.options[this.selected].value;
    this.router.navigate(['./', { period }], {
      relativeTo: this.route,
    });
    this.setFirstLast();
  }

  setFirstLast() {
    this.selectedIsFirst = this.selected === 0;
    this.selectedIsLast = this.selected === this.options.length - 1;
  }

  setOptions() {
    this.options = this.buildRangeOption();
    const targetIndex = this.options.findIndex((o) => o.value === this.route.snapshot.params['period']);
    this.selected = targetIndex >= 0 ? targetIndex : this.options.length - 1;
    this.setFirstLast();
  }

  buildRangeOption(): Period[] {
    const createdMom = moment(defaultRangeStart).startOf(this.range);
    const nowMom = moment().startOf(this.range);
    const options = [];
    let diff = 0;

    const titleFormat = this.range === 'month' ? 'MMMM YYYY' : 'YYYY';
    const valueFormat = this.range === 'month' ? 'YYYY-MM' : 'YYYY';

    while (diff >= 0) {
      options.push({
        title: createdMom.format(titleFormat),
        value: createdMom.format(valueFormat)
      });
      createdMom.add(1, <moment.unitOfTime.DurationConstructor>this.range);
      diff = nowMom.diff(createdMom, this.range);
    }
    return options;
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
