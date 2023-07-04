import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router';
import { useContext } from 'react';
import { CompanyContext } from '../CompanyContext';
import { retrieve_company_products,deleteProductByModel } from '../../web3Client';
import video from '../../backgrounds/Company.mp4';

const defaultTheme = createTheme();

export default function Products() {
  const [products, setProducts] = useState([]);
  const companyName2 = localStorage.getItem('companyName');


  const navigate = useNavigate(); 

  useEffect(() => {
    navigate('/products');
    retrieve_company_products(companyName2)
      .then((result) => {
        console.log('Retrieved products:', result);
        setProducts(result);
      })
      .catch((error) => {
        console.error('Error retrieving products:', error);
      });
  }, [companyName2]);

  // Group products by model and count the occurrences
  const groupedProducts = products.reduce((accumulator, product) => {
    const existingProduct = accumulator.find((p) => p.model === product.model);
    if (existingProduct) {
      existingProduct.count++;
    } else {
      accumulator.push({ ...product, count: 1 });
    }
    return accumulator;
  }, []);


  const handleDelete = (product) => {
    deleteProductByModel(companyName2, product.model)
      .then(() => {
        const updatedProducts = products.filter((p) => p.model !== product.model);
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: '-1',
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
        <Box
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            flex: '1',
            pt: 6,
          }}
        >
          <Container maxWidth="sm">

            <Typography component="h1" variant="h2" align="center" color="white">
              {companyName2}
            </Typography>
            <Typography variant="h5" align="center" color="white" paragraph>
              Total Number of Products: {products.length}
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center" />
          </Container>

          <Container sx={{ py: 4, maxWidth: 'md' }}>
            <Grid container spacing={4} justifyContent="center">
              {groupedProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: '500px',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'auto',
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: '52.25%',
                      }}
                      image={product.imageLink}
                    />
                    <CardContent sx={{ flexGrow: 1, pb: 0 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2" sx={{ fontSize: '14px' }}>
                        {product.model}
                      </Typography>
                      <Typography variant="body2" sx={{ pt: 2, pb: 0 }}>
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {product.count > 1 ? `Count: ${product.count}` : ''}
                      </Typography>
                      <Button size="small" sx={{ color: 'red' }} onClick={() => handleDelete(product)}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box
          sx={{ bgcolor: 'black', p: 4 }}
          component="footer"
          mt="auto" // Push the footer to the bottom
        >
          <Typography variant="h6" align="center" gutterBottom color="white">
            TrueTrace
          </Typography>
          <Typography variant="subtitle1" align="center" color="white" component="p">
            All Rights Reserved by&nbsp;
            <br />
            Philip Wagih, Michael Farid, Kermina Ashraf, Mario Mamdouh, Michael Medhat
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}