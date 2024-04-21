export const hideResource = (resource: string, type: 'email' | 'phone') => {
  if (type === 'email') {
    const [username, domain] = resource.split('@');
    const hiddenUsername =
      username.substring(0, Math.ceil(username.length / 2)) +
      '*'.repeat(Math.floor(username.length / 2));
    return `${hiddenUsername}@${domain}`;
  }

  if (type === 'phone') {
    const countryCode = resource.substring(0, resource.length - 10);
    const visiblePart = resource.substring(resource.length - 10);
    return countryCode + '*'.repeat(5) + visiblePart.substring(5);
  }
};
