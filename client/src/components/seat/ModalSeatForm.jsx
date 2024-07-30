import CreateSeatModal from './CreateSeatModal';
import EditSeatModal from './EditSeatModal';

export default function ModalSeatForm({ isOpenCreate, onCloseCreate, isOpenEdit, onCloseEdit, seats, currentSeat, setSeat }) {

    return (
        <>
            {isOpenCreate && (<CreateSeatModal isOpen={isOpenCreate} onClose={onCloseCreate} setSeat={setSeat} seats={seats} />)}
            {isOpenEdit && (<EditSeatModal isOpen={isOpenEdit} onClose={onCloseEdit} seats={seats} setSeat={setSeat} currentSeat={currentSeat} />)}
        </>

    )

}

