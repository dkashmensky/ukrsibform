import React, { useEffect, useState } from 'react';
import './CreditForm.scss';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DocIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';

const StyledField = withStyles((theme) => ({
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

const SubmitButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#01935d'),
        backgroundColor: '#01935d',
        marginTop: '20px',
        '&:hover': {
            backgroundColor: '#00ab7b',
        },
        width: '200px'
    }
}))(Button);

const GreenCheckbox = withStyles({
    root: {
      color: '#01935d',
      '&$checked': {
        color: '#01935d',
      },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CreditForm = (props) => {
    const { processId, taskId, clientCode } = props.data;
    const submitUrl = 'https://demo-credit.herokuapp.com/api/submit';
    const productsUrl = 'https://demo-credit.herokuapp.com/api/products';
    const fileUrl = 'https://demo-credit.herokuapp.com/api/file'
    const [currency, setCurrency] = useState('');
    const [type, setType] = useState('');
    const [sum, setSum] = useState();
    const [companyTerm, setCompanyTerm] = useState();
    const [products, setProducts] = useState([]);
    const [rate, setRate] = useState('');
    const [term, setTerm] = useState('');
    const [orgName, setOrgName] = useState('');
    const [notBankrupt, setNotBankrupt] = useState(false);
    const [noDisputes, setNoDisputes] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [files, setFiles] = useState([]);
    const [fieldsErrorOpen, setFieldsErrorOpen] = useState(false);
    const [submitOpen, setSubmitOpen] = useState(false);
    const [unknownErrorOpen, setUnknownErrorOpen] = useState(false);

    const validateForm = () => {
        if (currency && type && sum && companyTerm && rate && term && orgName && notBankrupt && noDisputes && isCorrect) {
            return true;
        }

        return false
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleErrorClose = (ev, reason) => {
        if (reason === 'clickaway') {
            return;
        }
      
        setFieldsErrorOpen(false);
    }

    const handleUnknownErrorClose = (ev, reason) => {
        if (reason === 'clickaway') {
            return;
        }
      
        setUnknownErrorOpen(false);
    }

    const handleSuccessClose = (ev, reason) => {
        if (reason === 'clickaway') {
            return;
        }
      
        setSubmitOpen(false);
        window.location.reload();
    }

    const handleBankrupt = (ev) => {
        setNotBankrupt(!notBankrupt);
    }
    
    const handleDisputes = (ev) => {
        setNoDisputes(!noDisputes);
    }

    const handleCorrect = (ev) => {
        setIsCorrect(!isCorrect);
    }

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
        setTerm(event.target.value.creditTerm);
        setRate(event.target.value.interestRate);
    };

    const handleSumChange = (ev) => {
        const newSum = ev.target.value;
        if (newSum >= 0) {
            setSum(newSum);
            return;
        }

        setSum(0);
    }

    const handleTermChange = (ev) => {
        const newTerm = ev.target.value;
        if (newTerm >= 0) {
            setCompanyTerm(newTerm);
            return;
        }

        setCompanyTerm(0);
    }

    const handleNameChange = (ev) => {
        const newName = ev.target.value;
        if (newName) {
            setOrgName(newName);
            return;
        }

        setOrgName('');
    }

    const removeFromStateArray = (id) => {
        const tempArray = [...files];
        const elemIndex = tempArray.findIndex(item => item.fileId === id);
        if (elemIndex >= 0) {
            tempArray.splice(elemIndex, 1);
            setFiles(tempArray);
        }
    }

    const handleFileDelete = async (id) => {
        await fetch(fileUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileId: id,
            }),
        })
            .then(data => {
                console.log(data);
                removeFromStateArray(id);
            });
    }

    const handleFileLink = (link) => {
        window.open(`https://wisconsin.integrity.com.ua/${link}`, '_blank');
    }

    const handleFileAttach = async (ev) => {
        const file = ev.target.files[0];
        const data = new FormData();
        data.append('file', file);

        await Axios.post(fileUrl, data).then(res => {
            console.log(res)
            setFiles([...files, res.data.file]);
        })

        //setFiles([...files, { name: 'ecmDocument.pdf', fileId: 'd4c49b94-95e5-4c70-9a3f-9f9e90130106', fileLink: '/ukrsibbank-demo-credit/api/attachment/d4c49b94-95e5-4c70-9a3f-9f9e90130106' }]);
    }

    const getProducts = async () => {
        await fetch(productsUrl)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
            });
    }
    
    const getMonth = (month) => {
        if (month > 8) {
            return month + 1;
        }

        return `0${month + 1}`;
    }

    const getDay = (day) => {
        if (day > 9) {
            return day;
        }

        return `0${day}`;
    }

    const getToday = () => {
        const date = new Date();
        return `${date.getFullYear()}-${getMonth(date.getMonth())}-${getDay(date.getDate())}`
    }

    const [reqDate, setReqDate] = useState(getToday());

    const getFiles = () => {
        return files.map(item => {
            return {
                title: item.name,
                id: item.fileId,
                link: item.fileLink,
            }
        });
    }

    const submitForm = () => {
        if (!validateForm()) {
            setFieldsErrorOpen(true)
            return;
        }

        const loanRequestData = {
            value: {
                requestDate: new Date(reqDate).getTime(),
                identificationCode: clientCode,
                subjectTitle: orgName,
                creditAmount: sum,
                creditCurrency: currency,
                productTitle: type.code,
                subjectLifeTime: companyTerm,
                subjectIsActive: notBankrupt,
                hasNoLitigationsWithBank: noDisputes,
                subjectInfoIsCorrect: isCorrect,
                attachments: getFiles(),
            },
            type: "Object",
            valueInfo: {
                objectTypeName: "ua.com.integrity.bpm.camunda.process.models.CreditRequest",
                serializationDataFormat: "application/json"
            }
        }

        const formData = {
            task: taskId,
            variables: {
                createRequestStepResult: {
                    value: "CREATE"
                },
                loanRequestData,
            }
        }
        console.log(formData)

        fetch(submitUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.status === 204) {
                    setSubmitOpen(true);
                } else {
                    setUnknownErrorOpen(true);
                }
            })
            .catch(err => {
                setUnknownErrorOpen(true);
            });
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="wrapper">
            <h3>Заявка на кредит</h3>
            <form className="credit-form">
                <div className="credit-form__wrapper">
                    <div className="credit-form__fields">
                        <StyledField
                            id="date"
                            label="Дата подачі заявки"
                            type="date"
                            variant="outlined"
                            value={reqDate}
                            InputLabelProps={{shrink: true}}
                            InputProps={{readOnly: true}}
                            required
                        />
                        <StyledField
                            id="org"
                            label="Назва компанії"
                            variant="outlined"
                            InputLabelProps={{shrink: true}}
                            autoComplete="off"
                            value={orgName}
                            onChange={handleNameChange}
                            required
                        />
                        <StyledField
                            id="org"
                            label="Термін діяльності компанії, міс."
                            variant="outlined"
                            type="number"
                            value={companyTerm}
                            onChange={handleTermChange}
                            InputLabelProps={{shrink: true}}
                            autoComplete="off"
                            required
                        />
                        <StyledField
                            id="code"
                            label="ЄДРПОУ"
                            variant="outlined"
                            value={clientCode}
                            InputLabelProps={{shrink: true}}
                            InputProps={{readOnly: true}}
                            required
                        />
                        <StyledField
                            id="sum"
                            label="Сума кредита, грн."
                            variant="outlined"
                            InputLabelProps={{shrink: true}}
                            type="number"
                            value={sum}
                            onChange={handleSumChange}
                            required
                            autoComplete="off"
                        />
                        <div className="credit-form__checkboxes">
                            <FormControlLabel
                                value="notBankrupt"
                                control={<GreenCheckbox onChange={handleBankrupt} checked={notBankrupt} color="primary" />}
                                label="Компанія не в стані припинення діяльності (банкрутство)"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="noDisputes"
                                control={<GreenCheckbox onChange={handleDisputes} checked={noDisputes} color="primary" />}
                                label="Відсутні судові спори з банками"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="isCorrect"
                                control={<GreenCheckbox onChange={handleCorrect} checked={isCorrect} color="primary" />}
                                label="Даю згоду на перевірку даних і підтверджую, що дані вказані коректно"
                                labelPlacement="end"
                            />
                        </div>
                    </div>
                    <div className="credit-form__fields">
                        <FormControl variant="outlined">
                            <InputLabel id="currency-label" shrink>Валюта</InputLabel>
                            <Select
                                labelId="currency-label"
                                id="currency"
                                value={currency}
                                label="Валюта"
                                onChange={handleCurrencyChange}
                                required
                                notched
                            >
                                <MenuItem value="UAH">UAH</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel id="type-label" shrink>Програма кредитування</InputLabel>
                            <Select
                                labelId="type-label"
                                id="type"
                                value={type}
                                label="Програма кредитування"
                                onChange={handleTypeChange}
                                required
                                notched
                            >
                                {products.map(item => {
                                    return <MenuItem value={item}>{item.title}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <StyledField
                            id="rate"
                            label="Кредитна ставка, %"
                            variant="outlined"
                            InputLabelProps={{shrink: true}}
                            InputProps={{readOnly: true}}
                            value={rate}
                            required
                        />
                        <StyledField
                            id="term"
                            label="Термін кредитування, міс."
                            variant="outlined"
                            InputLabelProps={{shrink: true}}
                            InputProps={{readOnly: true}}
                            value={term}
                            required
                        />
                        <div className="credit-form__file">
                            <input
                                className="credit-form__file-input"
                                accept="application/pdf"
                                type="file"
                                id="contained-button-file"
                                onChange={handleFileAttach}
                            />
                            <label htmlFor="contained-button-file">
                                <SubmitButton variant="contained" color="primary" component="span">
                                Завантажити файл
                                </SubmitButton>
                            </label>
                        </div>
                        <div className="">
                            
                            <List component="nav" aria-label="main mailbox folders">
                                {files.map((item) => {
                                    return <ListItem>
                                                <ListItemIcon>
                                                    <DocIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={item.name} onClick={() => handleFileLink(item.fileLink)} />
                                                <DeleteIcon onClick={() => handleFileDelete(item.fileId)} />
                                            </ListItem>
                                })}
                            </List>
                        </div>
                    </div>
                </div>
                <div className="credit-form__submit">
                    <SubmitButton
                        onClick={submitForm}
                    >
                        Подати заявку
                    </SubmitButton>
                </div>
            </form>
            <Snackbar open={fieldsErrorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error">
                    Заповніть будь-ласка всі необхідні поля
                </Alert>
            </Snackbar>
            <Snackbar open={unknownErrorOpen} autoHideDuration={3000} onClose={handleUnknownErrorClose}>
                <Alert onClose={handleUnknownErrorClose} severity="error">
                    Помилка сервера, спробуйте знову пізніше
                </Alert>
            </Snackbar>
            <Snackbar open={submitOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
                <Alert onClose={handleSuccessClose} severity="success">
                    Заявка успішно відправлена!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CreditForm;