import CreateDriverModal from "./CreateDriverModal";
import EditDriverModal from "./EditDriverModal";


export default function ModalDriverForm({ isOpenCreate, onCloseCreate, isOpenEdit, onCloseEdit, drivers, currentDriver, setDrivers }) {

    return (
        <>
            {isOpenCreate && (<CreateDriverModal isOpen={isOpenCreate} onClose={onCloseCreate} setDrivers={setDrivers} drivers={drivers} />)}
            {isOpenEdit && (<EditDriverModal isOpen={isOpenEdit} onClose={onCloseEdit} drivers={drivers} setDrivers={setDrivers} currentDriver={currentDriver} />)}
        </>

    )

}

