# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- GitHub Actions CI workflow running prettier, lint, typecheck, test, and
  build on every push and pull request to `main`.

## [1.2.4] - 2026-11-04

### Changed

- Upgraded TypeScript to v6.
- Upgraded ESLint to v10, Vite to v8, `@vitejs/plugin-react` to v6,
  `vite-plugin-dts` to v5, and Vitest to v5.
- Updated other dependencies within their existing semver ranges.

### Fixed

- Fixed the Vite build emitting the stylesheet as `notifin-react.css`
  instead of `notifin.css`, which would have broken the package's
  `style.css` export.
- Added a `declare module '*.css'` ambient type so plain side-effect CSS
  imports type-check under TypeScript 6's stricter side-effect import
  checking.

## [1.2.3] - 2026-11-04

### Fixed

- Removed a trailing slash from the homepage URL in `package.json`.

## [1.2.2] - 2026-02-26

### Changed

- Updated the `homepage` and `repository` URLs in `package.json`.

## [1.2.1] - 2026-02-26

### Changed

- Renamed the published package to `@khencahyo13/notifin-react`.

## [1.2.0] - 2026-02-26

### Added

- Motion presets for dialog animations.
- Built-in dark theme support and a `colorScheme` prop.
- Per-color-scheme theme overrides.
- End-to-end tests for the built package.

### Changed

- Moved the `Notifin` component and icons into a dedicated `provider`
  directory.

## [1.1.0] - 2026-02-26

### Added

- Style injection, improved theming, and host registration for the
  `Notifin` component.

## [1.0.5] - 2026-02-25

### Fixed

- Corrected import paths in the README to use the published package name.

## [1.0.4] - 2026-02-25

### Added

- Contributing guidelines, license information, and bug report
  instructions to the README.

### Fixed

- Added missing keywords and repository information to `package.json`.

## [1.0.3] - 2026-02-25

### Changed

- Simplified type definitions and improved code formatting across the
  `Notifin` components.

## [1.0.2] - 2026-02-25

### Fixed

- Corrected the package name format in `package.json`.

## [1.0.1] - 2026-02-25

### Added

- Initial release: core notification system with customizable alert
  dialogs and notification types, built on Radix Alert Dialog
  primitives.
