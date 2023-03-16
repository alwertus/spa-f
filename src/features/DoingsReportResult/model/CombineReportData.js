function addStats(arr) {
    const totalDuration = arr.reduce((acc, cur) => acc + cur['duration'], 0);
    return arr.map(obj => {
        const percentage = totalDuration === 0 ? 0 : obj['duration'] / totalDuration * 100;
        return {...obj, percent: percentage};
    });
}

export const CombineReportDataByTask = (arr) => {
    const tasks = arr.reduce((acc, cur) => {
        const index = acc.findIndex(obj => obj['name'] === cur['task']['name']);
        if (index >= 0) {
            acc[index]['duration'] += (cur['endDate'] - cur['startDate']) / 1000;
            acc[index]['count']++;
        } else {
            acc.push({
                id: cur['task']['id'],
                name: cur['task']['name'],
                duration: (cur['endDate'] - cur['startDate']) / 1000,
                count: 1
            });
        }
        return acc;
    }, []);
    return addStats(tasks)
}

export const CombineReportDataByLabel = (arr) => {
    const labels = arr.reduce((acc, cur) => {
        return acc.concat(cur['task']['labels'])
    }, [])
    const uniqueLabels = [...new Map(labels.map(label => [label.id, label])).values()];

    const result = uniqueLabels.map(label => {
        const filteredTasks = arr
            .filter(obj => !!obj['task']['labels'] && obj['task']['labels'].some(l => l.name === label.name))
        const sumDuration = filteredTasks.reduce((acc, cur) => acc + (cur['endDate'] - cur['startDate']) / 1000, 0)

        return {
            id: label['id'],
            name: label['name'],
            duration: sumDuration,
            count: filteredTasks.length
        }
    })
    const tasksWithNoLabel = arr.filter(obj => (!obj['task']['labels'] || obj['task']['labels'].length === 0))
    const sumDurationWithNoLabels = tasksWithNoLabel.reduce((acc, cur) => acc + (cur['endDate'] - cur['startDate']) / 1000, 0)

    if (!!tasksWithNoLabel && sumDurationWithNoLabels > 0)
        result.push({
            id: 0,
            name: 'No label',
            duration: sumDurationWithNoLabels,
            count: tasksWithNoLabel.length
        })

    return addStats(result)
}
