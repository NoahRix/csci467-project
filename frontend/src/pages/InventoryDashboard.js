import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Typography, Paper, TextField, IconButton, Tooltip } from '@material-ui/core';
import { Check, Edit } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import  ImageFrame from '../components/ImageFrame';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    cellCustom: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
    },
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

const formatUSD = (amount) => {
    return `$${Number(amount).toLocaleString()}`
}

function QuantityRowField({quantity, part_id, updateQuantities, updateTotalFloorPrice}){

    const [rowQuantity, setRowQuantity] = useState(quantity);
    const [canEdit, setCanEdit] = useState(false);

    const handleQuantityChange = (newQuantity, id) => {
        setRowQuantity(newQuantity);
        updateQuantities(newQuantity);
    }

    
    const handleSubmitQuantity = () => {        
        axios({
            method: "post",
            url: "http://localhost:3001/api/inventory/update",
            data: {quantity: rowQuantity, part_id}
        }).then(res => {
            console.log(res.data);
            updateTotalFloorPrice();
        }).catch(err => console.log(err));
    }

    return(
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            {
                canEdit ?
                <TextField inputProps={{min: "0"}} value={rowQuantity} onChange={e => {handleQuantityChange(e.target.value, rowQuantity)}} type="number"/>
                :                    
                <Typography style={{width: "85px"}}>{rowQuantity}</Typography>                    
            }
            <IconButton 
                style={{marginLeft: "5px"}}
                onClick={() => {setCanEdit(!canEdit); if(canEdit) handleSubmitQuantity()}}
            >
                {canEdit ? <Check/> : <Edit/>}
            </IconButton>
        </div>
    );
}

export default function InventoryDashboard(){

    const classes = useStyles();

    const [rows, setRows] = useState([]);
    const [totalFloorPrice, setTotalFloorPrice] = useState(0.0);

    const updateQuantities = (new_quantity) => {
        console.log("new_quantity: " + new_quantity);
    }

    const updateTotalFloorPrice = () => {
        axios({
            method: "get",
            url: "http://localhost:3001/api/inventory/total-floor-price"
        }).then(res => {
            setTotalFloorPrice(res.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:3001/api/inventory/all-with-parts"
        }).then(res => {
            setRows(res.data.map((row, id) => {return {id, ...row}}));
            updateTotalFloorPrice();
        })
        .catch(err => console.log(err));

    }, [setRows]);

    const columns = [
        {
            field: 'pictureURL',
            headerName: 'Part Image',
            width: 150,
            renderCell: (params) => (
                <div className={classes.cellCustom}>
                    <ImageFrame url={params.row.pictureURL}/>
                </div>
            )
        },
        {
            field: 'number',
            headerName: 'Part Number',
            width: 150,
            renderCell: (params) => (
                <div className={classes.cellCustom}>
                    <Typography>{params.row.number}</Typography>                    
                </div>
            )
        },
        {
            field: 'description',
            headerName: 'Part Description',
            width: 160,
            renderCell: (params) => (
                <div className={classes.cellCustom}>
                    <section>
                        <Tooltip title={params.row.description}>
                            <Typography>{params.row.description}</Typography>                    
                        </Tooltip>
                    </section>
                </div>
            )
        },
        {
            field: 'weight',
            headerName: 'Part Weight (KG)',
            width: 170,
            renderCell: (params) => (
                <div className={classes.cellCustom}>
                    <section>
                        <Typography>{params.row.weight}</Typography>                    
                    </section>
                </div>
            )
        },
        {
            field: 'price',
            headerName: 'Part Price (USD)',
            width: 170,
            renderCell: (params) => (
                <div className={classes.cellCustom}>
                    <section>
                        <Typography>{formatUSD(params.row.price)}</Typography>                    
                    </section>
                </div>
            )
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 170,
            renderCell: (params) => (
                <div className={classes.cellCustom}>
                    <QuantityRowField 
                    quantity={params.row.quantity} 
                    part_id={params.row.number} 
                    updateQuantities={updateQuantities}
                    updateTotalFloorPrice={updateTotalFloorPrice}
                    />
                </div>
            )
        },
        
    ]; 

    return(
        <div className={classes.body}>
            <div style={{width: "980px"}}>
                <Paper style={{margin: "10px 10px"}}>
                    <Typography>{`Total Floor Price: ${formatUSD(totalFloorPrice)}`}</Typography>
                </Paper>
                <DataGrid 
                    rows={rows} 
                    columns={columns} 
                    pageSize={10} 
                    rowHeight={100} 
                    autoHeight
                    />
            </div>
        </div>
    );
}