import React, { useState } from 'react';
import './ProcessStart.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const ProcessStart = (props) => {
    const { onStepFinish } = props;
    const [clientCode, setClientCode] = useState('');

    function isNumber(evt) {
        console.log(evt);
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        console.log(charCode);
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    const handleCodeChange = ev => {
        const code = ev.target.value;
        const regExp = /^[0-9]*$/
        if (regExp.test(code) && code.length < 9) {
            setClientCode(code);
        }
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
                Для початку процесу заповнення заявки введіть ЕДРПОУ клієнта і натисніть кнопку
            </p>
            <form autoComplete="off" className="start__form">
                <CodeField
                    id="client-code"
                    label="ЕДРПОУ клієнта"
                    variant="outlined"
                    value={clientCode}
                    onChange={handleCodeChange}
                    autoFocus
                />
                <StartButton variant="contained" color="primary">Пошук</StartButton>
            </form>
        </div>
    );
};

export default ProcessStart;