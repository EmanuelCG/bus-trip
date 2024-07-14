import { useEffect, useState } from "react"
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { deleteBus, getAllBus } from '../api/busApi'
import { DataTableBus } from "../components/bus/DataTableBus";
import { PlusIcon } from "@heroicons/react/24/solid";
import ModalBusForm from "../components/bus/ModalBusForm";

export function BusPage() {

    const [buses, setBus] = useState([])
    const [createModalBusOpen, setCreateModalBusOpen] = useState(false);
    const [editModalBusOpen, setEditModalBusOpen] = useState(false);
    const [CurrentBus, setCurrentBus] = useState(null)

    useEffect(() => {
        async function loadBus() {
            const res = await getAllBus();
            setBus(res.data);
        }
        loadBus()
    }, []);

    const handleEdit = (bus) => {
        setCurrentBus(bus)
        setEditModalBusOpen(true);
    }

    const handleDelete = async (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 ">
                        <div className="overflow-hidden bg-white rounded-lg shadow-lg w-96">
                            <div className="p-4">
                                <h1 className="mb-2 text-xl font-bold">Confirmar eliminación</h1>
                                <p className="mb-4 text-gray-700">
                                    ¿Estás seguro de que quieres eliminar este elemento?
                                </p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={async () => {
                                            const res = await deleteBus(id);
                                            if (res.status === 204) {
                                                setBus((prevBuses) =>
                                                    prevBuses.filter((bus) => bus.id !== id)
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
        <div className="max-w-[1400px] p-4 mx-auto">
            <h2 className="mb-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">Tracking <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded tracking-wide">Buss</span></h2>


            <button data-modal-target="create-bus-modal" data-modal-toggle="create-bus-modal" href="" type="button" className="inline-flex focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition-colors" onClick={() => setCreateModalBusOpen(true)}>Agregar unidad <PlusIcon className="ml-4 size-4" /></button>
            <ModalBusForm
                isOpenCreate={createModalBusOpen}
                onCloseCreate={() => setCreateModalBusOpen(false)}
                isOpenEdit={editModalBusOpen}
                onCloseEdit={() => setEditModalBusOpen(false)}
                setBus={setBus}
                buses={buses}
                currentBus={CurrentBus} />

            <DataTableBus data={buses} onEdit={handleEdit} onDelete={handleDelete} setBus={setBus} />

        </div >
    )

}

