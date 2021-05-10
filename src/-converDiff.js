// const convert = (diff) => {
//   const result = diff.map(([status, key, value]) => {
//     const e = {
//       propertyName: key,
//       propertyStatus: status,
//     };
//     if (status === 'added') {
//       e.propertyCurrentValue = value;
//     }
//     if (status === 'equal') {
//       e.propertyCurrentValue = value;
//     }
//     if (status === 'removed') {
//       e.propertyCurrentValue = value;
//     }
//     if (status === 'updated') {
//       e.propertyCurrentValue = value[1];
//       e.propertyPreviousValue = value[0];
//     }
//     if (status === 'nested') {
//       e.propertyCurrentValue = convert(value);
//     }
//     return e;
//   });
//   return result;
// };
// export default convert;
