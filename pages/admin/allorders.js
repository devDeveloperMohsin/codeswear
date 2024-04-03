import React from "react";
import mongoose from "mongoose";
import Order from "../../models/Order";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Link from "next/link";

function AllOrders({orders}) {
  return (
    <BaseCard title="Orders">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Address
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Products
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Total
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  <Link className="underline text-indigo-700" href={`/order?id=${order._id}`}>{order._id}</Link>
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">{order.email} </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">{order.address} </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">{order.address} </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: order.status == 'Payment Success' ? '#50e650' : '#f1f1f1',
                    color: order.status == 'Payment Success' ? '#155f15' : '#000',
                  }}
                  size="small"
                  label={order.status}
                ></Chip>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">${order.amount}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let orders = await Order.find();

  return { props: { orders: JSON.parse(JSON.stringify(orders)) } };
}

export default AllOrders;
