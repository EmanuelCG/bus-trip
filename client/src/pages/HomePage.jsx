import { useNavigate } from 'react-router-dom';

export function Home() {

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center mt-20">
            <div className="bg-slate-200 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">¡Bienvenido a la App de Control de Viajes!</h1>
                <p className="text-gray-700 mb-8">Gestiona tus viajes, pasajeros y más de manera fácil y eficiente.</p>
                <button
                    onClick={() => navigate('/journey')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Comenzar
                </button>
            </div>
        </div>

    )
}
