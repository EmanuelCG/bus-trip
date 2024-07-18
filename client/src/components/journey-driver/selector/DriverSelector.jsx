
import Select from 'react-select';
import { Controller } from 'react-hook-form';

const DriverSelector = ({ control, name, drivers, defaultValue }) => {
    // console.log(defaultValue)
    const options = drivers.map(driver => ({
        value: driver.id,
        label: (
            <div className='width-full'>
                <div>
                    <span className="bg-blue-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded tracking-wide">Code:</span>
                    <span className="font-semibold">{driver.id}</span>
                </div>
                <div className='grid grid-cols-3 gap-4 pl-2 mt-2 content-stretch'>
                    <div className='text-sm'><span className='font-medium text-gray-900'>Bus ID: </span>{driver.bus}</div>
                    <div className='text-sm'><span className='font-medium text-gray-900'>Name: </span>{driver.names} {driver.last_names}</div>
                    <div className='text-sm'><span className='font-medium text-gray-900'>Origin: </span>{driver.bus_plate}</div>
                </div>
            </div>
        )
    }));

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(249, 250, 251)',
            border: '1px solid rgba(209, 213, 219)',
            color: 'rgba(17, 24, 39)',
            fontSize: '0.875rem',
            borderRadius: '0.5rem',
            padding: '0.625rem',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'rgba(96, 165, 250)'
            },
            '&:focus': {
                borderColor: 'rgba(96, 165, 250)',
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(96, 165, 250, 0.5)'
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'rgba(96, 165, 250)' : state.isFocused ? 'rgba(219, 234, 254)' : undefined,
            color: state.isSelected ? 'white' : 'rgba(17, 24, 39)',
            padding: '0.625rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            border: '1px solid rgba(209, 213, 219)',
            borderRadius: '0.5rem',
            marginTop: '0.25rem',
            zIndex: 20,
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'rgba(107, 114, 128)',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'rgba(17, 24, 39)',
        }),
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">Select Driver</label>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Select
                        {...field}
                        id={name}
                        options={options}
                        styles={customStyles}
                    />
                )}
            />
        </div>
    );
};

export default DriverSelector;