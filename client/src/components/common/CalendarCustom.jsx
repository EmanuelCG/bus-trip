import DatePicker from "react-datepicker";

export default function CalendarCustom({ startDate, setStartDate, odb }) {
    const currentYear = new Date().getFullYear()
    const years = Array.from(new Array(120), (x, i) => currentYear - i);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];


    return (
        <DatePicker
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
            }) => (
                <div
                    style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {/* <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"<"}
                    </button> */}
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 py-0 mr-1 ml-1"
                        value={date.getFullYear()}
                        onChange={({ target: { value } }) => changeYear(value)}
                    >
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 py-0 mr-1"
                        value={months[date.getMonth()]}
                        onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                        }
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    {/* <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {">"}
                    </button> */}
                </div>
            )}

            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Year/Mounth/Day"
            isClearable
            dateFormat="YYYY-MM-dd"
            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            calendarClassName="shadow-lg border border-gray-300 rounded-md"
            dayClassName={() => "text-sm p-1 rounded-full hover:bg-gray-200"}
            wrapperClassName="w-full"
        />
    );

}