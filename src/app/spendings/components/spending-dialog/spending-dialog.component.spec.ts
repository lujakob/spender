import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingDialogComponent } from './spending-dialog.component';

describe('SpendingDialogComponent', () => {
  let component: SpendingDialogComponent;
  let fixture: ComponentFixture<SpendingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
