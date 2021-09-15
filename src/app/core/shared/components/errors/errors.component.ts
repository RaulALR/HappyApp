import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {
  @Input() formController: FormControl;
  @Input() validationOptions: string[];
  @Input() labelError: Object;

  public formControlError: Object;
  public statusError = false;

  constructor(public translateService: TranslateService) { }

  ngOnInit() {
    this.formControlError = this.formController.errors;

    this.formController.statusChanges.subscribe(item => {
      if (item === 'VALID') {
        this.statusError = false;
      } else {
        this.statusError = true;
      }
      this.formControlError = this.formController.errors;
    })
  }

}
