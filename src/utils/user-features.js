export default function userFeatures(level) {
  if (level === 'basic')
    return {
      features: 'Allows you to search the library and save favorites.',
      upgradeText:
        'Upgrade to a paid account to generate your own images with AI',
    };
  else if (level === 'pro')
    return {
      features: '400 generations/month.',
      upgradeText: 'Upgrade to get unlimited generations',
    };
  else if (level === 'premium')
    return { features: 'You have unlimited generations.', upgradeText: '' };
}
