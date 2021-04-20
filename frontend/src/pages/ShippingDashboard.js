import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
    color: 'black',
    background: '#f5f5f5',
  },
  input: {
    padding: '10px 0',
    width: 100,
    marginLeft: 10,
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'inline',
    backgroundColor: '#3F51B5',
    borderRadius: 'none',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    marginLeft: 10,
  }
}))

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
        })
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default function ShippingDashboard() {
  const classes = useStyles()

  const [shippingInfo, setShippingInfo] = useState({
    // Economy: 5.99, // example
  })

  const [newShippingType, setNewShippingType] = useState({
    type: '',
    cost: 0.00,
  })

  const [showSubmitButton, setShowSubmitButton] = useState('none')

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/api/shipping_information/all",
    }).then( res => {
      let info = {}
      res.data.map( data => {
        info[data.type] = data.cost
      })
      setShippingInfo(info)
    }).catch( err => {
      console.log(err)
    })
  }, [])

  const handleChange = (event) => {
    setShippingInfo({
      ...shippingInfo,
      [event.target.name]: event.target.value,
    })
  }
  const handleFocus = (event) => {
    setShowSubmitButton(event.target.name)
  }
  const handleSubmitSave = (event) => {
    let type = event.target.name
    let cost = event.target.value

    axios({
      method: "patch",
      url: "http://localhost:3001/api/shipping_information/update",
      data: { 
        type,
        cost
      }
    }).then( res => {
      console.log(res.data)
    }).catch( err => {
      console.log(err)
    });

    setShowSubmitButton('none')
  }
  const handleSubmitDelete = (event) => {
    let type = event.target.name

    axios({
      method: "delete",
      url: "http://localhost:3001/api/shipping_information/delete",
      data: { type }
    }).then( res => {
      console.log(res.data)
      window.location.reload();
    }).catch( err => {
      console.log(err)
    });

    setShowSubmitButton('none')
  }

  const handleChange2 = (event) => {
    setNewShippingType({
      ...newShippingType,
      [event.target.name]: event.target.value,
    })
  }
  const handleFocus2 = () => {
    setShowSubmitButton('add')
  }
  const handleSubmit2 = () => {
    axios({
      method: "post",
      url: "http://localhost:3001/api/shipping_information/add",
      data: newShippingType
    }).then( res => {
      console.log(res.data)
      window.location.reload();
    }).catch( err => {
      console.log(err)
    })
    
    setShowSubmitButton('none')
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        {Object.keys(shippingInfo).map( ship_type => {
          return <Grid item xs={6} key={ship_type}>
            <Paper className={classes.paper}>
              <label>{ship_type} : </label>
              <input 
                name={ship_type} 
                value={shippingInfo[ship_type]} 
                type="number" 
                min="0.00" 
                step="0.01"  
                onChange={handleChange}
                onFocus={handleFocus}
                className={classes.input}
              />
              <button 
                name={ship_type} 
                value={shippingInfo[ship_type]} 
                onClick={handleSubmitSave}
                className={showSubmitButton === ship_type ? classes.show : classes.hide}
              >Save</button>
              <button 
                name={ship_type} 
                onClick={handleSubmitDelete}
                className={showSubmitButton === ship_type ? classes.show : classes.hide}
              >Delete</button>
            </Paper>
          </Grid>
        })}

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <label>Shipping Type : </label>
            <input 
              name='type'
              value={newShippingType.type}
              type='text'
              placeholder='type'
              onChange={handleChange2}
              onFocus={handleFocus2}
              className={classes.input}
            />
            <br/><br/>
            <label>Shipping Cost : </label>
            <input 
              name='cost'
              value={newShippingType.cost}
              type='number' 
              min='0.00' 
              step='0.01' 
              onChange={handleChange2}
              onFocus={handleFocus2}
              className={classes.input}
            />
            <br/><br/>
            <button 
              name={newShippingType.type} 
              value={newShippingType.cost} 
              onClick={handleSubmit2} 
              className={showSubmitButton === 'add' ? classes.show : classes.hide} 
            >Add</button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
