import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from 'app/main/administration/contact/contact.component';

const routes: Routes = [
    {
        path: '',
        component: ContactComponent,
        children:[
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule { }
