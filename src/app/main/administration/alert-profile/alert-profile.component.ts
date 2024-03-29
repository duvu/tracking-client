import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AddEditAlertProfileComponent } from 'app/main/administration/alert-profile/add-edit-alert-profile/add-edit-alert-profile.component';
import { AlertProfileRequest } from 'app/models/request/alert-profile.request';
import { AlertProfileService } from 'app/services/alert-profile.service';
import { ApplicationContext } from 'app/application-context';
import { Contact } from 'app/models/contact';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AlertProfile } from 'app/models/alert-profile';
import { merge, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Weekday } from 'app/shared/scheduler/weekday/weekday';
import { DayTime } from 'app/shared/scheduler/daytime/day-time';

@Component({
    selector: 'app-alert-profile',
    templateUrl: './alert-profile.component.html',
    styleUrls: ['./alert-profile.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class AlertProfileComponent implements OnInit {

    constructor(public dialog: MatDialog,
                private applicationContext: ApplicationContext,
                private alertProfileService: AlertProfileService) { }

    dataSource: Array<AlertProfile>;
    change: ReplaySubject<any>;

    displayedColumns: string[] = ['name', 'description', 'publicInCompany', 'type', 'active',
        'speedKph', 'zoneId', 'params1', 'params2', /*'weekDays', 'dayTime', 'alertEmail', 'alertSms',
        'alertApp', 'cannedAction', */'contacts', 'subject', 'text', 'templateId', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'actions'];
    expandedElement: any;
    resultsLength = 0;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
        this.change = new ReplaySubject(1);
        this.sort.sortChange.subscribe(() => {
            this.paginator.pageIndex = 0;
        });
        merge(this.sort.sortChange, this.paginator.page, this.change)
        .pipe(
            startWith({}),
            switchMap(() => {
                this.applicationContext.spin(true);
                return this.alertProfileService!.searchAndSort(
                    this.paginator.pageIndex, this.paginator.pageSize,
                    this.sort.active, this.sort.direction);
            }),
            map(data => {
                this.applicationContext.spin(false);
                this.resultsLength = data.totalElements;
                return data.content;
            }),
            catchError(() => {
                this.applicationContext.spin(false);
                return of([]);
            })).subscribe(data => this.dataSource = data)
    }

    isExpanded(element: any): boolean {
        return this.expandedElement === element;
    }

    toggleExpandCollapse(element): void {
        if (this.isExpanded(element)) {
            this.expandedElement = null;
        } else {
            this.expandedElement = element;
        }
    }

    dialogColumnOptions(): void {

    }

    dialogToCreateNewAlertProfile(): void {
        const data = new AlertProfileRequest();
        const dialogRef = this.dialog.open(AddEditAlertProfileComponent, {
            width: '800px',
            data: data
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.create(data);
            }
        });
    }

    create(data: AlertProfileRequest): void {
        this.applicationContext.spin(true);
        this.alertProfileService.create(data).subscribe(
            response => {
                this.applicationContext.spin(false);
                this.applicationContext.info('An alert profile was created');
            },
            error => {},
            () => {
                this.change.next();
            }
        );
    }

    dialogEditAlertProfile(alertProfile: AlertProfile): void {

    }

    dialogDelete(): void {

    }

    applyFilter(value: string) {

    }
}
