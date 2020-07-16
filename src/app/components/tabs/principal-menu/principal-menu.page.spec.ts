import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrincipalMenuPage } from './principal-menu.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';

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
