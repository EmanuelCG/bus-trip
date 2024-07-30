import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAllSeat, deleteSeat } from '../api/seatApi'
import { PlusIcon } from "@heroicons/react/24/solid";
import ModalSeatForm from "../components/seat/ModalSeatForm";
import { DataTableSeat } from "../components/seat/DataTableSeat";
export function SeatPage() {
    const [seats, setSeat] = useState([])
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [currentSeat, setCurrentSeat] = useState(null)

    useEffect(() => {
        async function loadPassenger() {
            try {
                const res = await getAllSeat();
                if (Array.isArray(res.data)) {
                    setSeat(res.data);
                } else {
                    console.error('Data received is not an array:', res.data);
                    setSeat([]);
                }
            } catch (error) {
                console.error('Error fetching passenger data:', error)
            }
        }
        loadPassenger();
    }, [])

    const handleEdit = (data) => {
        setCurrentSeat(data)
        setEditModalOpen(true)
    }

    const handleDelete = async (id) => {
        console.log(id)
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 ">
                        <div className="overflow-hidden bg-white rounded-lg shadow-lg w-96">
                            <div className="p-4">
                                <h1 className="mb-2 text-xl font-bold">Attention</h1>
                                <p className="mb-4 text-gray-700">
                                    Are you sure you want to delete this item?
                                </p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={async () => {
                                            const res = await deleteSeat(id);
                                            if (res.status === 204) {
                                                setSeat((prevSeat) =>
                                                    prevSeat.filter((seat) => seat.id !== id)
                                                );
                                                toast.error("¡Elemento eliminado correctamente!", {
                                                    theme: "colored",
                                                    position: "top-center",
                                                });
                                            } else {
                                                toast.error("Error al eliminar el elemento.", {
                                                    theme: "colored",
                                                    position: "top-center",
                                                });
                                            }
                                            onClose();
                                        }}
                                        className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                                    >
                                        Yes
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
        <div className="max-w-[1400px] p-4 mx-auto grid grid-cols-2">
            <div className="col-span-1">
                <h2 className="mb-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">Tracking <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded tracking-wide">Seat</span></h2>
            </div>
            <div className="flex justify-end col-span-1 h-14">
                <button data-modal-target="create-driver-modal" data-modal-toggle="create-driver-modal" href="" type="button" className="flex items-center justify-center focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition-all" onClick={() => setCreateModalOpen(true)}><span>Register Seat</span><PlusIcon className="ml-4 size-4" /></button>
            </div>
            <ModalSeatForm
                isOpenCreate={createModalOpen}
                onCloseCreate={() => setCreateModalOpen(false)}
                isOpenEdit={editModalOpen}
                onCloseEdit={() => setEditModalOpen(false)}
                setSeat={setSeat}
                seats={seats}
                currentSeat={currentSeat} />
            <DataTableSeat data={seats} setSeat={setSeat} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    )

}