"use client";
import { use, useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface EditLandownerPageProps {
  params: Promise<{ landownerId: string }>;
}

export default function EditLandownerPage({ params }: EditLandownerPageProps) {
  const { landownerId } = use(params);
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    company: "",
    acn: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function fetchLandowner() {
      try {
        const response = await fetch(`/api/properties/owners/${landownerId}`);
        if (!response.ok) throw new Error("Failed to fetch landowner");
        const owner = await response.json();
        setForm({
          name: owner.name || "",
          phone: owner.phone || "",
          email: owner.email || "",
          address: owner.address || "",
          company: typeof owner.company === 'string' ? owner.company : owner.company?.name || "",
          acn: typeof owner.company === 'string' ? "" : owner.company?.acn || "",
        });
      } catch (err) {
        setError("Failed to load landowner data");
      } finally {
        setInitialLoading(false);
      }
    }
    fetchLandowner();
  }, [landownerId]);

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
      const res = await fetch(`/api/properties/owners/${landownerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          company: { name: form.company, acn: form.acn },
        }),
      });
      if (!res.ok) throw new Error("Failed to update landowner");
      setSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard/landowner/${landownerId}`);
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
      <Typography variant="h5" mb={2}>Edit Landowner</Typography>
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
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Company"
          name="company"
          value={form.company}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="ACN"
          name="acn"
          value={form.acn}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">Landowner updated successfully! Redirecting...</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Updating..." : "Update Landowner"}
        </Button>
      </form>
    </Box>
  );
} 