import {useEffect, useState} from 'react';
import {createLabel, getLabelList, removeLabel, updateLabel} from "../api/request";
import toast from "react-hot-toast";

export const LabelsData = () => {
    const [labels, setLabels] = useState([])

    useEffect(() => {
        getLabelList(setLabels)
    },[])

    const labelActions = {
        createLabel: (newName) => {
            createLabel(newName, (createdElement) => {
                const newLabel = [...labels]
                newLabel.push(createdElement)
                setLabels(newLabel)
                toast.success("Created")
            })
        },
        updateLabel: (e) => {
            const newLabels = [...labels]
            const updatedIndex = newLabels.findIndex(item => item['id'] === e['id'])
            newLabels[updatedIndex] = e
            setLabels(newLabels)
            updateLabel(e)
        },
        deleteLabel: (e, refreshTaskList) => {
            const newLabels = labels.filter(el => el['id'] !== e['id'])
            setLabels(newLabels)
            removeLabel(e, refreshTaskList)
        }
    }

    return {
        labels,
        setLabels,
        labelActions
    };
};
