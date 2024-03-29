import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule} from '@angular/common';
import { LoginComponent} from 'app/pages/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { MaterialShared} from 'app/shared/material-shared';
import { AuthInterceptor} from 'app/interceptors/auth-interceptor';
import { ApplicationContext} from 'app/application-context';
import { AppComponent } from 'app/app.component';
import { AppRoutingModule} from 'app/app-routing.module';
import { AuthService} from 'app/services/auth.service';
import { AuthGuard} from 'app/guards/auth.guard';
import { NotFoundComponent } from 'app/pages/not-found/not-found.component';
import { SpinnerComponent } from './pages/spinner/spinner.component';
import { ErrorComponent } from './pages/error/error.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent,
        SpinnerComponent,
        ErrorComponent,
        ForgotPasswordComponent,
        RegisterComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,

        MaterialShared,

        AppRoutingModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        ApplicationContext,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    entryComponents: [
        SpinnerComponent
    ],

    bootstrap: [AppComponent],
})
export class AppModule { }
