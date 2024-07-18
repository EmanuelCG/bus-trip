
import Select from 'react-select';
import { Controller } from 'react-hook-form';

const BusSelector = ({ control, name, buses, defaultValue }) => {
    // console.log(defaultValue)
    const options = buses.map(bus => ({
        value: bus.id,
        label: (
            <div>
                <span className="bg-blue-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded tracking-wide">plate</span>
                <span className="font-semibold">{bus.plate}</span>
                <div className='grid grid-cols-2 pl-2 mt-2 grap-x-1'>
                    <div className='text-sm'><span className='font-medium text-gray-900'>Color: </span>{bus.color}</div>
                    <div className='text-sm'><span className='font-medium text-gray-900'>Brand: </span>{bus.brand}</div>
                    <div className='text-sm'><span className='font-medium text-gray-900'>Model: </span>{bus.model}</div>
                    <div className='text-sm'><span className='font-medium text-gray-900'>Serial: </span>{bus.serial}</div>
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
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">Select a Bus</label>
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

export default BusSelector;