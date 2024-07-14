import CreateJourneyModal from "./CreateJourneyModal";
import EditJourneyModal from "./EditJourneyModal";

export default function ModalJourneyForm({ isOpenCreate, onCloseCreate, isOpenEdit, onCloseEdit, journeys, setJourneys, currentJourney }) {
    return (
        <>
            {isOpenCreate && <CreateJourneyModal isOpenCreate={isOpenCreate} onCloseCreate={onCloseCreate} journeys={journeys} setJourneys={setJourneys} />}
            {isOpenEdit && <EditJourneyModal isOpenEdit={isOpenEdit} onCloseEdit={onCloseEdit} setJourneys={setJourneys} journeys={journeys} currentJourney={currentJourney} />}
        </>
    )

}