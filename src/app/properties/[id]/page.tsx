import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPropertyWithDetailsById } from '@/db/queries/properties';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Chip, 
  Avatar, 
  Divider,
  Container,
  Paper
} from '@mui/material';
import { 
  MapPin, 
  Building2, 
  Phone,
  Mail
} from 'lucide-react';

type pageProps = {
    params: {
        id: number;
    };
};

export default async function PropertyDetails(props: pageProps) {
    const params = await props.params;
    const property = await getPropertyWithDetailsById(params.id);

    if (!property || property.length === 0) {
        notFound();
    }

    const propertyData = property[0];
    const carouselImages = (propertyData.detail as any)?.carousel || [propertyData.image];
    const address = '44/60 Gouger St, Adelaide SA 5000'; // Fixed address as requested

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* Property Images Carousel */}
                <Grid item xs={12} lg={7}>
                    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <Box sx={{ position: 'relative', height: 500 }}>
                            <Image
                                src={propertyData.image || '/placeholder.jpg'}
                                alt={propertyData.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </Box>
                        
                        {carouselImages.length > 0 && (
                            <Grid container spacing={1} sx={{ p: 2 }}>
                                {carouselImages.slice(0, 4).map((image: string, index: number) => (
                                    <Grid item xs={4} key={index}>
                                        <Box sx={{ 
                                            position: 'relative', 
                                            height: 120, 
                                            borderRadius: 1, 
                                            overflow: 'hidden',
                                            cursor: 'pointer'
                                        }}>
                                            <Image
                                                src={image}
                                                alt={`${propertyData.name} ${index + 2}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Paper>
                </Grid>

                {/* Property Details */}
                <Grid item xs={12} lg={5}>
                    <Box sx={{ spaceY: 3 }}>
                        <Typography variant="h3" component="h1" gutterBottom>
                            {propertyData.name}
                        </Typography>
                        
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Unit {propertyData.unit} • {propertyData.state}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <MapPin size={20} color="#666" />
                            <Typography variant="body1" color="text.secondary">
                                {address}
                            </Typography>
                        </Box>

                        <Typography variant="h4" color="primary" gutterBottom>
                            ${parseInt(propertyData.price).toLocaleString()} / month
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Chip 
                                icon={<Building2 size={16} />} 
                                label={`${propertyData.size} m²`} 
                                variant="outlined" 
                            />
                            <Chip 
                                label={`${(propertyData.detail as any)?.rent_review_percentage || 0}% Rent Review`} 
                                color="secondary" 
                                variant="outlined"
                            />
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Agent Information */}
                        <Typography variant="h6" gutterBottom>
                            Listed by
                        </Typography>
                        <Card variant="outlined">
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar 
                                        src={propertyData.agentImg} 
                                        alt={propertyData.agentName}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <Box>
                                        <Typography variant="h6">
                                            {propertyData.agentName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {propertyData.agentAgencyName}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                            <Phone size={16} color="#666" />
                                            <Typography variant="body2" color="text.secondary">
                                                {propertyData.agentPhone}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                            <Mail size={16} color="#666" />
                                            <Typography variant="body2" color="text.secondary">
                                                {propertyData.agentEmail}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        <Box sx={{ mt: 3 }}>
                            <Link
                                href={`/properties/application/${propertyData.property_id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        px: 4,
                                        py: 2,
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        borderRadius: 2,
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        },
                                        transition: 'background-color 0.2s'
                                    }}
                                >
                                    Apply Now
                                </Box>
                            </Link>
                        </Box>
                    </Box>
                </Grid>

                {/* Google Maps */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <Box sx={{ p: 2, backgroundColor: 'grey.50' }}>
                            <Typography variant="h6" gutterBottom>
                                Property Location
                            </Typography>
                        </Box>
                        <Box sx={{ height: 400, position: 'relative' }}>
                            <iframe
                                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'}&q=${encodeURIComponent(address)}`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Property Features */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Property Features
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ 
                                        width: 8, 
                                        height: 8, 
                                        borderRadius: '50%', 
                                        backgroundColor: 'success.main' 
                                    }} />
                                    <Typography>Air Conditioning</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ 
                                        width: 8, 
                                        height: 8, 
                                        borderRadius: '50%', 
                                        backgroundColor: 'success.main' 
                                    }} />
                                    <Typography>Parking Available</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ 
                                        width: 8, 
                                        height: 8, 
                                        borderRadius: '50%', 
                                        backgroundColor: 'success.main' 
                                    }} />
                                    <Typography>Modern Facilities</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
} 