// see: https://docs.sentry.io/api/events/list-a-projects-issues/

type Project = {
  id: string;
  name: string;
  slug: string;
};

type Metadata = {
  title: string;
};

type Stats = {
  '24h': [number, number][];
};

type SentryIssue = {
  annotations: string[];
  assignedTo: object;
  count: string;
  culprit: string;
  firstSeen: string;
  hasSeen: boolean;
  id: string;
  isBookmarked: boolean;
  isPublic: boolean;
  isSubscribed: boolean;
  lastSeen: string;
  level: string;
  logger: string | null;
  metadata: Metadata;
  numComments: number;
  permalink: string;
  project: Project;
  shareId: string | null;
  shortId: string;
  stats: Stats;
  status: 'resolved' | 'unresolved' | 'ignored';
  statusDetails: object;
  subscriptionDetails: object;
  title: string;
  type: string;
  userCount: number;
};

type SentryResponse = SentryIssue[];

export default SentryResponse;
