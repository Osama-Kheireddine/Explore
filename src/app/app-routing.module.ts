import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//ANGULARFIRE GUARDS
import {redirectUnauthorizedTo, redirectLoggedInTo, canActivate} from '@angular/fire/auth-guard';
//consts to use the the redirects
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedIn = () => redirectLoggedInTo(['home']);
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedIn)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
   },
  {
    path: 'post',
    loadChildren: () => import('./pages/post/post.module').then( m => m.PostPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'review',
    loadChildren: () => import('./pages/review/review.module').then( m => m.ReviewPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./userPosts/reviews/reviews.module').then( m => m.ReviewsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'detailed-review',
    loadChildren: () => import('./userPosts/detailed-review/detailed-review.module').then( m => m.DetailedReviewPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'user-photos',
    loadChildren: () => import('./userPosts/user-photos/user-photos.module').then( m => m.UserPhotosPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'detailed-image',
    loadChildren: () => import('./userPosts/detailed-image/detailed-image.module').then( m => m.DetailedImagePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'track-trail',
    loadChildren: () => import('./pages/track-trail/track-trail.module').then( m => m.TrackTrailPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'view-your-trails',
    loadChildren: () => import('./userPosts/view-your-trails/view-your-trails.module').then( m => m.ViewYourTrailsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'detailed-user-trail',
    loadChildren: () => import('./userPosts/detailed-user-trail/detailed-user-trail.module').then( m => m.DetailedUserTrailPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'view-all-reviews',
    loadChildren: () => import('./pages/view-all-reviews/view-all-reviews.module').then( m => m.ViewAllReviewsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
