import { Component } from "@angular/core";

@Component({
    selector: 'btn-cmn',
    template: `<button>{{btnValue}}</button>` ,
    styles: ['button{ color: white; backgroundColor: green, padding: 20px; }'],
})
export class CommonButtonComponent{
    public btnValue = "Translate"
}