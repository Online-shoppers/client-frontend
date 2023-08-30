import { Box, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';

import PageLayout from 'components/page-layout.component';

import CategoryCard from './components/category-card.component';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <Container>
        <Stack gap="1rem">
          <Box textAlign="center">
            <Typography component="h1" variant="h4">
              {t('home:Welcome-message')}
            </Typography>
          </Box>
          <Typography component="p" variant="body1">
            {t('home:Welcome-about-us')}
          </Typography>

          <Stack direction="row" gap={5}>
            <CategoryCard
              name={t('categories:Beer')}
              category="beer"
              imageUrl="https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/10170935_XL1_20230113.jpg"
            />
            <CategoryCard
              name={t('categories:Snacks')}
              category="snacks"
              imageUrl="https://www.thecountrycook.net/wp-content/uploads/2022/07/thumbnail-Homemade-Soft-Pretzels-scaled.jpg"
            />
            <CategoryCard
              name={t('categories:Accessories')}
              category="accessories"
              imageUrl="https://ae04.alicdn.com/kf/H7df5c7d8236846d4a6ab5b9798ba2140p.jpg"
            />
          </Stack>
        </Stack>
      </Container>
    </PageLayout>
  );
};

export default HomePage;
