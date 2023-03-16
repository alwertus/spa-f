export function elementComparatorByName(a, b) {
    const A = (!!a['name'] ? a['name'].toUpperCase() : "")
    const B = (!!b['name'] ? b['name'].toUpperCase() : "")
    if (A < B) return -1
    if (A > B) return 1
    return 0
}