import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import * as _ from 'lodash';
import { SysGraph } from '../models/graph';
import { SysPreference } from '../models/preference';
import { SysTags } from '../models/style';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private storage: LocalStorageService) {
    let _graphs = this.retrieveGraphs()
    if (!_graphs) {
      this.storage.store('graphs', [])
    }
    let _styles = this.findAllStyles()
    if (!_styles) {
      this.storage.store('styles', [])
    }
    let _preferences = this.retrievePreferences()
    if (!_preferences) {
      this.storage.store('preferences', {
        grid: false
      })
    }
  }

  retrievePreferences(): SysPreference {
    return JSON.parse(JSON.stringify(this.storage.retrieve('preferences')))
  }

  /**
   * style
   */

  findAllStyles(): Array<SysTags> {
    return this.retrieveStyles()
  }

  findStyle(_id: string): SysTags | undefined {
    let _styles = this.retrieveStyles()
    let found = _.find(_styles, (style) => {
      return _id === style.id
    })
    if (found) {
      return found
    }
    return undefined
  }

  deleteStyle(_style: string): Array<SysTags> {
    let _styles = this.retrieveStyles()
    _.remove(_styles, (style) => {
      return _style === style.id
    })
    this.storage.store('styles', _styles)
    return _styles
  }

  storeStyle(_style: SysTags): void {
    let _styles = this.retrieveStyles()
    let found = _.find(_styles, (style) => {
      return _style.id === style.id
    })
    if (found) {
      found.id = _style.id
      found.tags = _style.tags
    } else {
      _styles.push(_style)
    }

    this.storage.store('styles', _styles)
  }

  private retrieveStyles(): Array<SysTags> {
    return JSON.parse(JSON.stringify(this.storage.retrieve('styles')))
  }

  /**
   * graph
   */

  private retrieveGraphs(): Array<SysGraph> {
    return JSON.parse(JSON.stringify(this.storage.retrieve('graphs')))
  }

  deleteGraph(_graph: SysGraph): Array<SysGraph> {
    let _graphs = this.retrieveGraphs()
    _.remove(_graphs, (graph) => {
      return graph.id === _graph.id
    })
    this.storage.store('graphs', _graphs)
    return _graphs
  }

  findAllGraphs(): Array<SysGraph> {
    let _graphs = this.retrieveGraphs()
    return _graphs
  }

  findGraph(_id: string): SysGraph | undefined {
    let _graphs = this.retrieveGraphs()
    let found = _.find(_graphs, (graph) => {
      return _id === graph.id
    })
    if (found) {
      return found
    }
    return undefined
  }

  storeGraph(_graph: SysGraph): void {
    let _graphs = this.retrieveGraphs()
    let found = _.find(_graphs, (graph) => {
      return _graph.id === graph.id
    })
    if (found) {
      found.id = _graph.id
      found.style = _graph.style
      found.label = _graph.label
      found.edges = _graph.edges
      found.nodes = _graph.nodes
    } else {
      _graphs.push(_graph)
    }

    this.storage.store('graphs', _graphs)
  }

  storePreferences(_preferences: SysPreference): void {
    this.storage.store('preferences', _preferences)
  }
}
