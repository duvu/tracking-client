import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertProfileComponent } from 'app/main/administration/alert-profile/alert-profile.component';

const routes: Routes = [
    {
        path: '',
        component: AlertProfileComponent,
        children:[
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlertProfileRoutingModule { }
