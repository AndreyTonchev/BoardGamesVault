import React, { useState } from 'react';
import {
    FaSortAmountDown as Descending,
    FaSortAmountUp as Ascending,
    FaAngleDown as Arrow,
} from 'react-icons/fa';

function Dropdown({ options, hasSortDirection = false, type, onSelect }) {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <div className="group relative container w-40 hover:rounded-b-none hover:shadow-none">
            <span className="flex cursor-pointer flex-row items-center justify-between">
                {type}
                <Arrow className="transition-transform group-hover:rotate-180" />
            </span>
            <ul className="absolute left-0 z-10 container m-0 hidden w-full flex-col space-y-1 overflow-hidden group-hover:block group-hover:rounded-t-none">
                {options.map((option) => {
                    return hasSortDirection ? (
                        <React.Fragment key={option}>
                            <li
                                className="flex w-full flex-row items-center justify-between gap-1 hover:cursor-pointer hover:text-amber-200"
                                key={`${option.toLowerCase()}_asc`}
                                onClick={() =>
                                    onSelect(
                                        `${option.split(' ').join('').toLowerCase()}_asc`,
                                    )
                                }
                            >
                                <span>{option}</span>
                                <Ascending />
                            </li>
                            <li
                                className="flex w-full flex-row items-center justify-between gap-1 hover:cursor-pointer hover:text-amber-200"
                                key={`${option.toLowerCase()}_desc`}
                                onClick={() =>
                                    onSelect(
                                        `${option.split(' ').join('').toLowerCase()}_desc`,
                                    )
                                }
                            >
                                <span>{option}</span>
                                <Descending />
                            </li>
                        </React.Fragment>
                    ) : (
                        <li
                            onClick={() =>
                                onSelect(
                                    option.split(' ').join('').toLowerCase(),
                                )
                            }
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
