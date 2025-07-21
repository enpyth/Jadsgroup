"use client";
import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { getAgentById } from "@/db/queries/properties";

interface EditAgentPageProps {
  params: {
    agentId: string;
  };
}

export default function EditAgentPage({ params }: EditAgentPageProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    agency_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch agent data on component mount
  useEffect(() => {
    async function fetchAgent() {
      try {
        const response = await fetch(`/api/properties/agents/${params.agentId}`);
        if (!response.ok) throw new Error("Failed to fetch agent");
        const agent = await response.json();
        setForm({
          name: agent.name || "",
          phone: agent.phone || "",
          email: agent.email || "",
          agency_name: agent.agency_name || "",
        });
      } catch (err) {
        setError("Failed to load agent data");
      } finally {
        setInitialLoading(false);
      }
    }
    fetchAgent();
  }, [params.agentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as string;
    setForm({ ...form, [name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(`/api/properties/agents/${params.agentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update agent");
      setSuccess(true);
      // Redirect to agent details after successful update
      setTimeout(() => {
        router.push(`/dashboard/agent/${params.agentId}`);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Box maxWidth={500} mx="auto" mt={4}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Typography variant="h5" mb={2}>Edit Agent</Typography>
      <form onSubmit={handleSubmit}>
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
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Agency Name"
          name="agency_name"
          value={form.agency_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">Agent updated successfully! Redirecting...</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Updating..." : "Update Agent"}
        </Button>
      </form>
    </Box>
  );
} 