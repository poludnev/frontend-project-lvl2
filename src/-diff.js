// import _ from 'lodash';
// import parseFile from './parse.js';
// import { compareArrays as isArraysEqual } from './utils.js';

// const status = {};

// const diff = (parseFile1, parseFile2) => {
//   const fileKeys1 = Object.keys(parseFile1);
//   const fileKeys2 = Object.keys(parseFile2);

//   const commonKeys = _.union(fileKeys1, fileKeys2).sort();

//   const result = commonKeys.map((key) => {
//     if (!parseFile1.hasOwnProperty(key)) {
//       return ['added', key, parseFile2[key]];
//     }
//     if (!parseFile2.hasOwnProperty(key)) {
//       return ['removed', key, parseFile1[key]];
//     }
//     if (parseFile1[key] === parseFile2[key]) {
//       return ['equal', key, parseFile1[key]];
//     }
//     // if the properties aren't equal, there some options may exist:
//     // 1. The props are diffrent.
//     // 2. Both props are objects, even the objects are equal by values;
//     //      If both are objects, both may be :
//     //          - Different arrays;
//     //          - Equal arrays by values;
//     //          - Equal object by values;
//     //          - Unequal objects by values;

//     if (parseFile1[key] instanceof Array || parseFile2[key] instanceof Array) {
//       if (parseFile1[key] instanceof Array && parseFile2[key] instanceof Array) {
//         if (isArraysEqual(parseFile1[key], parseFile2[key])) return ['equal', key, parseFile1[key]];

//         return ['updated', key, [parseFile1[key], parseFile2[key]]];
//       }
//       return ['updated', key, [parseFile1[key], parseFile2[key]]];
//     }
//     if (parseFile1[key] instanceof Object && parseFile2[key] instanceof Object) {
//       return ['nested', key, diff(parseFile1[key], parseFile2[key])];
//     }
//     return ['updated', key, [parseFile1[key], parseFile2[key]]];
//   });

//   return result;
// };

// export default diff;
