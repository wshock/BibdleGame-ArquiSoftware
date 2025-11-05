export const compareValues = (value1: any, value2: any) => {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    const common = value1.filter((v) => value2.includes(v));
    if (common.length === value1.length && common.length === value2.length)
      return 'total coincidence';
    if (common.length > 0) return 'partial coincidence';
    return 'no coincidence';
  }
  return value1 === value2 ? 'total coincidence' : 'no coincidence';
};

export const compareCharacters = (c1: any, c2: any) => ({
  gender: compareValues(c1.gender, c2.gender),
  time: compareValues(c1.time, c2.time),
  role: compareValues(c1.role, c2.role),
});
