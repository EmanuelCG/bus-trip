import CreatePassengerModal from './CreatePassengerModal';
import EditPassengerModal from './EditPassengerModal';

export default function ModalPassengerForm({ isOpenCreate, onCloseCreate, isOpenEdit, onCloseEdit, passengers, currentPassenger, setPassenger }) {

    return (
        <>
            {isOpenCreate && (<CreatePassengerModal isOpen={isOpenCreate} onClose={onCloseCreate} setPassenger={setPassenger} passengers={passengers} />)}
            {isOpenEdit && (<EditPassengerModal isOpen={isOpenEdit} onClose={onCloseEdit} passengers={passengers} setPassenger={setPassenger} currentPassenger={currentPassenger} />)}
        </>

    )

}

