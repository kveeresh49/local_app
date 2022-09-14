import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AlertModel } from "./models/alert.model";

@Injectable({ providedIn: 'root',})

export class CommonService {
    public alertMessageSub:Subject<AlertModel>  =  new Subject<AlertModel>();
}