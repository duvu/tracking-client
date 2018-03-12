import { Component, OnInit } from '@angular/core';
import { DeviceLittle } from 'app/shared/models/little/device-little';
import { MatTableDataSource } from '@angular/material';
import { DeviceService } from 'app/shared/services/device.service';

@Component({
    selector: 'app-report',
    templateUrl: './device-report.component.html',
    styleUrls: ['./device-report.component.scss']
})
export class DeviceReportComponent implements OnInit {

    deviceTableDataSource: MatTableDataSource<DeviceLittle> | null;
    displayedColumns = ['name'];

    constructor(private deviceService: DeviceService) { }

    ngOnInit() {
        this.deviceTableDataSource = new MatTableDataSource();

        this.deviceService.getAllLittle().subscribe(
            response => {
                this.deviceTableDataSource.data = response;
            },
            error => {},
            () => {}
        );
    }


    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.deviceTableDataSource.filter = filterValue;
    }


    selectThisDevice(event: any, device: DeviceLittle): void {
        event.stopPropagation();
        // if (this.oldSelectedDevice) {
        //     this.oldSelectedDevice.selected = false;
        // }
        // device.selected = !device.selected;
        //
        // let evdt = _.find(this.liveEvents, function (e) {
        //     return device.id === e.devId;
        // });
        // let center = L.latLng(evdt.latitude, evdt.longitude);
        // this.map.setView(center, 15);
        //
        // this.oldSelectedDevice = device;
    }


}