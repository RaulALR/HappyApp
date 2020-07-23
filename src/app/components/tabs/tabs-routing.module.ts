import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'principal-menu',
        loadChildren: () => import('./principal-menu/principal-menu.module').then(m => m.PrincipalMenuModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'create-poll',
        loadChildren: () => import('./principal-menu/create-poll/create-poll.module').then(m => m.CreatePollModule)
      },
      {
        path: 'create-group',
        loadChildren: () => import('./principal-menu/create-group/create-group.module').then(m => m.CreateGroupModule)
      },
      {
        path: 'view-groups',
        loadChildren: () => import('./principal-menu/view-groups/view-groups.module').then(m => m.ViewGroupsModule)
      },
      {
        path: 'view-polls',
        loadChildren: () => import('./principal-menu/view-poll/view-poll.module').then(m => m.ViewPollsModule)
      },
      {
        path: 'do-poll',
        loadChildren: () => import('./principal-menu/do-poll/do-poll.module').then(m => m.DoPollsModule)
      },
      {
        path: '',
        redirectTo: '/tabs/principal-menu',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/principal-menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
