import React, { useState } from 'react';
import './ProcessStart.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ProcessStart = (props) => {
    const { onStepFinish } = props;
    const processUrl = 'https://demo-credit.herokuapp.com/api/start';
    const [clientCode, setClientCode] = useState('');
    const [errorOpen, setErrorOpen] = useState(false)

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleCodeChange = ev => {
        const code = ev.target.value;
        const regExp = /^[0-9]*$/
        if (regExp.test(code) && code.length < 9) {
            setClientCode(code);
        }
    }

    const handleErrorClose = (ev, reason) => {
        if (reason === 'clickaway') {
            return;
        }
      
        setErrorOpen(false);
    }

    const getProcessData = () => {
        if (!clientCode || clientCode.length < 8) {
            setErrorOpen(true);
            return;
        }

        fetch(processUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientCode,
            }),
        })
            .then(res => res.json())
            .then(data => {
                onStepFinish({
                    started: true,
                    processId: data.processId,
                    taskId: data.taskId,
                    clientCode
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    const StartButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText('#01935d'),
            backgroundColor: '#01935d',
            marginTop: '10px',
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
            <h3 className="start__text">
                Для початку процесу заповнення заявки введіть ЄДРПОУ клієнта і натисніть кнопку
            </h3>
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
                        Розпочати
                </StartButton>
            </form>
            <Snackbar open={errorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error">
                    Введіть будь-ласка валідний код ЄДРПОУ
                </Alert>
            </Snackbar>
        </div>
        
    );
};

export default ProcessStart;