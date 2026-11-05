import type { core } from 'zod';

/**
 * The `when` for every PATCH schema's "Supply at least one field to change." check.
 *
 * Zod 4.6 stopped treating `unrecognized_keys` as an aborting issue, so a strict
 * object's refinements now run after a forbidden key has already been reported. A
 * PATCH carrying only a create-only field (`{ "code": "4000" }` on an account) then
 * answered with two issues: the real one, and "Supply at least one field to change."
 * — which is false, the caller did supply one. Gating the refinement on a clean
 * payload restores the single, accurate issue Zod 4.4 gave, and leaves the empty-body
 * case (no prior issues) refused exactly as before.
 */
export const whenNoPriorIssues = (payload: core.ParsePayload): boolean =>
  payload.issues.length === 0;
