import { NgModule } from '@angular/core';
import { RouterModule, Route, PreloadAllModules }    from '@angular/router';

import { IsLoggedInGuard } from '@app/elements/base/authorisation';

export const APP_ROUTES: Route[] = [

  // App Entry-Point - For now, we mock the normally to include paths such as org and flow selection and go
  //    straight too the default active flow.
  { path: '', redirectTo: `home`, pathMatch: 'full' },

  //
  // AUTH

  {
    path: 'auth',
    loadChildren: () => import('@app/features/app/auth/login').then(m => m.AuthModule),
  },

  {
    path: 'home',
    loadChildren: () => import('@app/features/convs-mgr/home').then(m => m.ConvsMgrHomeModule),
    canActivate: [IsLoggedInGuard]
  },

  {
    path: 'stories',
    loadChildren: () => import('@app/features/convs-mgr/stories/editor').then(m => m.ConvlStoryEditorModule),
    canActivate: [IsLoggedInGuard]
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      APP_ROUTES,
      {
        enableTracing: true,
        // useHash: true,
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
