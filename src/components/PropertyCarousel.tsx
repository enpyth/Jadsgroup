"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  DollarSign,
  Home,
  Bed,
  Bath,
  Square,
  Calendar,
  Building,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Styled components for custom styling
const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  padding: theme.spacing(4, 0),
  background: "linear-gradient(135deg,rgb(241, 244, 248) 0%, rgb(206, 232, 223) 100%)",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"10\" cy=\"60\" r=\"0.5\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"90\" cy=\"40\" r=\"0.5\" fill=\"rgba(255,255,255,0.1)\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>')",
    opacity: 0.3,
    zIndex: 1,
  },
}));

const TitleContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  padding: theme.spacing(2, 0),
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    height: "200px",
    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    zIndex: -1,
  },
}));

const CoolTitle = styled(Typography)({
  fontFamily: "'Orbitron', 'Arial Black', sans-serif",
  fontWeight: 900,
  fontSize: "3.5rem",
  background: "linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FF1493)",
  backgroundSize: "300% 300%",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "gradientShift 3s ease-in-out infinite",
  textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
  letterSpacing: "0.1em",
  "@keyframes gradientShift": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
  "@media (max-width: 768px)": {
    fontSize: "2.5rem",
  },
  "@media (min-width: 1200px)": {
    fontSize: "4rem",
  },
});

const SlideContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "500px",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
  },
  [theme.breakpoints.down("md")]: {
    height: "400px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "350px",
  },
}));

const SlideImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
});

const SlideOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
  padding: theme.spacing(3),
  color: "white",
}));

const PropertyInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const PriceTag = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  fontWeight: "bold",
  fontSize: "1.1rem",
  padding: theme.spacing(0.5, 1),
  "& .MuiChip-label": {
    padding: theme.spacing(0.5, 1),
  },
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255,255,255,0.9)",
  color: theme.palette.text.primary,
  zIndex: 10,
  "&:hover": {
    backgroundColor: "rgba(255,255,255,1)",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const LeftNavButton = styled(NavigationButton)({
  left: "20px",
});

const RightNavButton = styled(NavigationButton)({
  right: "20px",
});

const LoadingSkeleton = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  overflow: "hidden",
  padding: theme.spacing(0, 2),
}));

const PropertyAttributes = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderRadius: "0 0 20px 20px",
}));

const AttributeItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}));

// Interface for Property data
interface Property {
  property_id: number;
  name: string;
  describe: string;
  size: string;
  price: string;
  state: string;
  image: string | null;
  unit: string;
  releaseTime: Date;
  detail: any;
  ownerName: string;
  agentName: string;
  agentAgencyName: string;
  agentImg: string;
  agentPhone: string;
  agentEmail: string;
}

interface PropertyCarouselProps {
  properties?: Property[];
  loading?: boolean;
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({
  properties: propProperties = [],
  loading = false,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Use props if provided, otherwise fall back to mock data
  const properties =
    propProperties && propProperties.length > 0 ? propProperties : [];

  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handlePropertyClick = (propertyId: number) => {
    router.push(`/properties/${propertyId}`);
  };

  const getStatusColor = (state: string) => {
    switch (state.toLowerCase()) {
      case "available":
        return "success";
      case "sold":
        return "error";
      case "under contract":
        return "warning";
      case "pending":
        return "info";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <CarouselContainer>
        <TitleContainer>
          <CoolTitle variant="h3" gutterBottom>
            Featured Properties
          </CoolTitle>
        </TitleContainer>

        <LoadingSkeleton>
          {[1, 2, 3].map((item) => (
            <Box key={item} sx={{ minWidth: "300px", height: "400px" }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ borderRadius: "20px" }}
              />
            </Box>
          ))}
        </LoadingSkeleton>
      </CarouselContainer>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <CarouselContainer>
        <TitleContainer>
          <CoolTitle variant="h3" gutterBottom>
            Featured Properties
          </CoolTitle>
        </TitleContainer>

        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No properties available at the moment
          </Typography>
        </Box>
      </CarouselContainer>
    );
  }

  return (
    <CarouselContainer>
      <TitleContainer>
        <CoolTitle variant="h3" gutterBottom>
          Featured Properties
        </CoolTitle>
      </TitleContainer>

      <Box sx={{ position: "relative", px: { xs: 2, md: 4 } }}>
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={isSmallMobile ? 1 : isMobile ? 1.2 : 1.5}
          centeredSlides={false}
          loop={properties.length > 1}
          autoplay={
            properties.length > 1
              ? {
                  delay: 5000,
                  disableOnInteraction: false,
                }
              : false
          }
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={false}
          effect="slide"
          speed={800}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1.2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 1.5,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 1.8,
              spaceBetween: 40,
            },
          }}
          style={{
            paddingBottom: "60px",
          }}
        >
          {properties.map((property) => (
            <SwiperSlide key={property.property_id}>
              <SlideContainer
                onClick={() => handlePropertyClick(property.property_id)}
              >
                <SlideImage
                  src={property.image || "/public/placeholder.jpg"}
                  alt={property.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/public/placeholder.jpg";
                  }}
                />

                <SlideOverlay>
                  <PropertyInfo>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", md: "1.25rem" },
                      }}
                    >
                      ${property.price} p.m.
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <MapPin size={18} color={theme.palette.primary.main} />
                      <Typography 
                        variant="body2"
                        sx={{
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          fontWeight: 500,
                          textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                        }}
                      >
                        {property.detail.address}
                      </Typography>
                    </Box>
                  </PropertyInfo>
                </SlideOverlay>
              </SlideContainer>

              {/* Property Attributes Below Image */}
              <PropertyAttributes>
                <AttributeItem>
                  <Square size={16} />
                  <span>{property.size} m²</span>
                </AttributeItem>
                <AttributeItem>
                  <Building size={16} />
                  <span>{property.agentAgencyName}</span>
                </AttributeItem>

                <AttributeItem>
                  <User size={16} />
                  <span>{property.agentName}</span>
                </AttributeItem>
              </PropertyAttributes>
            </SwiperSlide>
          ))}
        </Swiper>

        {properties.length > 1 && (
          <>
            <LeftNavButton onClick={handlePrev}>
              <ChevronLeft />
            </LeftNavButton>

            <RightNavButton onClick={handleNext}>
              <ChevronRight />
            </RightNavButton>
          </>
        )}
      </Box>
    </CarouselContainer>
  );
};

export default PropertyCarousel;
