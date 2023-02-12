import React, {useEffect, useState} from "react";
import style from "./Info.module.css";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {ReactComponent as LockOpenIcon} from "../../common/img/lock-open.svg"
import {ReactComponent as LockCloseIcon} from "../../common/img/lock-close.svg"
import {ReactComponent as OptionsIcon} from "../../common/img/options.svg"
import {ReactComponent as AddIcon} from "../../common/img/plus.svg"
import {ReactComponent as PageListIcon} from "../../common/img/list-ul.svg"
import {useNavigate, useParams} from "react-router-dom";
import {SelectComp} from "../../common/components/Select/SelectComp";
import {getSpacesList} from "./InfoActions";
import toast from "react-hot-toast";
import {CreateSpaceModal} from "./CreateSpaceModal";
import {EditSpaceModal} from "./EditSpaceModal";
import {PageListModal} from "./PageListModal";
import {PageComp} from "./Page/PageComp";

const PRIVATE = "private"
const PUBLIC = "public"

export const InfoComp = () => {
    // common attrs
    const {visibility} = useParams()
    const {spaceId} = useParams()
    // const {pageId} = useParams()
    const history = useNavigate()
    const [isPrivate, setIsPrivate] = useState(visibility === PRIVATE)
    const [spaceList, setSpaceList] = useState([])
    const [selectedSpace, setSelectedSpace] = useState(null)

    // space
    const [newSpaceName, setNewSpaceName] = useState("")
    const [openModal_createSpace, setOpenModal_createSpace] = useState(false)
    const [openModal_editSpace, setOpenModal_editSpace] = useState(false)
    const [openModal_pageList, setOpenModal_pageList] = useState(false)

    function generateHistoryPathByPageId(pageId, space = selectedSpace) {
        let path = "/info/" + (isPrivate ? PRIVATE : PUBLIC)
        if (!!space) {
            path += "/" + space['id']
            if (!!pageId) {
                path += "/" + pageId
            }
        }
        return path
    }

    function selectSpace(space) {
        console.log("Select space=", space)
        setSelectedSpace(space)
        history(generateHistoryPathByPageId(null, space))
        /*if (!!space) {
            history("/info/" + (isPrivate ? PRIVATE : PUBLIC) + "/" + space['id'])
        } else {
            history("/info/" + (isPrivate ? PRIVATE : PUBLIC))
        }*/
    }

    // function selectPage(pageId) {

    // }

    function changeIsPrivate(newValue = true) {
        let newIsPrivate = !!newValue
        setIsPrivate(newIsPrivate)
        history("/info/" + (newIsPrivate ? PRIVATE : PUBLIC))
        getSpacesList(newIsPrivate, setSpaceList)
        setSelectedSpace(null)
    }

    function init() {
        // Load space list, then select page (if need)
        console.log("Init. isPrivate=" + isPrivate.toString() + ", spaceId=" + spaceId)
        getSpacesList(isPrivate, (list) => {
            setSpaceList(list)
            if (!!spaceId) {
                let el = list.find(e => e['id'].toString() === spaceId)
                if (!!el) {
                    setSelectedSpace(el)
                } else {
                    setSelectedSpace(null)
                    toast.error("Space id=" + spaceId + " not found")
                }
            }
        })
    }

    // on component load
    useEffect(init,[])

    return <div className={style.wrapper}>

        <div className={style.pagePart}>
            <div className={style.actionElement}>
                {
                    isPrivate
                        ? <ButtonComp
                            tooltipText={"Show public pages"}
                            icon={<LockCloseIcon/>}
                            onClick={() => changeIsPrivate(false)}
                        />
                        : <ButtonComp
                            tooltipText={"Show private pages"}
                            icon={<LockOpenIcon/>}
                            onClick={() => changeIsPrivate(true)}
                        />
                }
            </div>
            <div className={style.actionElement}>
                <SelectComp
                    key={isPrivate ? 0 : 1}
                    defaultText={"Select space"}
                    defaultSelectedValue={selectedSpace}
                    values={spaceList}
                    onChange={(e) => {selectSpace(e)}}
                />
            </div>
            <div className={style.actionElement}>
                <ButtonComp
                    icon={<AddIcon/>}
                    tooltipText={"Create space"}
                    onClick={() => setOpenModal_createSpace(true)}
                />
            </div>
            { !!selectedSpace &&
                <div className={style.actionElement}>
                    <ButtonComp
                        icon={<OptionsIcon/>}
                        tooltipText={"Edit space"}
                        onClick={() => setOpenModal_editSpace(true)}
                    />
                </div>}
            {!!selectedSpace &&
                <div className={style.actionElement}>
                <ButtonComp
                    icon={<PageListIcon/>}
                    tooltipText={"Show list of pages"}
                    onClick={() => setOpenModal_pageList(true)}
                />
            </div>}
        </div>

        <PageComp/>

        <CreateSpaceModal
            openModal={openModal_createSpace}
            setNewSpaceName={setNewSpaceName}
            closeModal={() => {
                setOpenModal_createSpace(false)
                setNewSpaceName("")
            }}
            newSpaceName={newSpaceName}
            isPrivate={isPrivate}
            setSpaceList={setSpaceList}
        />

        {!!selectedSpace && <EditSpaceModal
            key={spaceId}
            openModal={openModal_editSpace}
            closeModal={() => {
                setOpenModal_editSpace(false)
            }}
            currentSpace={selectedSpace}
            updateSpaceList={init}
        />}
        {!!selectedSpace && <PageListModal
            openModal={openModal_pageList}
            closeModal={() => {
                setOpenModal_pageList(false)
            }}
            currentSpace={selectedSpace}
            generateHistoryPathByPageId={generateHistoryPathByPageId}
        />}

    </div>
}