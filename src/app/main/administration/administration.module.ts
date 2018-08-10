import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from 'app/main/administration/administration.component';
import { AccountComponent } from 'app/main/administration/account/account.component';
import { DeviceComponent } from 'app/main/administration/device/device.component';
import { AdministrationRoutingModule} from 'app/main/administration/administration-routing.module';
import { MaterialShared} from 'app/shared/material-shared';
import { AccountService} from 'app/services/account.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddEditAccountComponent } from 'app/main/administration/account/add-edit-account/add-edit-account.component';
import { OptionalColumnAccountComponent } from 'app/main/administration/account/optional-column-account/optional-column-account.component';
import { OptionalColumnDeviceComponent } from 'app/main/administration/device/optional-column-device/optional-column-device.component';
import { AddEditDeviceComponent } from 'app/main/administration/device/add-edit-device/add-edit-device.component';
import { DeviceService } from 'app/services/device.service';
import { CompanyComponent } from './company/organization.component';
import { CompanyService } from 'app/services/organization.service';
import { PrivilegeService} from 'app/services/privilege.service';
import { CustomDirectivesModule } from 'app/directives/custom-directives.module';
import { AddEditOrganizationComponent } from 'app/main/administration/company/add-edit-organization/add-edit-organization.component';
import { OptionalColumnOrganizationComponent } from 'app/main/administration/company/optional-column-organization/optional-column-organization.component';
import { PrivilegeComponent } from 'app/main/administration/privilege/privilege.component';
import { CustomPipeModule } from 'app/pipes/custom-pipe.module';
import { DcsComponent } from './dcs/dcs.component';
import { DcsService } from 'app/services/dcs.service';
import { AddEditDcsComponent } from './dcs/add-edit-dcs/add-edit-dcs.component';
import { OptionalColumnPrivilegeComponent } from 'app/main/administration/privilege/optional-column-privilege/optional-column-privilege.component';
import { AddEditPrivilegeComponent } from 'app/main/administration/privilege/add-edit-privilege/add-edit-privilege.component';

@NgModule({
    imports: [
        CustomPipeModule,
        CommonModule,
        MaterialShared,
        FormsModule,
        CustomDirectivesModule,
        ReactiveFormsModule,
        AdministrationRoutingModule
    ],
    declarations: [
        AdministrationComponent,
        AccountComponent,
        CompanyComponent,
        DeviceComponent,
        PrivilegeComponent,
        DcsComponent,

        AddEditDeviceComponent,
        AddEditPrivilegeComponent,
        AddEditOrganizationComponent,
        AddEditAccountComponent,
        AddEditDcsComponent,

        OptionalColumnDeviceComponent,
        OptionalColumnAccountComponent,
        OptionalColumnOrganizationComponent,
        OptionalColumnPrivilegeComponent,
    ],
    providers: [
        CompanyService,
        AccountService,
        DeviceService,
        PrivilegeService,
        DcsService
    ],
    entryComponents: [
        AddEditAccountComponent,
        AddEditDeviceComponent,
        AddEditDcsComponent,
        AddEditOrganizationComponent,
        AddEditPrivilegeComponent,
        OptionalColumnAccountComponent,
        OptionalColumnDeviceComponent,
        OptionalColumnOrganizationComponent,
        OptionalColumnPrivilegeComponent
    ]
})
export class AdministrationModule { }
