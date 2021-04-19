import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// Order.PropTypes = {
//   order: PropTypes.shape({
//     orderNumber: PropTypes.number.isRequired,
//     orderDate: PropTypes.string.isRequired,
//     orderStatus: PropTypes.string.isRequired,
//     totalItems: PropTypes.number.isRequired,
//     totalPrice: PropTypes.number.isRequired,
//     paymentInfo: PropTypes.string.isRequired,
//     taxAmount: PropTypes.number.isRequired,
//     shippingAndHandlingPrice: PropTypes.number.isRequired,
//     billingAddress: PropTypes.string.isRequired,
//     shippingAddress: PropTypes.string.isRequired,
//     itemDetails: PropTypes.arrayOf(
//       PropTypes.shape({
//         itemNumber: PropTypes.number.isRequired,
//         itemDescription: PropTypes.string.isRequired,
//         itemPrice: PropTypes.number.isRequired,
//         itemPicURL: PropTypes.string.isRequired,
//         itemQuantity: PropTypes.number.isRequired,
//       }),
//     ).isRequired,
//   }).isRequired,
// };

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root} key={row.orderNumber}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.orderNumber}</TableCell>
        <TableCell>{row.orderDate}</TableCell>
        <TableCell>{row.orderStatus}</TableCell>
        <TableCell>{row.totalItems}</TableCell>
        <TableCell>{row.totalPrice}</TableCell>
      </TableRow>
      <TableRow key={row.orderDate}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">Order Details</Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Billing Address</TableCell>
                    <TableCell>Shipping Address</TableCell>
                    <TableCell>Payment Info</TableCell>
                    <TableCell>Tax Amount($)</TableCell>
                    <TableCell>Shipping And Handling ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.billingAddress}</TableCell>
                    <TableCell>{row.shippingAddress}</TableCell>
                    <TableCell>{row.paymentInfo}</TableCell>
                    <TableCell>{row.taxAmount}</TableCell>
                    <TableCell>{row.shippingAndHandlingPrice}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <br/>
              <br/>
              <Typography variant="h6" gutterBottom component="div">Item Details</Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Item Number</TableCell>
                    <TableCell>Item Description</TableCell>
                    <TableCell>Item Quantity</TableCell>
                    <TableCell>Item Price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.itemDetails.map((itemDetail) => (
                    <TableRow key={itemDetail.itemNumber}>
                      <TableCell>
                        <img src={itemDetail.itemPicURL} height={50} alt="Item"/>
                      </TableCell>
                      <TableCell>{itemDetail.itemNumber}</TableCell>
                      <TableCell>{itemDetail.itemDescription}</TableCell>
                      <TableCell>{itemDetail.itemQuantity}</TableCell>
                      <TableCell>{itemDetail.itemPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CustomerOrders() {
  const { id } = useContext( AuthContext );

  const [ordersList, setOrdersList] = useState([])

  useEffect(() => {
    let twoList = []

    axios({
      method: "post",
      url: "http://localhost:3001/api/orders/ordersOfCustomer",
      data: { customerId: id },
    }).then( res => {
      res.data.forEach( o => {
        let twoJSON = {}
        let oneList = []

        let oStatus = ''
        if(o.order_shipped === 1) oStatus = 'Shipped'
        else if(o.order_confirmed === 1) oStatus = 'Confirmed'
        else oStatus = 'Not Confirmed'
  
        let parts = []
  
        axios({
          method: "post",
          url: "http://localhost:3001/api/orders/orderItems",
          data: { orderId: o.id },
        }).then( res => {
          res.data.forEach( i => {
            let oneJSON = {}
            oneJSON['itemNumber'] = i.part_id
            oneJSON['itemQuantity'] = i.quantity
            parts.push(i.part_id)
            //console.log("one : " + i.part_id)

            axios({
              method: "post",
              url: "http://localhost:3001/api/parts/by-part-number/",
              data: { partNumber: i.part_id },
            }).then( res => {
              res.data.forEach( item => {
                oneJSON['itemDescription'] = item.description;
                oneJSON['itemPrice'] = item.price;
                oneJSON['itemPicURL'] = item.pictureURL;
                //console.log("two : " + item.number)
              })
            }).catch( err => {
              console.log(err)
            });

            oneList.push(oneJSON)
          })

        }).catch( err => {
          console.log(err)
        });

        twoJSON = {
          orderNumber: o.id,
          orderDate: o.timestamp, 
          orderStatus: oStatus,
          totalItems: o.total_items,
          totalPrice: o.total_price,
          paymentInfo: o.payment_info,
          taxAmount: o.tax_amount,
          shippingAndHandlingPrice: o.shipping_handling_price,
          billingAddress: o.billing_address,
          shippingAddress: o.shipping_address,
          itemDetails: oneList
        }
        twoList.push(twoJSON)

      });
      setOrdersList(twoList)
    }).catch( err => {
      console.log(err)
    });
  }, [id])

  const clicked = () => {
    console.log(ordersList)
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell>Order Number</TableCell>
            <TableCell>Order Placed Date</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Total Items</TableCell>
            <TableCell>Total Price ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersList.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>

      <button onClick={() => clicked()}>Test</button>
    </TableContainer>
  );
}
