### Compare and Reflect

- **What changed?**
  - Introduced `useCallback` for event handlers to avoid recreating functions on each render.
  - Switched to functional state updates for `options` and `settings` to prevent stale closures and reduce unnecessary re-renders.
  - Centralized hardcoded limits into `MIN_OPTIONS` and `MAX_OPTIONS`, and added early returns to skip no-op state updates.
  - UI/behavior remained identical; this was a structural refactor for readability and stability.

- **Was performance improved in theory or in practice?**
  - In theory: yes. Stable callbacks reduce prop churn; functional updates minimize state writes; computing trimmed values once per submit avoids repeated work.
  - In practice: modest wins for typical forms; benefits grow as the number of options/children increases or if handlers are passed to memoized children. No regressions expected.

- **Would you keep this refactor in production?**
  - Yes. It’s clearer, safer, and more resilient to future changes without altering behavior. The improvements align with React best practices and are low risk to maintain.
