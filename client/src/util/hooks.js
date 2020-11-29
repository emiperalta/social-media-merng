import { useState } from 'react';

// custom hook
export const useForm = (cb, initialState = {}, errors) => {
    const [inputValues, setInputValues] = useState(initialState);

    const inputValuesHandler = e => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    const submitHandler = e => {
        e.preventDefault();
        cb();
        if (!errors) {
            setInputValues(initialState); //when submit, clear the form fields
        }
    };

    return {
        inputValuesHandler,
        submitHandler,
        inputValues,
    };
};
