import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleViewerComponent } from './rule-viewer.component';

describe('RuleViewerComponent', () => {
  let component: RuleViewerComponent;
  let fixture: ComponentFixture<RuleViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuleViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
