import CreateLocationModal from "./CreateLocationModal";
import EditLocationModal from "./EditLocationModal";

export default function ModalLocationForm({ isOpenCreate, onCloseCreate, isOpenEdit, onCloseEdit, locations, setLocations, currentLocation }) {
    return (
        <>
            {isOpenCreate && <CreateLocationModal isOpenCreate={isOpenCreate} onCloseCreate={onCloseCreate} setLocations={setLocations} locations={locations} />}
            {isOpenEdit && <EditLocationModal isOpenEdit={isOpenEdit} onCloseEdit={onCloseEdit} setLocations={setLocations} locations={locations} currentLocation={currentLocation} />}
        </>
    )

}