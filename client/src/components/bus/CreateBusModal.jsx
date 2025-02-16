import { useForm } from "react-hook-form";
import { createBus } from "../../api/busApi";
import { toast } from "react-toastify";

export default function CreateBusModal({ isOpen, onClose, setBus, buses }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { placa: "", marca: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    const existingPlate = buses.find((bus) => bus.plate === data.plate);
    const existingSerial = buses.find((bus) => bus.serial === data.serial);

    if (existingPlate) {
      toast.error("La placa ya esta registrada", {
        theme: "colored",
        position: "top-center",
      });

      return
    }

    if (existingSerial) {
      toast.error("La serie ya esta registrada", {
        theme: "colored",
        position: "top-center",
      });

      return
    }

    try {
      const res = await createBus(data);

      if (res.status === 201) {
        setBus([...buses, res.data]);
        toast.success("¡Elemento creado correctamente!", {
          theme: "colored",
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error al crear el bus", {
        theme: "colored",
        position: "top-center",
      });
    }

    reset();
    onClose();
  });

  if (!isOpen) return null;

  return (
    // {/* <!-- Main modal --> */}
    <div
      id="create-bus-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 bg-gray-900 bg-opacity-50 h-full"
    >
      <div className="relative p-4 w-full max-w-3xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Registrar Bus
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="create-bus-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <form className="p-4 md:p-5" onSubmit={onSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-8">
              <div className="col-span-4">
                <label
                  htmlFor="plate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Plate
                </label>
                <input
                  type="text"
                  name="plate"
                  id="plate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="ABC-123"
                  required=""
                  {...register("plate", { required: true })}
                />
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  id="color"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Color"
                  required=""
                  {...register("color", { required: true })}
                />
              </div>
            </div>
            <div className="grid gap-4 mb-4 grid-cols-8">
              <div className="col-span-4">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Brand"
                  required=""
                  {...register("brand", { required: true })}
                />
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="model"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Model"
                  required=""
                  {...register("model", { required: true })}
                />
              </div>
            </div>
            <div className="grid gap-4 mb-4 grid-cols-8">
              <div className="col-span-4">
                <label
                  htmlFor="serial"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Serial
                </label>
                <input
                  type="text"
                  name="serial"
                  id="serial"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Serial"
                  required=""
                  {...register("serial", { required: true })}
                />
                {/* {errors.marca && <span>this field is required</span>} */}
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="year"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  id="year"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Year"
                  inputMode="numeric"
                  maxLength={4}
                  required=""
                  {...register("year", { required: true })}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
