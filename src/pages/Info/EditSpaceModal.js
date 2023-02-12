import style from "./Info.module.css";
import {InputTextComp} from "../../common/components/InputText/InputTextComp";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {deleteSpace, updateSpace} from "./InfoActions";
import toast from "react-hot-toast";
import {ModalComp} from "../../common/components/Modal/ModalComp";
import React, {useEffect, useState} from "react";

export const EditSpaceModal = ({
                                   openModal,
                                   closeModal,
                                   currentSpace,
                                   updateSpaceList
                                 }) => {
    const [original, setOriginal] = useState(currentSpace['title'])

    useEffect(() => {setOriginal(currentSpace['title'])}, [currentSpace['title']])

    if (!currentSpace) {
        closeModal()
        return <div/>
    }
    function exitAndDiscard() {
        currentSpace['title'] = original
        closeModal()
    }


    return <ModalComp
        isOpen={openModal}
        content={
            <div className={style.modalWindow}>
                <h3>Edit space</h3>
                <div className={style.modalElement}>
                    <InputTextComp
                        title={"Space Name"}
                        defaultText={currentSpace['title']}
                        acceptChanges={(newVal) => {
                            currentSpace['title'] = newVal
                        }}
                    />
                </div>
                <div className={style.modalElement}>
                    {/* TODO: make confirm dialogue */}
                    <ButtonComp
                        text={"Delete"}
                        minWidth={"5em"}
                        tooltipText={"Delete the Space"}
                        onClick={() => {
                            deleteSpace(currentSpace['id'], updateSpaceList)
                            closeModal()
                        }}
                    />

                    <ButtonComp
                        text={"Cancel"}
                        minWidth={"5em"}
                        tooltipText={"Cancel creating Space"}
                        onClick={exitAndDiscard}
                    />
                    <ButtonComp
                        text={"Apply"}
                        minWidth={"5em"}
                        tooltipText={"Edit Space"}
                        onClick={() => {
                            console.log("New object: ", currentSpace)
                            updateSpace(currentSpace, (e) => {
                                updateSpaceList(e)
                                toast.success("Updated")
                            })
                            // TODO: change active space name to new
                            closeModal()
                        }}
                    />
                </div>
            </div>}
        onClickOutsideHandler={exitAndDiscard}
    />
}