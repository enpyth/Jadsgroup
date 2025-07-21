import * as React from 'react';

export interface ContactEnquiryEmailProps {
  tab: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  microGrid: boolean;
  powerPurchase: boolean;
  freshGrowers: boolean;
  properties: boolean;
  message: string;
  verification: string;
}

export function ContactEnquiryEmail(props: ContactEnquiryEmailProps) {
  return (
    <div>
      <h2>New Contact Enquiry</h2>
      <p><strong>Type:</strong> {props.tab}</p>
      <p><strong>Name:</strong> {props.name}</p>
      <p><strong>Mobile:</strong> {props.mobile}</p>
      <p><strong>Email:</strong> {props.email}</p>
      <p><strong>Address:</strong> {props.address}</p>
      <p><strong>Interests:</strong> {[
        props.microGrid && 'Micro Grid',
        props.powerPurchase && 'Power Purchase',
        props.freshGrowers && 'Fresh Growers',
        props.properties && 'Properties',
      ].filter(Boolean).join(', ') || 'None'}</p>
      <p><strong>Message:</strong> {props.message}</p>
    </div>
  );
} 