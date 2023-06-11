# sentry-issue-collector

A Google Apps Script designed to fetch error data from Sentry via their API and output it onto a Google Spreadsheet. Aimed to assist in error tracking and analysis for better application debugging and monitoring.

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Setup

```sh
git clone git@github.com:MasashiFukuzawa/sentry-issue-collector.git
cd sentry-issue-collector
```

### Google Apps Script

1. Install clasp

```sh
npm install -g @google/clasp
```

2. Enable the Google Apps Script API: https://script.google.com/home/usersettings
3. Execute below commands

```sh
yarn install

clasp login
clasp create --title "sentry-issue-collector" --type sheets --rootDir ./src
clasp push --force
clasp open
```

4. Set environment variables

- ORGANIZATION_SLUG
- PROJECT_SLUG
- SENTRY_AUTH_TOKEN

see: https://docs.sentry.io/api/events/list-a-projects-issues/

5. Prepare `issues` sheet in your spreadsheet

6. Set triggers if needed
