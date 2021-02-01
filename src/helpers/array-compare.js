// export function compareArrayAsc(a, b, element) {
//     if (a[element] < b[element]) {
//         return -1;
//     }
//     if (a[element] > b[element]) {
//         return 1;
//     }
//     return 0;
// }

// export function compareArrayDesc(a, b, element) {
//     if (a[element] > b[element]) {
//         return -1;
//     }
//     if (a[element] < b[element]) {
//         return 1;
//     }
//     return 0;
// }

export function compareArrayAsc(field) {
    return function (a, b) {
        return (a[field] > b[field]) - (a[field] < b[field]);
    };
}

export function compareArrayDesc(field) {
    return function (a, b) {
        return (a[field] < b[field]) - (a[field] > b[field]);
    };
}

// export function compareArrayDateAsc(a, b) {
//     if (a.date < b.date) {
//         return -1;
//     }
//     if (a.date > b.date) {
//         return 1;
//     }
//     return 0;
// }

// export function compareArrayDateDesc(a, b) {
//     if (a.date > b.date) {
//         return -1;
//     }
//     if (a.date < b.date) {
//         return 1;
//     }
//     return 0;
// }

// export function compareArrayOrderIdAsc(a, b) {
//     if (a._id < b._id) {
//         return -1;
//     }
//     if (a._id > b._id) {
//         return 1;
//     }
//     return 0;
// }

// export function compareArrayOrderIdDesc(a, b) {
//     if (a._id > b._id) {
//         return -1;
//     }
//     if (a._id < b._id) {
//         return 1;
//     }
//     return 0;
// }