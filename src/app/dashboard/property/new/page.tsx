"use client";
import { useState, useEffect } from "react";
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  SelectChangeEvent,
  Grid
} from "@mui/material";
import { ImageUpload, CarouselImageUpload } from "@/components/common";

export default function NewPropertyPage() {
  const [form, setForm] = useState({
    owner_id: "",
    agent_id: "",
    name: "",
    unit: "",
    describe: "",
    size: "",
    price: "",
    state: "available",
    image: "",
    detail: {
      volumn: "",
      folio: "",
      address: "",
      office_id: "",
      initial_rent: "",
      rent_review_percentage: "",
      carousel: [] as string[],
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [owners, setOwners] = useState([]);
  const [agents, setAgents] = useState([]);

  // Fetch owners and agents only once
  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const [ownersRes, agentsRes] = await Promise.all([
          fetch("/api/properties/owners"),
          fetch("/api/properties/agents"),
        ]);
        const [ownersData, agentsData] = await Promise.all([
          ownersRes.json(),
          agentsRes.json(),
        ]);
        if (!ignore) {
          setOwners(ownersData);
          setAgents(agentsData);
        }
      } catch (e) {
        // Optionally handle error
      }
    }
    fetchData();
    return () => { ignore = true; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as string;
    setForm({ ...form, [name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const name = e.target.name as string;
    setForm({ ...form, [name]: e.target.value });
  };

  const handleDetailChange = (field: string, value: string) => {
    setForm({
      ...form,
      detail: {
        ...form.detail,
        [field]: value,
      },
    });
  };

  const handleMainImageChange = (url: string) => {
    setForm({ ...form, image: url });
  };

  const handleCarouselImagesChange = (urls: string[]) => {
    setForm({
      ...form,
      detail: {
        ...form.detail,
        carousel: urls,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          owner_id: Number(form.owner_id),
          agent_id: Number(form.agent_id),
        }),
      });
      if (!res.ok) throw new Error("Failed to add property");
      setSuccess(true);
      setForm({
        owner_id: "",
        agent_id: "",
        name: "",
        unit: "",
        describe: "",
        size: "",
        price: "",
        state: "available",
        image: "",
        detail: {
          volumn: "",
          folio: "",
          address: "",
          office_id: "",
          initial_rent: "",
          rent_review_percentage: "",
          carousel: [],
        },
      });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={800} mx="auto" mt={4} mb={4}>
      <Typography variant="h5" mb={3}>Add New Property</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Property Information */}
          <Grid item xs={12}>
            <Typography variant="h6" mb={2}>Basic Information</Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel id="owner-select-label">Owner</InputLabel>
              <Select
                labelId="owner-select-label"
                name="owner_id"
                value={form.owner_id}
                label="Owner"
                onChange={handleSelectChange}
              >
                {owners.map((owner: any) => (
                  <MenuItem key={owner.owner_id} value={owner.owner_id}>
                    {owner.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel id="agent-select-label">Agent</InputLabel>
              <Select
                labelId="agent-select-label"
                name="agent_id"
                value={form.agent_id}
                label="Agent"
                onChange={handleSelectChange}
              >
                {agents.map((agent: any) => (
                  <MenuItem key={agent.agent_id} value={agent.agent_id}>
                    {agent.name} ({agent.agency_name})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Property Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Unit"
              name="unit"
              value={form.unit}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Size"
              name="size"
              value={form.size}
              onChange={handleChange}
              fullWidth
              required
              placeholder="e.g., 50.50"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
              fullWidth
              required
              placeholder="e.g., 10000"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              fullWidth
              select
              required
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="rented">Rented</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="describe"
              value={form.describe}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />
          </Grid>

          {/* Main Image */}
          <Grid item xs={12}>
            <ImageUpload
              label="Main Property Image"
              value={form.image}
              onChange={handleMainImageChange}
              required
              height={250}
              prefixKey="properties"
            />
          </Grid>

          {/* Property Details */}
          <Grid item xs={12}>
            <Typography variant="h6" mb={2}>Property Details</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Volume"
              value={form.detail.volumn}
              onChange={(e) => handleDetailChange("volumn", e.target.value)}
              fullWidth
              placeholder="e.g., 5532"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Folio"
              value={form.detail.folio}
              onChange={(e) => handleDetailChange("folio", e.target.value)}
              fullWidth
              placeholder="e.g., 183"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              value={form.detail.address}
              onChange={(e) => handleDetailChange("address", e.target.value)}
              fullWidth
              placeholder="e.g., 61-63 GROTE STREET, ADELAIDE SA 5000"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Office ID"
              value={form.detail.office_id}
              onChange={(e) => handleDetailChange("office_id", e.target.value)}
              fullWidth
              placeholder="e.g., 1A"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Initial Rent"
              value={form.detail.initial_rent}
              onChange={(e) => handleDetailChange("initial_rent", e.target.value)}
              fullWidth
              placeholder="e.g., 10,000"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Rent Review Percentage"
              value={form.detail.rent_review_percentage}
              onChange={(e) => handleDetailChange("rent_review_percentage", e.target.value)}
              fullWidth
              placeholder="e.g., 4.0"
            />
          </Grid>

          {/* Carousel Images */}
          <Grid item xs={12}>
            <CarouselImageUpload
              label="Carousel Images"
              value={form.detail.carousel}
              onChange={handleCarouselImagesChange}
              maxImages={5}
              height={150}
              prefixKey="properties"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            {error && <Typography color="error" mb={2}>{error}</Typography>}
            {success && <Typography color="primary" mb={2}>Property added successfully!</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              fullWidth
            >
              {loading ? "Creating Property..." : "Create Property"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}