import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoPollsPage } from './do-poll.page';

describe('DoPollsPage', () => {
  let component: DoPollsPage;
  let fixture: ComponentFixture<DoPollsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoPollsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoPollsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
