import style from "./Info.module.css";
import {InputTextComp} from "../../common/components/InputText/InputTextComp";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {deleteSpace, updateSpace} from "./InfoActions";
import toast from "react-hot-toast";
import {ModalComp} from "../../common/components/Modal/ModalComp";
import React from "react";

export const EditSpaceModal = ({
                                   openModal,
                                   closeModal,
                                   currentSpace,
                                   updateSpaceList
                                 }) => {

    if (!currentSpace) {
        closeModal()
        return <div/>
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
                        onClick={closeModal}
                    />
                    <ButtonComp
                        text={"Apply"}
                        minWidth={"5em"}
                        tooltipText={"Edit Space"}
                        onClick={() => {
                            console.log("New object: ", currentSpace)
                            updateSpace(currentSpace, () => {
                                toast.success("Updated")
                            })
                            // TODO: change active space name to new
                            closeModal()
                        }}
                    />
                </div>
            </div>}
        onClickOutsideHandler={closeModal}
    />
}