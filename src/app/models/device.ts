import { CompanyLittle } from 'app/models/little/company.little';
import { AccountLittle } from 'app/models/little/account.little';
import { AlertProfileLittle } from 'app/models/little/alert-profile.little';

export class Device {
    public id: number;

    public name: string;
    public description: string;
    public deviceId: string;
    public imei: string;

    public company: CompanyLittle | any;
    public accounts: Array<AccountLittle | any>;
    public alertProfiles: Array<AlertProfileLittle | any>

    public vehicleId: number;
    public vehicleName: string;

    public ipAddress: string;
    public port: number;

    public protocol: string;
    timeZone: string;
    maxStoredDataTime: number;

    status: string;
    expiredOn: Date;


    public serialNumber: string;
    public modelName: string;

    public manufacturerName: string;
    public firmwareVersion: string;
    public originalCountry: string;

    lastEventTime: Date;
    lastSpeedKph: number;
    lastLatitude: number;
    lastLongitude: number;
    lastAddress: string;
    //--
    public createdBy: string;
    public createdOn: Date;
    public updatedBy: string;
    public updatedOn: Date;
}
