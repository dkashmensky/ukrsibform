import React, { useState } from 'react';
import ProcessStart from '../Components/ProcessStart/ProcessStart';
import CreditForm from '../Components/CreditForm/CreditForm';

const FormPage = () => {
    const [processStarted, setProcessStarted] = useState(false);

    const startProcess = () => {
        setProcessStarted(true);
    }

    return (
        <>
            {processStarted ? <CreditForm /> : <ProcessStart onStepFinish={startProcess} />}
        </>
    );
};

export default FormPage;