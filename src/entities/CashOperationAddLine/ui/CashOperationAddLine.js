import React, {useState} from 'react';
import style from './CashOperationAddLine.module.css';
import {ButtonComp} from "../../../shared/ui/Button/ButtonComp";
import {InputTextComp} from "../../../shared/ui/InputText/InputTextComp";
import {SelectComp} from "../../../shared/ui/Select/SelectComp";
import {useIcons} from "../../../shared/lib/hooks/iconsContext";
import {stringToComponent} from "../../../shared/lib/ComponentConvertor";
import {elementComparatorByName} from "../../../shared/lib/Comparator";

export const CashOperationAddLine = ({Wallet, Operation}) => {
    const icons = useIcons()
/*
    private CashWalletCellDto walletCellSource;
    private CashWalletCellDto walletCellDestination;
    private CashProductDto product;
    private Long created;
    private Long completeDate;
    private Float sum;
    private Float rate;
    private Float transferFee;
    private String compositeSum;
    private String notes;
    private Boolean isAutofill;
 */
    const [sum, setSum] = useState(0)
    const [product, setProduct] = useState({})
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)

    const availableCells = Wallet
        .list
        .filter(w => !w.hidden)
        .flatMap(w => w.cells)
        .filter(cell => !cell.hidden)
        .sort(elementComparatorByName)
        .map(cell => {return {
            id: cell.id,
            title: cell.name,
            icon: stringToComponent(icons.find(ico => cell.icon === ico.name)['svg'])
        }})

    return <div className={style.wrapper}>
        <ButtonComp
            text={"Create"}
            onClick={() => {
                if (!sum || (!from && !to)) return;
                // Operation.create(null, sum, from, to)
                Operation.create({name: product}, sum, from, to)
            }}
        />
        <InputTextComp
            title={"Product"}
            acceptChanges={setProduct}
        />
        <InputTextComp
            title={"Sum"}
            acceptChanges={setSum}
        />
        <SelectComp
            values={availableCells}
            defaultText={"from"}
            clearSelectValue={true}
            onChange={setFrom}
        />
        <SelectComp
            values={availableCells}
            defaultText={"to"}
            clearSelectValue={true}
            onChange={setTo}
        />
    </div>
}
