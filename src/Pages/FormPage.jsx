import React, { useState } from 'react';
import ProcessStart from '../Components/ProcessStart/ProcessStart';
import CreditForm from '../Components/CreditForm/CreditForm';

const FormPage = () => {
    const [processState, setProcessState] = useState({
        started: false,
        processId: 0,
        taskId: 0,
    });

    const setProcessData = data => {
        setProcessState(data);
    }

    return (
        <>
            {processState.started ? <CreditForm /> : <ProcessStart onStepFinish={setProcessData} />}
        </>
    );
};

export default FormPage;