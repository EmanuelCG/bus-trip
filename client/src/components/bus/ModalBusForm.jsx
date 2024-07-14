import CreateBusModal from './CreateBusModal';
import EditBusModal from './EditBusModal';

export default function ModalBusForm({ isOpenCreate, onCloseCreate, isOpenEdit, onCloseEdit, buses, currentBus, setBus }) {

    return (
        <>
            {isOpenCreate && (<CreateBusModal isOpen={isOpenCreate} onClose={onCloseCreate} setBus={setBus} buses={buses} />)}
            {isOpenEdit && (<EditBusModal isOpen={isOpenEdit} onClose={onCloseEdit} buses={buses} setBus={setBus} currentBus={currentBus} />)}

        </>

    )

}

