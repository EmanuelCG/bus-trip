import CreateModal from "./CreateModal";
import EditModal from "./EditModal";

export default function ModalForm({ isOpenCreate, onCloseCreate, isOpenEdit, onCloseEdit, journeyDriver, setJourneyDriver, current, states }) {
    return (
        <>
            {isOpenCreate && <CreateModal isOpenCreate={isOpenCreate} onCloseCreate={onCloseCreate} journeyDriver={journeyDriver} setJourneyDriver={setJourneyDriver} states={states} />}
            {isOpenEdit && <EditModal isOpenEdit={isOpenEdit} onCloseEdit={onCloseEdit} setJourneyDriver={setJourneyDriver} journeyDriver={journeyDriver} current={current} states={states} />}
        </>
    )

}