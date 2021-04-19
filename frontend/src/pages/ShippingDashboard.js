import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(5),
    },
    flexGrow: 1,
  },
  paper: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(3),
    textAlign: 'center',
    color: 'white',
    background: '#f5f5f5'
  },
  input: {
    width: '17ch'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'inline'
  }
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function ShippingDashboard() {
  const classes = useStyles();

  const [shippingInfo, setShippingInfo] = useState({
    // Economy: 5.99,
  });

  const [newShippingType, setNewShippingType] = useState({
    type: '',
    cost: 0,
  });

  const [showSubmitButton, setShowSubmitButton] = useState('none')

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/api/shipping_information/all",
    }).then( res => {
      let info = {}
      res.data.map( data => {
        info[data.type] = parseFloat(data.cost)
      })
      setShippingInfo(info)
    }).catch( err => {
      console.log(err)
    });
  }, []);

  const handleChange = (event) => {
    setShippingInfo({
      ...shippingInfo,
      [event.target.name]: event.target.value === "" ? 0 : parseFloat(event.target.value),
    });
  };

  const handleChange2 = (event) => {
    setNewShippingType({
      ...newShippingType,
      [event.target.name]: event.target.value,
    });
  };

  const handleFocus = (event) => {
    setShowSubmitButton(event.target.name)
  }

  const handleSubmit = (event) => {
    let shipping_type = event.target.id
    // let shipping_cost = 0

    // if(event.target.value !== ''){
    //   shipping_cost = event.target.value
    // }
    
    // console.log(shipping_type)
    // console.log(shipping_cost)


    console.log(event)
    // console.log(shippingInfo)

    // axios({
    //   method: "patch",
    //   url: "http://localhost:3001/api/shipping_information/update",
    //   data: { 
    //     type: shipping_type,
    //     cost: shipping_cost,
    //   }
    // }).then( res => {
    //   console.log(res.data)
    // }).catch( err => {
    //   console.log(err)
    // });

    setShowSubmitButton('none')
  }

  const handleSubmit2 = (event) => {
    console.log(newShippingType)
    window.location.reload(false);
    // axios({
    //   method: "post",
    //   url: "http://localhost:3001/api/shipping_information/add",
    //   data: newShippingType
    // }).then( res => {
    //   console.log(res.data)
    // }).catch( err => {
    //   console.log(err)
    // });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        {Object.keys(shippingInfo).map( key => {
          return <Grid item xs={6} key={key}>
            <Paper className={classes.paper}>
              <TextField
                label={key}
                value={shippingInfo[key]}
                onChange={handleChange}
                name={key}
                id={key}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                variant="outlined"
                onFocus={handleFocus}
              />
              <IconButton 
                color="primary" 
                aria-label="save shipping cost"
                id={key} 
                value={shippingInfo[key]} 
                onClick={(e) => handleSubmit(e)}
                className={showSubmitButton === key ? classes.show : classes.hide}
              >
                <CheckCircleOutlineIcon fontSize="large"/>
              </IconButton>
            </Paper>
          </Grid>
        })}

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <TextField
              label='Shipping Type'
              value={newShippingType.type}
              onChange={handleChange2}
              name='type'
              id='type'
              variant="outlined"
              className={classes.input}
            />
            <TextField
              label='Shipping Cost'
              value={newShippingType.cost}
              onChange={handleChange2}
              name='cost'
              id='cost'
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
              className={classes.input}
            />
            <IconButton 
              color="primary" 
              aria-label="add new type of shipping"
              // id={key} 
              // value={shippingInfo[key]} 
              onClick={handleSubmit2}
              // className={showSubmitButton === key ? classes.show : classes.hide}
            >
              <AddCircleOutlineIcon fontSize="large"/>
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      {/* <button onClick={() => console.log(newShippingType)}>Testing</button> */}
    </div>
  );
}
