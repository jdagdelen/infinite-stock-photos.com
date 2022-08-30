export default function userFeatures(level, remaining) {
  if (level === 'Basic')
    return {
      features: 'Allows you to search the library and save favorites.',
      upgradeText:
        'Upgrade to a paid account to generate your own images with AI',
    };
  else if (level === 'Pro')
    return {
      features: `400 generations/month. ${remaining} remaining`,
      upgradeText: 'Upgrade to get unlimited generations',
    };
  else if (level === 'Premium')
    return { features: 'You have unlimited generations.', upgradeText: '' };
}
