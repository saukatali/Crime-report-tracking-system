export const COMPLAINT_CATEGORIES = [
  'Theft',
  'Assault',
  'Burglary',
  'Cybercrime',
  'Fraud',
  'Vandalism',
  'Drug Offense',
  'Domestic Violence',
  'Traffic Violation',
  'Missing Person',
  'Other'
];

export const COMPLAINT_STATUS = {
  PENDING: 'Pending',
  UNDER_INVESTIGATION: 'Under Investigation',
  RESOLVED: 'Resolved',
  REJECTED: 'Rejected'
};

export const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Under Investigation': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};
