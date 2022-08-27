import { SysGraph } from "../models/graph";
import { Module } from "../models/module.model";

export interface AppState {
    modules: ReadonlyArray<Module>;
    graphs: ReadonlyArray<SysGraph>;
    graph: SysGraph;
}