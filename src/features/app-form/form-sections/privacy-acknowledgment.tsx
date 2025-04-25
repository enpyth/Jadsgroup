"use client"

import { useState } from "react"
import { Box, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material"
import { SectionTitle } from "../ui-custom/section-title"

export default function PrivacyAcknowledgment() {
  const [agreed, setAgreed] = useState(false)

  return (
    <Box>
      <SectionTitle>Privacy Act Acknowledgment</SectionTitle>

      <Paper elevation={0} sx={{ p: 4, bgcolor: "background.paper", borderRadius: 2, mb: 3 }}>
        <Typography variant="body1" paragraph>
          In accordance with Section 18n(1) (b) of the Privacy Act I authorise you to give information to and obtain
          information from all credit providers and references named in this application. I understand this can include
          information about my credit worthiness, credit standing, credit history or credit capacity. I understand this
          information may be used to assess my application.
        </Typography>
        <Typography variant="body1" paragraph>
          I/We hereby certify that the above information is true and correct as the date of this application and that
          the assets as stated are held solely by me/us and are not held in a trust capacity.
        </Typography>
        <Typography variant="body1">
          I/We hereby authorise the Agent to make all necessary enquiries to verify the information provided herein,
          including information relating to my/our employment, rental history, credit, business and personal references.
        </Typography>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} color="primary" />}
            label="I Agree to the terms and conditions stated above"
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Applicant Digital Signature
          </Typography>
          <TextField
            label="Type your full name as signature"
            fullWidth
            variant="outlined"
            disabled={!agreed}
            placeholder={agreed ? "e.g. John Smith" : "Please agree to the terms first"}
          />
        </Box>
      </Paper>
    </Box>
  )
}
