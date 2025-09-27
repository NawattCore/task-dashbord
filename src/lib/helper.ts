// Utility function to format numbers with ألف, مليون, مليار suffixes
export const formatFollowersCount = (count: string | number): string => {
  const num = typeof count === 'string' ? parseInt(count) : count;

  if (isNaN(num)) return '0';

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + ' ' + 'مليار';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' ' + 'مليون';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + ' ' + 'ألف';
  }
  return num.toString();
};
