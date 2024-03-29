import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ApplicationContext} from 'app/application-context';
import {AuthResponse} from 'app/models/auth.response';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
    accountName: string;

    constructor(private app: ApplicationContext, private router: Router) {}

    ngOnInit() {
        this.accountName = this.app.accountName;
    }

    ngOnDestroy(): void {
    }

    logout() {
        this.app.logout();
        this.router.navigate(['/login']);
    }

}
