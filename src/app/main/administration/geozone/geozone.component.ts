import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-draw';
import { GeozoneService } from 'app/shared/services/geozone.service';
import { RequestGeozone } from 'app/shared/models/request/request-geozone';
import { Geofence } from 'app/shared/models/geozone';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';
import { OptionalColumnAccountComponent } from 'app/main/administration/account/optional-column-account/optional-column-account.component';
import { AddEditGeozoneComponent } from 'app/main/administration/geozone/add-edit-geozone/add-edit-geozone.component';

const TILE_OSM_URL = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const TILE_MAPBOX_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
const TILE_GOOGLE_URL = 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}';

@Component({
    selector: 'app-geozone',
    templateUrl: './geozone.component.html',
    styleUrls: ['./geozone.component.scss']
})
export class GeozoneComponent implements OnInit, AfterViewInit {

    private customDefault: L.Icon;
    private map: L.Map;
    private editableLayers: L.FeatureGroup;

    showDetails: boolean = true;

    geozoneList: Array<Geofence>;

    selectedGeofence: Geofence | any = {};

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private geozoneService: GeozoneService) { }

    ngOnInit() {
        this.customDefault = L.icon({
            iconRetinaUrl: '/assets/images/marker-icon-2x.png',
            iconUrl: '/assets/images/marker-icon.png',
            shadowUrl: '/assets/images/marker-shadow.png'
        });

        this.loadAllGeozone();
    }

    ngAfterViewInit(): void {
        console.log('init map');
        let osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        let osm = L.tileLayer(TILE_OSM_URL, {
            maxZoom: 18,
            attribution: osmAttrib
        });
        let mapbox = L.tileLayer(TILE_MAPBOX_URL, {
            maxZoom: 18,
            attribution: osmAttrib,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiaG9haXZ1YmsiLCJhIjoiY2oya3YzbHFuMDAwMTJxazN6Y3k0Y2syNyJ9.4avYQphrtbrrniI_CT0XSA'
        });
        let google = L.tileLayer(TILE_GOOGLE_URL, {
            maxZoom: 18,
            attribution: 'google'
        });

        this.map = L.map('geo-map-id', {
            zoomControl: false,
            center: L.latLng(21.731253, 105.996139),
            zoom: 12,
        });

        L.control.scale().addTo(this.map);
        L.control.zoom().setPosition('bottomleft').addTo(this.map);

        this.editableLayers = L.featureGroup().addTo(this.map);

        L.control.layers(
            {
                'osm': osm.addTo(this.map),
                'google': google,
                'mapbox': mapbox
            },
            {
                'drawlayer': this.editableLayers
            },
            {
                position: 'topright',
                collapsed: true
            }).addTo(this.map);


        let drawControl = new L.Control.Draw({
            draw: {
                polyline: false,
                circlemarker: false,
                marker: false
            },
            edit: {
                featureGroup: this.editableLayers,
                //edit: false, // disable edit-button
                //remove: false
            }
        });
        this.map.addControl(drawControl);

        this.map.on(L.Draw.Event.CREATED, (event: any) => {
            // this.openAddEditGeozoneDialog(event);
            // this.editableLayers.addLayer(event.layer);
            this.showDetails = !this.showDetails;
            // console.log('layer-object', event.layer);
            // let gj = event.layer.toGeoJSON();
            // let radius = event.layer._mRadius;
            // console.log('Radius', radius);
            // gj.geometry.radius = radius;
            // console.log('layer', gj);
            //
            // let req = new RequestGeozone();
            // req.name = "abc";
            // req.companyId = 1;
            // req.color = "#ff7800";
            // req.geometry = JSON.stringify(gj.geometry);
            //
            // this.geozoneService.create(req).subscribe(
            //     data => {
            //         console.log("data# ",  data);
            //     },
            //     error => {},
            // () => {}
            // );
            //
            // let ly = L.geoJSON(gj, {
            //     pointToLayer: function (feature, latlng) {
            //         return L.circle(latlng, gj.geometry.radius, {
            //             fillColor: "#ff7800",
            //             color: "#000",
            //             weight: 1,
            //             opacity: 1,
            //             fillOpacity: 0.8
            //         });
            //     }
            // });
            //
            // this.editableLayers.addLayer(ly);
        })
    }

    private openAddEditGeozoneDialog(event: any) {
        const dialogRef = this.dialog.open(AddEditGeozoneComponent, {
            data: event,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(
            result => {
                //
            }
        );
    }

    private loadAllGeozone(): void {
        this.geozoneService.getAll().subscribe(
            data => {
                console.log('data', data);
                this.geozoneList = data;
            },
            error => {},
            () => {}
        );
    }

    //--
    public applyFilter(event: any): void {

    }

    public selectGeofence(geofence: any): void {
        this.showDetails = true;
        this.selectedGeofence = geofence;
    }
    public hideGeofenceDetails(): void {
        this.showDetails = false;
        setTimeout(() => {
            this.map.invalidateSize();
        }, 0);
    }
}
