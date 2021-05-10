// const convert = (value) => {
//   if (typeof value === 'string') return `'${value}'`;
//   if (typeof value === 'object' && value !== null) return '[complex value]';
//   return value;
// };

// const formate = (diff, parentKey = '') => {
//   const result = diff
//     .filter(([status, ...rest]) => status !== 'equal')
//     .map(([status, key, value]) => {
//       if (status === 'removed') {
//         return `Property \'${parentKey}${key}\' was ${status}`;
//       }
//       if (status === 'updated') {
//         return `Property \'${parentKey}${key}\' was ${status}. From ${convert(value[0])} to ${convert(value[1])}`;
//       }
//       if (status === 'nested') {
//         return formate(value, `${parentKey}${key}.`);
//       }
//       return `Property \'${parentKey}${key}\' was ${status} with value: ${convert(value)}`;
//     });

//   return result.join('\n');
// };
// export default formate;
