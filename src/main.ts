import SentryResponse from './types/sentry';

const SENTRY_BASE_URL = 'https://sentry.io';

const ORGANIZATION_SLUG =
  PropertiesService.getScriptProperties().getProperty('ORGANIZATION_SLUG')!;

const PROJECT_SLUG =
  PropertiesService.getScriptProperties().getProperty('PROJECT_SLUG')!;

const SENTRY_AUTH_TOKEN =
  PropertiesService.getScriptProperties().getProperty('SENTRY_AUTH_TOKEN')!;

const getIssues = (): SentryResponse => {
  const response = UrlFetchApp.fetch(
    `${SENTRY_BASE_URL}/api/0/projects/${ORGANIZATION_SLUG}/${PROJECT_SLUG}/issues/`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SENTRY_AUTH_TOKEN}`,
      },
      muteHttpExceptions: true,
    }
  );

  const status = response.getResponseCode();
  const rawResponse = response.getContentText();
  const issues: SentryResponse = JSON.parse(rawResponse);

  if (status !== 200) {
    throw new Error(
      `Failed to request to Sentry. status: ${status}, response: ${rawResponse}`
    );
  }

  return issues;
};

const main = () => {
  const issues = getIssues();

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('issues');
  if (!sheet) {
    throw new Error('Sheet not found');
  }

  sheet.deleteRows(2, sheet.getLastRow() - 1);

  const values = issues.map((issue) => [
    issue.id,
    issue.permalink,
    issue.title,
    issue.count,
    issue.userCount,
    issue.level,
    issue.logger,
    issue.metadata,
    issue.status,
    issue.firstSeen,
    issue.lastSeen,
  ]);

  sheet.getRange(2, 1, values.length, values[0].length).setValues(values);
};

export default main;
