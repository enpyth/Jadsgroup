"use client";
import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";

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
    detail: "",
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
          detail: form.detail ? JSON.parse(form.detail) : {},
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
        detail: "",
      });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Typography variant="h5" mb={2}>Add New Property</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" required>
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
        <FormControl fullWidth margin="normal" required>
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
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Unit"
          name="unit"
          value={form.unit}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="describe"
          value={form.describe}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Size"
          name="size"
          value={form.size}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="State"
          name="state"
          value={form.state}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Detail (JSON)"
          name="detail"
          value={form.detail}
          onChange={handleChange}
          fullWidth
          margin="normal"
          helperText="Enter JSON object"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">Property added!</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Submitting..." : "Add Property"}
        </Button>
      </form>
    </Box>
  );
}