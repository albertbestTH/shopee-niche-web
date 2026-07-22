# Dependency Security Review

Review date: 2026-07-22

## Audit summary

- Commands: `npm audit`, `npm audit --json`, `npm outdated`, and `npm ls next postcss sharp`
- Result: 3 vulnerability records: 1 moderate and 2 high
- No critical vulnerability is currently reported by npm audit.
- No package was changed during this review.

## Advisory details

| Package | Installed | Patched version | Severity | Direct/transitive | Impact |
| --- | --- | --- | --- | --- | --- |
| `postcss` | 8.4.31 | 8.5.10 | Moderate | Transitive through Next.js | XSS risk when serializing attacker-controlled CSS containing an unescaped closing style tag. The current project uses static authored CSS and does not accept user CSS, so present exposure is primarily in the CSS build/serialization path. |
| `sharp` | 0.34.5 | 0.35.0 | High | Transitive through Next.js | Inherited libvips vulnerabilities may affect image processing at runtime or build time. The current site does not use `next/image` or process user-supplied images, reducing current reachability, but the vulnerable package remains installed. |
| `next` | 16.2.11 | No safe version offered by npm audit for this dependency tree | High aggregate record | Direct | npm reports Next.js as affected because it depends on the vulnerable `postcss` and `sharp` packages above. |

## Dependency paths

```text
shopee-niche-web-th@0.1.0
└─ next@16.2.11
   ├─ postcss@8.4.31
   └─ sharp@0.34.5
```

## Available remediation

- npm proposes `npm audit fix --force`, which would install `next@9.3.3`.
- That proposal is a breaking downgrade, violates the project rules, and is not a safe compatible remediation.
- Directly forcing transitive overrides was not attempted because Next.js owns and tests this dependency set; an unvalidated override could break build or runtime behavior.
- `npm outdated` reports no newer Next.js version within the current installed/wanted/latest view. Other listed package updates do not remediate these audit records.

## Actions taken

- Reviewed each advisory and dependency path.
- Confirmed current runtime/build reachability based on repository usage.
- Rejected `npm audit fix --force` and any Next.js downgrade.
- Added no dependency-security commit because no safe fix was available.

## Remaining risks

- The audit remains non-zero and must not be described as resolved.
- Re-check after Next.js publishes a compatible dependency update that includes `postcss >=8.5.10` and `sharp >=0.35.0`.
- Avoid accepting user-controlled CSS or image processing until the relevant advisories are patched and verified.

## Verdict

TEMPORARILY ACCEPTED
