import { Component, Input, OnInit } from '@angular/core';
import { Header } from 'src/app/models/header';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
})
export class ContactMeComponent implements OnInit {
  @Input()
  darkMode!: boolean;
  @Input()
  header!: Header;
  constructor() {}

  ngOnInit(): void {}
}
