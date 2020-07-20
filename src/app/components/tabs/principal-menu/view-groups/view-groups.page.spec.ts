import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewGroupsPage } from './view-groups.page';

describe('ViewGroupsPage', () => {
  let component: ViewGroupsPage;
  let fixture: ComponentFixture<ViewGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGroupsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
