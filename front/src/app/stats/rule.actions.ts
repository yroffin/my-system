import { createAction, props } from '@ngrx/store';
import { SysRules } from '../models/rule.model';

export const retrievedRulesetList = createAction(
    '[Rules List/API] Retrieve Ruleset Success', props<{ rules: ReadonlyArray<SysRules> }>()
);

export const retrievedRuleset = createAction(
    '[Rules findOne/API] Retrieve Ruleset Success', props<{ rule: SysRules }>()
);