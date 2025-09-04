
---

### Reflection on the AI-generated tests

**What worked?**

* The AI gave a **solid starting point** with unit tests and an integration test covering validation, failure cases, and a successful submission flow.
* It correctly set up `@testing-library/react`, `user-event`, and `vitest` boilerplate, which saved a lot of time.
* The structure (unit tests vs integration test) made it clear which behaviors to test separately.

**What didn’t?**

* The generated code initially put tests in the **same file** as the component, which isn’t best practice — we had to move them out.
* There were **React runtime issues** (`React is not defined`) because Vitest and Next.js differ in handling JSX, something the AI didn’t catch.
* Some assertions were too generic (just checking for text) instead of using labels or roles for accessibility.

**What surprised me?**

* The AI was able to simulate a **full integration flow** (filling inputs, toggling settings, submitting) almost correctly on the first try.
* With just a few refinements (better assertions, limiting max options, trimming whitespace), the tests became **realistic and production-ready**.
* It highlighted how AI can accelerate **boilerplate and edge-case coverage**, while still requiring human review for accuracy, readability, and alignment with actual component behavior.

---

