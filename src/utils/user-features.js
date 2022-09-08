export default function userFeatures(level) {
  if (level === 'basic')
    return {
      features: 'Allows you to search the library and save favorites. 40 free credits when you sign up.',
      upgradeText:
        'Purchase more credits up upgrade to unlimited below.',
    };
  else if (level === 'premium')
    return { features: 'You have unlimited generations.', upgradeText: '' };
}
