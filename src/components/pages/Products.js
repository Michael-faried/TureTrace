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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router';
import { useContext } from 'react';
import { CompanyContext } from '../CompanyContext';
import { retrieve_company_products } from '../../web3Client';
import image from '../../backgrounds/back1.png';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const defaultTheme = createTheme();

export default function Products() {
  const [products, setProducts] = useState([]);
  const companyName2 = localStorage.getItem('companyName');

  useEffect(() => {
    retrieve_company_products(companyName2)
      .then((result) => {
        console.log('Retrieved products:', result);
        setProducts(result);
      })
      .catch((error) => {
        console.error('Error retrieving products:', error);
      });
  }, [companyName2]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Box sx={{ pt: 6 }}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
            >
              {companyName2}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Company Info
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center" />
          </Container>
        </Box>

        <Container sx={{ py: 4 }} maxWidth="md">
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto', // Enable vertical scrollbar if needed
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={product.imageLink}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography>{product.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
