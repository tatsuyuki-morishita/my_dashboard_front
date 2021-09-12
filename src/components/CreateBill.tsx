import React from 'react';
import { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, OutlinedInput, Typography, Divider } from "@material-ui/core";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";
import { saveAs } from "file-saver";
import axios from 'axios';

const useStyles = makeStyles({
  gridContainer: {
    margin: "0 0 30px 0"
  },
});

const theme = createTheme();
theme.typography.h2 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

export const CreateBill: React.FC = () => {
    const classes = useStyles();
    const form = useRef(null);
    const [values, setValue] = useState({
      name: "",
      zipcode: "",
      address: "",
      tel: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setValue({
        ...values,
        [name]: value
      });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = new FormData();
        for (const [key, value] of Object.entries(values)) {
            submitData.append(key, value);
        }
        axios.post('http://api.tatsuyuki.work/bill',submitData, {responseType: 'blob'})
          .then(function (response) {
            const blob = new Blob([response.data], {
              type: response.data.type
            });
            saveAs(blob, "Created.xlsx");
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {

          });
    }

    return (
        <form noValidate onSubmit={handleSubmit} ref={form}>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={12}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h2">基本情報</Typography>
                </ThemeProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="氏名兼作業者名"
                onChange={handleInputChange}
                value={values.name}
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="zipcode"
                label="郵便番号"
                onChange={handleInputChange}
                value={values.zipcode}
                name="zipcode"
                autoComplete="zipcode"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="住所"
                onChange={handleInputChange}
                value={values.address}
                name="address"
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="tel"
                label="電話番号"
                onChange={handleInputChange}
                value={values.tel}
                name="tel"
                autoComplete="tel"
              />
            </Grid>
            <Grid item xs={12}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h2">振込先情報</Typography>
                </ThemeProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="finantial_institution"
                label="金融機関名"
                onChange={handleInputChange}
                value={values.tel}
                name="finantial_institution"
                autoComplete="finantial_institution"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id=" finantial_branch_name"
                label="支店名"
                onChange={handleInputChange}
                value={values.tel}
                name="finantial_branch_name"
                autoComplete="finantial_branch_name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id=" deposite_type"
                label="預金種別"
                onChange={handleInputChange}
                value={values.tel}
                name="deposite_type"
                autoComplete="deposite_type"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="acoount_number"
                label="口座番号"
                onChange={handleInputChange}
                value={values.tel}
                name="acoount_number"
                autoComplete="acoount_number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="account_holder_name"
                label="口座名義"
                onChange={handleInputChange}
                value={values.tel}
                name="account_holder_name"
                autoComplete="account_holder_name"
              />
            </Grid>
            <Grid item xs={12}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h2">案件情報</Typography>
                </ThemeProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="matter_name"
                label="案件名"
                onChange={handleInputChange}
                value={values.tel}
                name="matter_name"
                autoComplete="matter_name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="unit_price"
                label="単価"
                onChange={handleInputChange}
                value={values.tel}
                name="unit_price"
                autoComplete="unit_price"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            請求書作成
          </Button>
        </form>
    );
}
