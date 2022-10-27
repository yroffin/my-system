import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import * as _ from 'lodash';
import { SysGraph, SysTag } from '../models/graph';
import { SysPreference } from '../models/preference';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private storage: LocalStorageService) {
    let _graphs = this.retrieveGraphs()
    if (!_graphs) {
      this.storage.store('graphs', [])
    }
    let _tags = this.retrieveTags()
    if (!_tags) {
      this.storage.store('tags', [])
    }
    let _preferences = this.retrievePreferences()
    if (!_preferences) {
      this.storage.store('preferences', {
        grid: false
      })
    }
  }

  private retrieveGraphs(): Array<SysGraph> {
    return JSON.parse(JSON.stringify(this.storage.retrieve('graphs')))
  }

  retrievePreferences(): SysPreference {
    return JSON.parse(JSON.stringify(this.storage.retrieve('preferences')))
  }

  private retrieveTags(): Array<SysTag> {
    return JSON.parse(JSON.stringify(this.storage.retrieve('tags')))
  }

  deleteGraph(_graph: SysGraph): Array<SysGraph> {
    let _graphs = this.retrieveGraphs()
    _.remove(_graphs, (graph) => {
      return graph.id === _graph.id
    })
    this.storage.store('graphs', _graphs)
    return _graphs
  }

  findAllTags(): Array<SysTag> {
    let _tags = this.retrieveTags()
    return _tags
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

  storeTags(_tags: Array<SysTag>): void {
    this.storage.store('tags', _tags)
  }
}
