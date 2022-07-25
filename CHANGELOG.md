# Changelog

## v1.1.7

* test publishing

## v1.1.5

### Bug Fixes

- fixed app `identifier` specified in tauri.conf.json

## v1.1.4

### Dependencies

- upgraded `serde_json` to **1.0.82** in [#44](https://github.com/drgnjs/drgn/pull/44)
- upgraded `@tauri-apps/cli` to **1.0.2** in [#46](https://github.com/drgnjs/drgn/pull/46)
- upgraded `material-symbols` to **0.2.3** in [#47](https://github.com/drgnjs/drgn/pull/47)
- upgraded `tauri-build` to **1.0.2** in [#48](https://github.com/drgnjs/drgn/pull/48)
- upgraded `tauri` to **1.0.2** in [#49](https://github.com/drgnjs/drgn/pull/49)

## v1.1.3

### Dependencies

- upgraded `@typescript-eslint/eslint-plugin` to **5.30.0** in [#39](https://github.com/drgnjs/drgn/pull/39)
- upgraded `material-symbols` to **0.2.2** in [#40](https://github.com/drgnjs/drgn/pull/40)
- upgraded `@typescript-eslint/parser` to **5.30.0** in [#41](https://github.com/drgnjs/drgn/pull/41)

## v1.1.2

### Bug Fixes

- removed `installMode` option for Windows

### Dependencies

- upgraded `@typescript-eslint/eslint-plugin` to **5.29.0** in [#34](https://github.com/drgnjs/drgn/pull/34)
- upgraded `@typescript-eslint/parser` to **5.29.0** in [#35](https://github.com/drgnjs/drgn/pull/35)
- upgraded `sass` to **1.53.0** in [#36](https://github.com/drgnjs/drgn/pull/36)
- upgraded `eslint-plugin-react` to **7.30.1** in [#37](https://github.com/drgnjs/drgn/pull/37)

## v1.1.1

### Bug Fixes

- removed import of non-existent preferences page

### Changes

- formatted code *(fixed lint issues)*

## v1.1.0

### New Features

- added ability to add servers
- added basic foundation for the server dashboard

### Dependencies

- upgraded `@tauri-apps/api` to **1.0.1** in [#28](https://github.com/drgnjs/drgn/pull/28)
- upgraded `@dicebear/avatars-identicon-sprites` to **4.10.3** in [#29](https://github.com/drgnjs/drgn/pull/29)
- upgraded `@types/react` to **18.0.14** in [#30](https://github.com/drgnjs/drgn/pull/30)
- upgraded `@dicebear/avatars` to **4.10.3** in [#31](https://github.com/drgnjs/drgn/pull/31)
- upgraded `typescript` to **4.7.4** in [#32](https://github.com/drgnjs/drgn/pull/32)
- upgraded `eslint` to **8.18.0** in [#33](https://github.com/drgnjs/drgn/pull/33)

## v1.0.13

### Changes

- added `eslint` (with plugins)
- fixed linting issues
- made future Windows updates run in the background

### Dependencies

- upgraded `@tauri-apps/cli` to **1.0.0** in [#23](https://github.com/drgnjs/drgn/pull/23)
- upgraded `@tauri-apps/api` to **1.0.0** in [#24](https://github.com/drgnjs/drgn/pull/24)
- upgraded `@types/react` to **18.0.13** in [#25](https://github.com/drgnjs/drgn/pull/25)
- upgraded `tauri-build` to **1.0.0** in [#26](https://github.com/drgnjs/drgn/pull/26)
- upgraded `tauri` to **1.0.0** in [#27](https://github.com/drgnjs/drgn/pull/27)

## v1.0.12

### Bug Fixes

- fixed invalid platform names specified in `release.json`

### Changes

- upgraded `tauri` to **1.0.0-rc.16**
- upgraded `tauri-build` to **1.0.0-rc.14**
- upgraded `@tauri-apps/cli` to **1.0.0-rc.15**
- upgraded `material-symbols` to **0.2.1**
- upgraded `concurrently` to **7.2.2**
- upgraded `react` to **18.2.0**
- upgraded `react-dom` to **18.2.0**

## v1.0.11

### Bug Fixes

- fixed `publish` workflow

## v1.0.1

### Bug Fixes

- fixed import of images
- added missing favicon

### Changes

- edited `publish` workflow, get version from event trigger
- changed `identifier` in tauri config to actual app author
- removed `version.txt` file

## v1.0.0

drgn is now generally available to download for Windows, Linux, and Mac.
