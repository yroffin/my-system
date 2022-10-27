import { Component, OnInit } from '@angular/core';
import { SysPreference } from 'src/app/models/preference';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {

  preferences: SysPreference

  constructor(
    private databaseService: DatabaseService
  ) {
    this.preferences = this.databaseService.retrievePreferences()
  }

  ngOnInit(): void {
  }

  handleChange(event: any): void {
    this.databaseService.storePreferences(this.preferences)
  }
}
