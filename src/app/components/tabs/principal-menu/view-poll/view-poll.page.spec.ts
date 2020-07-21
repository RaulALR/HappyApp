import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPollsPage } from './view-poll.page';

describe('ViewPollsPage', () => {
  let component: ViewPollsPage;
  let fixture: ComponentFixture<ViewPollsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPollsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPollsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
