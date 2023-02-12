import style from "./Info.module.css";
import {ModalComp} from "../../common/components/Modal/ModalComp";
import React, {useEffect, useState} from "react";
import {changePosition, createPage, deletePage, getPageList} from "./InfoActions";
import {ListItem} from "./ListItem";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {InputTextComp} from "../../common/components/InputText/InputTextComp";
import {ReactComponent as AddIcon} from "../../common/img/plus.svg"
import {ReactComponent as DeleteIcon} from "../../common/img/delete.svg"
import {ReactComponent as UpIcon} from "../../common/img/arrow-up.svg"
import toast from "react-hot-toast";

export const PageListModal = ({
                                  openModal,
                                  closeModal,
                                  currentSpace,
                                  generateHistoryPathByPageId,
                              }) => {

    const [pageList, setPageList] = useState([])
    const [parentId, setParentId] = useState()
    const [newPageName, setNewPageName] = useState("")

    function closeModalWrapper() {
        setParentId(undefined)
        setNewPageName("")
        closeModal()
    }

    function updatePageList(tst = () => {}) {
        getPageList(currentSpace['id'], (e) => {
            setPageList(e)
            tst()
        })
    }

    useEffect(() => {
        if (openModal) {
            updatePageList()
        }
    }, [openModal])

    return <ModalComp
        isOpen={openModal}
        content={
            <div className={style.modalWindow}>
                <div className={style.modalElement}>
                    <InputTextComp
                        title={"New page name"}
                        acceptChanges={setNewPageName}
                    />
                    <ButtonComp
                        icon={<AddIcon/>}
                        tooltipText={"Create page"}
                        onClick={() => {
                            createPage(currentSpace.id, newPageName, parentId, () => {
                                updatePageList(() => toast.success("Page '" + newPageName + "' created"))
                                setNewPageName("")
                            })
                        }}
                    />
                </div>

                {!!parentId && <div className={style.modalElement}>
                    <ButtonComp
                        icon={<UpIcon/>}
                        tooltipText={"Move up"}
                        onClick={() => changePosition(currentSpace.id, parentId, -1, updatePageList)}
                    />

                    <ButtonComp
                        icon={<UpIcon style={{transform: 'rotate(180deg)'}}/>}
                        tooltipText={"Move down"}
                        onClick={() => changePosition(currentSpace.id, parentId, 1, updatePageList)}
                    />

                    <ButtonComp
                        icon={<DeleteIcon/>}
                        onClick={() => {
                            deletePage(currentSpace.id, parentId, () => {
                                updatePageList()
                                setParentId(undefined)
                                toast.success("Deleted")
                            })
                        }}
                    />
                </div>}

                <div className={style.modalContent}>
                    {pageList.map((e) => <ListItem
                        key={e.id}
                        itemData={e}
                        generateHistoryPathByPageId={generateHistoryPathByPageId}
                        closeModal={closeModalWrapper}
                        setParentId={setParentId}
                        parentId={parentId}
                    />)}
                </div>

                <ButtonComp
                    text={"Close"}
                    minWidth={"5em"}
                    tooltipText={"Close"}
                    onClick={closeModalWrapper}
                />

            </div>}
        onClickOutsideHandler={closeModalWrapper}
    />
}