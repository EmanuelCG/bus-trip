import { useEffect, useState } from "react"
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PlusIcon } from "@heroicons/react/24/solid";
import { deleteJourney, getAllJourney } from "../api/journeyApi";
import ModalJourneyForm from "../components/journey/ModalJouneyForm";
import { DataTableJourney } from "../components/journey/DataTableJourney";

export function JourneyPage() {

    const [journeys, setJourneys] = useState([])
    const [createModalJourneyOpen, setCreateModalJourneyOpen] = useState(false);
    const [editModalJourneyOpen, setEditModalJouneyOpen] = useState(false);
    const [currentJourney, setCurrentJourney] = useState(null)

    useEffect(() => {
        async function loadBus() {
            const res = await getAllJourney();
            setJourneys(res.data);
        }
        loadBus()
    }, []);

    const handleEdit = (bus) => {
        setCurrentJourney(bus)
        setEditModalJouneyOpen(true);
    }

    const handleDelete = async (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 ">
                        <div className="overflow-hidden bg-white rounded-lg shadow-lg w-96">
                            <div className="p-4">
                                <h1 className="mb-2 text-xl font-bold">Confirm deleted</h1>
                                <p className="mb-4 text-gray-700">
                                    Are you sure want to delete this element?
                                </p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={async () => {
                                            const res = await deleteJourney(id);
                                            if (res.status === 204) {
                                                setJourneys((prevJourneys) =>
                                                    prevJourneys.filter((journey) => journey.id !== id)
                                                );
                                                toast.error("¡Journey deleted succesfully!", {
                                                    theme: "colored",
                                                    position: "top-center",
                                                });
                                            } else {
                                                toast.error("Oh, it is not possible to delete journey. Try again!", {
                                                    theme: "colored",
                                                    position: "top-center",
                                                });
                                            }
                                            onClose();
                                        }}
                                        className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                                    >
                                        Sí
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 ml-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            },
        });
    };

    return (
        <div className="max-w-[1400px] p-4 grid grid-cols-2">
            <div className="col-span-1">
                <h2 className="mb-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">Tracking <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded tracking-wide">Journey</span></h2>
            </div>
            <div className="flex justify-end col-span-1 h-14">
                <button data-modal-target="create-driver-modal" data-modal-toggle="create-driver-modal" href="" type="button" className="flex items-center justify-center focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition-all" onClick={() => setCreateModalJourneyOpen(true)}><span>Register Journey</span><PlusIcon className="ml-4 size-4" /></button>
            </div>
            <ModalJourneyForm
                isOpenCreate={createModalJourneyOpen}
                onCloseCreate={() => setCreateModalJourneyOpen(false)}
                isOpenEdit={editModalJourneyOpen}
                onCloseEdit={() => setEditModalJouneyOpen(false)}
                setJourneys={setJourneys}
                journeys={journeys}
                currentJourney={currentJourney} />

            <DataTableJourney data={journeys} onEdit={handleEdit} onDelete={handleDelete} setJourneys={setJourneys} />

        </div >
    )

}

