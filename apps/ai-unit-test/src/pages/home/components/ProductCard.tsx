import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Chip,
  Grid,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { pathToUrl } from '@/helpers/url';
import { formatPrice } from '@/utils/formatter';

type Category = {
  id: number;
  name: string;
  creationAt?: string;
  updatedAt?: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  images?: string[];
  creationAt?: string;
  updatedAt?: string;
  category: Category;
};

type ButtonClickHandler = (
  ev: React.MouseEvent<HTMLButtonElement>,
  product: Product,
) => void;

type ProductCardProps = {
  product?: Product | null;
  onClickAddCartButton: ButtonClickHandler;
  onClickPurchaseButton: ButtonClickHandler;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClickAddCartButton,
  onClickPurchaseButton,
}) => {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const { title, images, price, category, id } = product;

  const handleClickItem = () => {
    navigate(pathToUrl(pageRoutes.productDetail, { productId: id }));
  };
  const handleClickAddCartButton = (
    ev: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onClickAddCartButton(ev, product);
  };
  const handleClickPurchaseButton = (
    ev: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onClickPurchaseButton(ev, product);
  };

  return (
    <Grid item xs={6} sm={6} md={3} onClick={handleClickItem}>
      <Card sx={{ maxWidth: 345, cursor: 'pointer' }}>
        <CardMedia component="img" height="140" image={images?.[0]} />
        <CardContent>
          <Chip
            label={category.name}
            size="small"
            color="success"
            variant="outlined"
            style={{ borderRadius: '10px' }}
          />
          <Typography
            gutterBottom
            component="h4"
            sx={{
              height: 50,
              fontWeight: 'bold',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatPrice(price)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClickAddCartButton}>
            장바구니
          </Button>
          <Button size="small" onClick={handleClickPurchaseButton}>
            구매
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
