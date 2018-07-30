import { AccountLittle } from 'app/models/little/account-little';

export class Geofence {
    id: number;
    companyId: number;
    accounts: Array<AccountLittle>;
    name: string;
    color: string;
    maxSpeedKPH: number;
    reverseGeozone: boolean;
    privateArea: boolean;
    geometry: string | any;

    //track
    internalId: number;
}