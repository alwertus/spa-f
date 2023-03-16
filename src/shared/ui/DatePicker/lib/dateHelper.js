export function getMonthDates(current) {
    let d1 = new Date(current.getTime())
    d1.setDate(1)
    let d2 = new Date(current.getFullYear(), current.getMonth() + 1, 0)
    
    let arr = []
    let line = []
    for (let i = -d1.getDay() + 2; i <= d2.getDate() + (7 - d2.getDay()); i++) {
        line.push((i > d2.getDate()) ? 100 + i - d2.getDate() : i)
        if (line.length >= 7) {
            arr.push(line)
            line = []
        }
    }
    return arr
}