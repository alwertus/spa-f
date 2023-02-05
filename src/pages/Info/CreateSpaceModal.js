import style from "./Info.module.css";
import {InputTextComp} from "../../common/components/InputText/InputTextComp";
import {ButtonComp} from "../../common/components/Button/ButtonComp";
import {createSpace, getSpacesList} from "./InfoActions";
import toast from "react-hot-toast";
import {ModalComp} from "../../common/components/Modal/ModalComp";
import React from "react";

export const CreateSpaceModal = ({
                                     openModal,
                                     setNewSpaceName,
                                     closeModal,
                                     newSpaceName,
                                     isPrivate,
                                     setSpaceList,
                                 }) => <ModalComp
    isOpen={openModal}
    content={
        <div className={style.modalWindow}>
            <h3>Create space</h3>
            <div className={style.modalElement}>
                <InputTextComp
                    title={"Space Name"}
                    acceptChanges={(newVal) => {setNewSpaceName(newVal)}}
                />
            </div>
            <div className={style.modalElement}>
                <ButtonComp
                    text={"Cancel"}
                    minWidth={"5em"}
                    tooltipText={"Cancel creating Space"}
                    onClick={closeModal}
                />
                <ButtonComp
                    text={"OK"}
                    minWidth={"5em"}
                    tooltipText={"Create Space"}
                    onClick={() => {
                        createSpace(newSpaceName,
                            isPrivate,
                            () => {
                                getSpacesList(isPrivate,
                                    (data) => {
                                        setSpaceList(data)
                                        toast.success("Space created")
                                    })
                                // TODO: select new space as active
                            })
                        closeModal()
                    }}
                />
            </div>
        </div>}
    onClickOutsideHandler={closeModal}
/>