import { createReducer, on } from '@ngrx/store';
import { SysRules } from '../models/rule.model';
import { retrievedRuleset, retrievedRulesetList } from './rule.actions';

export const initialRulesState: ReadonlyArray<SysRules> = [];

export const rulesReducer = createReducer(
    initialRulesState,
    on(retrievedRulesetList, (state, { rules }) => rules)
);

export const initialRuleState: SysRules = {
    id: "",
    label: "",
    location: "",
    rules: []
}

export const ruleReducer = createReducer(
    initialRuleState,
    on(retrievedRuleset, (state, { rule }) => rule)
);