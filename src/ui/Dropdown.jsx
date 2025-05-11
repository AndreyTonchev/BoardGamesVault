import { useState } from 'react';
import {
    FaSortAmountDown as Descending,
    FaSortAmountUp as Ascending,
    FaAngleDown as Arrow,
} from 'react-icons/fa';

function Dropdown({
    options,
    hasSortDirection = false,
    multiple = false,
    type,
    onSelect,
}) {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <div className="group relative container w-40 hover:rounded-b-none hover:shadow-none">
            <span className="flex cursor-pointer flex-row items-center justify-between">
                {type}
                <Arrow className="transition-transform group-hover:rotate-180" />
            </span>
            <ul className="absolute left-0 z-10 container m-0 hidden w-full flex-col space-y-1 overflow-hidden group-hover:block group-hover:rounded-t-none">
                {options.map((option) => {
                    return hasSortDirection ? (
                        <>
                            <li
                                className="flex w-full flex-row items-center justify-between gap-1 hover:cursor-pointer hover:text-amber-200"
                                onClick={() =>
                                    onSelect(`${option.toLowerCase()}_asc`)
                                }
                                key={`${option.toLowerCase()}_asc`}
                            >
                                <span>{option}</span>
                                <Ascending />
                            </li>
                            <li
                                onClick={() =>
                                    onSelect(`${option.toLowerCase()}_desc`)
                                }
                                className="flex w-full flex-row items-center justify-between gap-1 hover:cursor-pointer hover:text-amber-200"
                                key={`${option.toLowerCase()}_desc`}
                            >
                                <span>{option}</span>
                                <Descending />
                            </li>
                        </>
                    ) : (
                        <li
                            onClick={() => onSelect(option.toLowerCase())}
                            className="hover:cursor-pointer hover:text-amber-200"
                            key={option}
                        >
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Dropdown;

{
    /* <div class="dropdown-type container">
<button class="dropdown-type-btn">
    <span class="dropdown-type-span">All</span>
    <svg class="dropdown-svg default-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="dropdown-svg-path fill-svg" fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"/></svg>
</button>

<ul class="dropdown-type-content container"> 
    <li class="dropdown-type-option">All</li>
    <li class="dropdown-type-option">Movie</li>
    <li class="dropdown-type-option">Series</li>
    <li class="dropdown-type-option">Episode</li>
</ul>
</div> */
}
