import React, { useState } from 'react';
import './ProcessStart.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const ProcessStart = (props) => {
    const { onStepFinish } = props;
    const processUrl = 'https://wisconsin.integrity.com.ua/engine-rest/process-definition/key/ukrsibbank-demo-credit/start';
    const taskUrl = 'https://wisconsin.integrity.com.ua/engine-rest/task?processInstanceId=%D0%98%D0%94_%D0%9F%D0%A0%D0%9E%D0%A6%D0%95%D0%A1%D0%A1%D0%90';
    const [clientCode, setClientCode] = useState('');

    const handleCodeChange = ev => {
        const code = ev.target.value;
        const regExp = /^[0-9]*$/
        if (regExp.test(code) && code.length < 9) {
            setClientCode(code);
        }
    }

    const getProcessData = async () => {
        const response = await fetch(processUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                variables: {
                    clientIdentificationCode: {
                        value: '3385308153',
                    },
                },
            }),
        });
        console.log(response);
    }

    const StartButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText('#01935d'),
            backgroundColor: '#01935d',
            '&:hover': {
                backgroundColor: '#00ab7b',
            }
        }
    }))(Button);

    const CodeField = withStyles((theme) => ({
        root: {
            '& label.Mui-focused': {
                color: '#01935d',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#01935d',
            },
            '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                    borderColor: '#01935d',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#01935d',
                },
            },
        }
    }))(TextField);

    return (
        <div className="wrapper start">
            <p className="start__text">
                Для початку процесу заповнення заявки введіть ЄДРПОУ клієнта і натисніть кнопку
            </p>
            <form autoComplete="off" className="start__form">
                <CodeField
                    id="client-code"
                    label="ЄДРПОУ клієнта"
                    variant="outlined"
                    value={clientCode}
                    onChange={handleCodeChange}
                    autoFocus
                />
                <StartButton
                    variant="contained"
                    color="primary"
                    onClick={getProcessData}>
                        Пошук
                </StartButton>
            </form>
        </div>
    );
};

export default ProcessStart;