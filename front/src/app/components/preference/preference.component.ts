import { Component, OnInit } from '@angular/core';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { SysPreference } from 'src/app/models/preference';
import { DatabaseService } from 'src/app/services/database.service';
import { PreferenceService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {

  preferences!: SysPreference

  constructor(
    private _logger: NGXLogger,
    private preferenceService: PreferenceService
  ) {
    let preferences = this.preferenceService.findOne("default")
    if (preferences) {
      this.preferences = preferences
    }
  }

  ngOnInit(): void {
  }

  handleChange(event: any): void {
    this.preferenceService.store(this.preferences, (entity) => {
      entity.full = this.preferences.full
      entity.grid = this.preferences.grid
      entity.applyRules = this.preferences.applyRules
      entity.debug = this.preferences.debug
      entity.info = this.preferences.info
      entity.maxHeight = this.preferences.maxHeight
      entity.maxWidth = this.preferences.maxWidth
    })

    if (this.preferences.debug) {
      // Get the current config
      var config = this._logger.getConfigSnapshot();
      // Updating only one field
      config.level = NgxLoggerLevel.DEBUG;
      // Setting the config
      this._logger.updateConfig(config);
    } else {
      // Get the current config
      var config = this._logger.getConfigSnapshot();
      // Updating only one field
      config.level = NgxLoggerLevel.INFO;
      // Setting the config
      this._logger.updateConfig(config);
    }
  }
}
