import { Box, Paper, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2'
import Image from "next/image"
import { Property } from "@/constants/data"
import { SectionTitle } from "../ui-custom/section-title"

type PropertyInformationProps = {
  property: Property
}

export function PropertyInformation({ property }: PropertyInformationProps) {
  return (
    <Box sx={{ mb: 6 }}>
      <SectionTitle>Property Information</SectionTitle>
      <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid size={6}>
            <Box sx={{ position: 'relative', height: '300px', borderRadius: 2, overflow: 'hidden' }}>
              <Image
                src={property.image}
                alt={property.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                Property Details
              </Typography>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Address
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    {property.name}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Size
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    {property.size} m²
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Price
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    ${property.price} / month
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
                {property.describe}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
} 