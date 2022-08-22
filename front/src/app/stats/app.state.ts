import { Module } from "../models/module.model";

export interface AppState {
    modules: ReadonlyArray<Module>;
}