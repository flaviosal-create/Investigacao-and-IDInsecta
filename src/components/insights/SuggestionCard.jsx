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
          investigation.suggestion.structure
        )}
      </strong>
      <p className="suggestion-focus">
        {suggestionMode.focus}
      </p>
      <p>{report.suggestion.reason}</p>
      <p className="suggestion-context">
        {buildSuggestionContext({
          leader,
          runnerUp,
          suggestion:
            investigation.suggestion,
        })}
      </p>
      <button
        type="button"
        className="secondary-button next-step-button"
        onClick={() =>
          onJump(
            investigation.suggestion
              .structure
          )
        }
      >
        Ir para esta observação
      </button>
    </>
  );
}
