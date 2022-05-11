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
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    ...canActivate(redirectLoggedIn)
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
  {
    path: 'all-location-trails',
    loadChildren: () => import('./pages/all-location-trails/all-location-trails.module').then( m => m.AllLocationTrailsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'all-location-reviews',
    loadChildren: () => import('./pages/all-location-reviews/all-location-reviews.module').then( m => m.AllLocationReviewsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule),
    ...canActivate(redirectLoggedIn)
  },
  {
    path: 'photos',
    loadChildren: () => import('./pages/photos/photos.module').then( m => m.PhotosPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'all-location-photos',
    loadChildren: () => import('./pages/all-location-photos/all-location-photos.module').then( m => m.AllLocationPhotosPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'map-modal',
    loadChildren: () => import('./pages/map-modal/map-modal.module').then( m => m.MapModalPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'map-trail-modal',
    loadChildren: () => import('./pages/map-trail-modal/map-trail-modal.module').then( m => m.MapTrailModalPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
