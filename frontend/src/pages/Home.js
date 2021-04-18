import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";
import { DataGrid } from "@material-ui/data-grid";
import ImageFrame from "../components/ImageFrame";
import { Button } from "@material-ui/core"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { TextField } from '@material-ui/core';
export default function Home() {
  const { shoppingCartContents, setShoppingCartContents, selectedPartRows, setSelectedPartRows } = useContext(
    AuthContext
  );  
  const [parts, setParts] = useState([{id:1, number:1}]);
  let localCart = [];
  let selectedRows = [];
  const [searchText, setSearchText] = useState("")
  const currentlySelected = async (rows) => {
      selectedRows = rows.selectionModel.map((row) => parseInt(row))

      let waitParts = new Promise(resolve => {
          if(parts.length > 1) resolve()
      })
      await waitParts
      localCart = selectedRows.map((row) => parts.find(part => part.id === row)).map((row) => {return {number: row.number, quantity: 1}})

  }

  const addToCart = () => {
      setShoppingCartContents(localCart)
      setSelectedPartRows(selectedRows)
  }

  const onTextChange = (event) => {
      setSearchText((event.target.value))
  }

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/api/parts/all",
    })
      .then((res) => {
        setParts(res.data.map((part, index) => {
            return { id: index, ...part };
          }));
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setParts]);

  useEffect(() => {
    console.log('shoppingCartContents')
    console.log(shoppingCartContents)
  }, shoppingCartContents)
  
  const columns = [
    { field: "number", headerName: "Part Number", width: 400 },
    { field: "description", headerName: "Part Description", width: 400 },
    { field: "price", headerName: "Part Price", width: 400 },
    { field: "weight", headerName: "Part Weight", width: 400 },
    {
      field: "pictureURL",
      headerName: "Part Picture",
      width: 400,
      renderCell: (params) => <ImageFrame url={params.row.pictureURL} />,
    }
  ];

  return (
    <div>
        <TextField
            placeholder="Search the inventory"
            onChange={onTextChange}
        />
      <DataGrid
        rows={parts.filter(part => {
            if(searchText === "")
            {
                return true
            }
            else return part.description.includes(searchText)
        })}
        columns={columns}
        pageSize={10}
        autoHeight
        rowHeight={100}
        checkboxSelection
        onSelectionModelChange = {currentlySelected}
        selectionModel={selectedPartRows}
      />
      <Button endIcon={<AddShoppingCartIcon/>} variant="contained" color="primary" onClick={addToCart}>Add To Cart </Button>
    </div>
  );
}
