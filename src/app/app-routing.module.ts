import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'student',
    loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'teacher',
    loadChildren: () => import('./pages/teacher/teacher.module').then(m => m.TeacherModule)
  },
  {
    path: 'authority',
    loadChildren: () => import('./pages/university-authority/university-authority.module').then(m => m.UniversityAuthorityModule)
  },
  {
    path: 'authorisation',
    loadChildren: () => import('./pages/authorisation/authorisation.module').then(m => m.AuthorisationModule)
  },
  {
    path: '',
    redirectTo: 'authorisation',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
