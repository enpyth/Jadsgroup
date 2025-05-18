"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Paper,
  Container,
} from "@mui/material";
import { Phone, Mail, MapPin, Home } from "lucide-react";
import { useState } from "react";

export default function MaintenancePage() {
  const [formData, setFormData] = useState({
    property: "e.g. 1A",
    title: "",
    description: "",
    priority: "medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: In a real app, this would send the data to an API
    console.log("Submitting repair request:", formData);
    setFormData({ property: "1A", title: "", description: "", priority: "medium" });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 2,
            background: 'linear-gradient(45deg,rgb(210, 25, 25) 10%, #2196f3 90%)',
            color: 'white'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Maintenance Request
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            We're here to help with any maintenance issues you may have
          </Typography>
        </Paper>

        <Alert 
          severity="info" 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            '& .MuiAlert-icon': { fontSize: 28 },
            '& .MuiAlert-message': { fontSize: '1rem' }
          }}
        >
          For urgent maintenance issues, please contact our maintenance team directly.
        </Alert>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 2,
                height: '100%',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Contact Information
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Phone size={24} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Emergency Contact
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        (+618) 8212 8866
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Mail size={24} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        andy@jadsgroup.com
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <MapPin size={24} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Office Address
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                      Suite 2, Market Plaza 44-60 Gouger Street Adelaide, SouthAustralia 5000
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card 
              elevation={0} 
              sx={{ 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Submit Maintenance Request
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Property"
                        fullWidth
                        required
                        value={formData.property}
                        onChange={(e) =>
                          setFormData({ ...formData, property: e.target.value })
                        }
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, color: 'primary.main' }}>
                              <Home size={20} />
                            </Box>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                          value={formData.priority}
                          label="Priority"
                          onChange={(e) =>
                            setFormData({ ...formData, priority: e.target.value })
                          }
                        >
                          <MenuItem value="low">Low</MenuItem>
                          <MenuItem value="medium">Medium</MenuItem>
                          <MenuItem value="high">High</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Issue Title"
                        fullWidth
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Description"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        variant="contained" 
                        type="submit" 
                        fullWidth
                        size="large"
                        sx={{ 
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1rem'
                        }}
                      >
                        Submit Request
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}