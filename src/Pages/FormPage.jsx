import React, { useState } from 'react';
import ProcessStart from '../Components/ProcessStart/ProcessStart';
import CreditForm from '../Components/CreditForm/CreditForm';

const FormPage = () => {
    const [processState, setProcessState] = useState({
        started: false,
        processId: 0,
        taskId: 0,
        clientCode: '',
    });

    const setProcessData = (data) => {
        setProcessState(data);
    }

    return (
        <>
            {processState.started ? <CreditForm key="credit-form-1" data={processState} /> : <ProcessStart key="start-1" onStepFinish={setProcessData} />}
        </>
    );
};

export default FormPage;