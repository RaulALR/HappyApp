import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PrincipalMenuPage } from './principal-menu.page';

describe('PrincipalMenuPage', () => {
  let component: PrincipalMenuPage;
  let fixture: ComponentFixture<PrincipalMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipalMenuPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PrincipalMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
