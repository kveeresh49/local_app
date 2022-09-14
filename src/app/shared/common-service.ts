import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AlertModelObj } from "./models/alert.model";

@Injectable({ providedIn: 'root',})

export class CommonService {
    public alertMessageSub$:Subject<AlertModelObj>  =  new Subject<AlertModelObj>();
}