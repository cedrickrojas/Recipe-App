import { AbstractControl, ValidationErrors } from '@angular/forms';

/** Splits a textarea's raw text into a clean, non-empty ingredient list. */
export function parseIngredients(raw: string): string[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/** Validator: requires the ingredients textarea to contain at least one non-blank line. */
export function atLeastOneIngredientValidator(control: AbstractControl<string>): ValidationErrors | null {
  return parseIngredients(control.value ?? '').length > 0 ? null : { required: true };
}
