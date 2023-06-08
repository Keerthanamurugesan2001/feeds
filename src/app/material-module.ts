import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

var material_module_list = [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
]

@NgModule({
    imports: [
        material_module_list
    ],
    exports: [
        material_module_list
    ],
    providers: [],
    declarations: []
  })
export class AppMaterialModule { }