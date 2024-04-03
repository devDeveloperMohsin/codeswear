import { Grid } from "@mui/material";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import mongoose from "mongoose";
import Order from "../../models/Order";
// import DailyActivity from "../../src/components/dashboard/DailyActivity";
// import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";

export default function Index({monthlySales, monthlyOrders}) {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview monthlySales={monthlySales} monthlyOrders={monthlyOrders} />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      {/* <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid> */}
      {/* <Grid item xs={12} lg={8}>
        <ProductPerfomance />
      </Grid> */}
    </Grid>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let orders = await Order.find();
  let monthlySales = new Array(12).fill(0);
  let monthlyOrders = new Array(12).fill(0);
  orders.forEach(order => {
    let month = new Date(order.createdAt).getMonth();
    monthlySales[month] += order.amount;
    monthlyOrders[month]++;
  });
  return { props: { monthlySales, monthlyOrders }};
}
