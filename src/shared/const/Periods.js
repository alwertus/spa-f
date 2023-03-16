export const Periods = {
    DAY: {
        name: 'Day',
        increaseDate: (d, val) => {
            return new Date(d.getFullYear(), d.getMonth(), d.getDate() + val)
        },
        getIntervalByDate: (d) => {
            const d1 = new Date(d.getTime());
            const d2 = new Date(d.getTime());
            d2.setDate(d2.getDate() + 1)
            return {start: d1, end: d2}
        }},
    WEEK: {
        name: 'Week',
        increaseDate: (d, val) => {
            return new Date(d.getFullYear(), d.getMonth(), d.getDate() + val * 7)
        },
        getIntervalByDate: (d) => {
            const d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (d.getDay() === 0 ? 7 : d.getDay()) + 1);
            const d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (d.getDay() === 0 ? d.getDay() : (7 - d.getDay())) + 1);
            return {start: d1, end: d2}
            }},
    MONTH: {
        name: 'Month',
        increaseDate: (d, val) => {
            return new Date(d.getFullYear(), d.getMonth() + val, d.getDate())
        },
        getIntervalByDate: (d) => {
            const d1 = new Date(d.getFullYear(), d.getMonth(), 1);
            const d2 = new Date(d.getFullYear(), d.getMonth() + 1, 1);
            return {start: d1, end: d2}
            }},
    YEAR: {
        name: 'Year',
        increaseDate: (d, val) => {
            return new Date(d.getFullYear() + val, d.getMonth(), d.getDate())
        },
        getIntervalByDate: (d) => {
            const d1 = new Date(d.getFullYear(), 0, 1);
            const d2 = new Date(d.getFullYear() + 1, 0, 1);
            return {start: d1, end: d2}
            }},
    ALL_TIME: {
        name: 'All-time',
        increaseDate: () => {
            return new Date()
        },
        getIntervalByDate: () => {
            const d1 = new Date(0);
            const d2 = new Date(0);
            return {start: d1, end: d2}
        }},
}