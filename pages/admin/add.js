import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { toast } from "react-toastify";

function AddProduct({ toast }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState("");

  useEffect(() => {
    let s = `${title} ${color} ${size}`;
    s = s.toLowerCase()
             .replace(/ /g, '-')
             .replace(/[^\w-]+/g, '');
    if(!title) {
      s = "";
    }
    setSlug(s);
  }, [title, size, color]);

  const uploadProduct = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !slug ||
      !category ||
      !size ||
      !color ||
      !description ||
      !price ||
      !quantity ||
      !image
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{
        title,
        slug,
        category,
        size,
        color,
        desc: description,
        price,
        availableQty: quantity,
        img: image,
      }]),
    });

    if (res.status != 200) {
      toast.error("Something went wrong");
    } else {
      let response = await res.json();
      if (response.success == "success") {
        toast.success("Product Added Successfully");
      }
    }
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add Product">
          <Stack spacing={3}>
            <TextField
              id="name-basic"
              label="Title"
              variant="outlined"
              placeholder="Code Complete Hat"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              id="slug-basic"
              label="Slug"
              variant="outlined"
              placeholder="code-complete-hat"
              value={slug}
              InputProps={{
                readOnly: true,
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="tshirts">tshirts</MenuItem>
                <MenuItem value="hoodies">hoodies</MenuItem>
                <MenuItem value="stickers">stickers</MenuItem>
                <MenuItem value="mugs">mugs</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="email-basic"
              label="Size"
              variant="outlined"
              placeholder="Red"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <TextField
              id="email-basic"
              label="Color"
              variant="outlined"
              placeholder="Red"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              placeholder="Write some features of product ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              id="price-basic"
              label="Price"
              variant="outlined"
              placeholder="500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextField
              id="quantity-basic"
              label="Quantity"
              variant="outlined"
              placeholder="100"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              id="img-basic"
              label="Image"
              variant="outlined"
              placeholder="100"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Stack>
          <br />
          <Button variant="contained" mt={2} onClick={uploadProduct}>
            Submit
          </Button>
        </BaseCard>
      </Grid>
    </Grid>
  );
}

export default AddProduct;
