import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AppareilService } from '../services/appareil.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
export class EditAppareilComponent implements OnInit {

  defaultOnOff = 'éteint';
  constructor(private appareilService: AppareilService , private router: Router) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    const name = form.value.name;
    const status = form.value.status;
    console.log('Name = ' + name);
    console.log('Status = ' + status);
    this.appareilService.addAppareil(name, status);
    this.router.navigate(['/appareils']);
  }
}
