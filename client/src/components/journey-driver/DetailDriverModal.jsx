import { useEffect, useRef, useState } from "react";
import { handleFetchOneDriver } from '../../helpers/formHandlers'
export default function DetailDriverModal({ open, setOpen, driver, position }) {

    const [data, setData] = useState(null)
    const modalRef = useRef();


    useEffect(() => {
        async function getDriver() {
            if (driver) {
                const res = await handleFetchOneDriver(driver)
                console.log(res)
                setData(res)
            }
        }
        getDriver();
    }, [driver])

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setOpen]);

    return (
        <>
            {/* // ---------- DRIVER MODAL ---------- // */}

            <div id="detail-driver-modal" tabIndex="-1" aria-hidden="true" className={`fixed z-50 ${open ? 'block' : 'hidden'} mt-2 ml-[-5%]`} style={{ top: position.top, left: position.left }}>
                <div className="absolute left-0 right-0 w-56 mx-auto mt-2">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-gray-100 rounded-lg shadow-lg">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-end">
                            <span className="bg-blue-500 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded tracking-wide mb-2">DETAIL DRIVER</span>
                            <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto" data-modal-toggle="edit-bus-modal" onClick={() => setOpen(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <table className="text-sm table-auto">
                            <tbody>
                                {

                                    <>
                                        <tr>
                                            <td className="pr-2 font-semibold">Driver ID</td>
                                            <td>{data?.id}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-2 font-semibold">FullNames</td>
                                            <td>{data?.names} {data?.last_names}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-2 font-semibold">Identity</td>
                                            <td>{data?.document}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-2 font-semibold">Bus ID</td>
                                            <td>{data?.bus}</td>
                                        </tr>
                                        <tr>
                                            <td className="pr-2 font-semibold">Bus Plate</td>
                                            <td>{data?.bus_plate}</td>
                                        </tr>
                                    </>


                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* // ---------- END DRIVER MODAL ---------- // */}
        </>
    )
}