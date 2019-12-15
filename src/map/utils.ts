export const cleanLabel = (label: string): string => {
  const regex = /([a-zA-Z- ]+)(\([a-zA-Z- ]+\))?/;
  const [full, first, last] = regex.exec(label) || ['', '', ''];

  return first.trim();
};
