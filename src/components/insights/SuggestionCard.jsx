import {
  buildSuggestionContext,
  formatStructure,
  resolveSuggestionMode,
} from "../../utils/presentation.js";

export function SuggestionCard({
  investigation,
  report,
  onJump,
}) {
  const suggestion = investigation?.suggestion ?? report?.suggestion;

  if (!suggestion) {
    return null;
  }

  const leader =
    investigation.hypotheses?.[0] ?? null;
  const runnerUp =
    investigation.hypotheses?.[1] ?? null;
  const suggestionMode =
    resolveSuggestionMode(
      investigation
    );

  return (
    <>
      <span className="report-label">
        {suggestionMode.label}
      </span>
      <strong>
        {formatStructure(
          suggestion.structure
        )}
      </strong>
      <p className="suggestion-focus">
        {suggestionMode.focus}
      </p>
      <p>{report?.suggestion?.reason ?? suggestion.reason}</p>
      <p className="suggestion-context">
        {buildSuggestionContext({
          leader,
          runnerUp,
          suggestion:
            suggestion,
        })}
      </p>
      <button
        type="button"
        className="secondary-button next-step-button"
        onClick={() =>
          onJump(
            suggestion.structure
          )
        }
      >
        Ir para esta observação
      </button>
    </>
  );
}
