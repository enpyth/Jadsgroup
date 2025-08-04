import * as React from 'react';

export interface LeaseNotificationEmailProps {
  leaseId: string;
  applicantName: string;
  propertyAddress: string;
  message: string;
}

export function LeaseNotificationEmail(props: LeaseNotificationEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ color: '#2c3e50', margin: '0 0 10px 0' }}>New Lease Request</h2>
        <p style={{ color: '#7f8c8d', margin: '0' }}>A new lease application has been submitted</p>
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
        <h3 style={{ color: '#2c3e50', margin: '0 0 15px 0' }}>Application Details</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#34495e' }}>Lease ID:</strong>
          <span style={{ marginLeft: '10px', color: '#7f8c8d' }}>{props.leaseId}</span>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#34495e' }}>Applicant:</strong>
          <span style={{ marginLeft: '10px', color: '#7f8c8d' }}>{props.applicantName}</span>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong style={{ color: '#34495e' }}>Property Address:</strong>
          <span style={{ marginLeft: '10px', color: '#7f8c8d' }}>{props.propertyAddress}</span>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <strong style={{ color: '#34495e' }}>Message:</strong>
          <p style={{ margin: '10px 0 0 0', color: '#7f8c8d', lineHeight: '1.5' }}>{props.message}</p>
        </div>

        <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '6px', border: '1px solid #d4edda' }}>
          <p style={{ margin: '0', color: '#155724', fontWeight: 'bold' }}>
            📋 Review Application
          </p>
          <p style={{ margin: '5px 0 0 0', color: '#155724' }}>
            Click the link below to review the full application:
          </p>
          <a 
            href={`https://www.jadsgroup.com/dashboard/lease/${props.leaseId}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#28a745',
              color: '#ffffff',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px',
              fontWeight: 'bold'
            }}
          >
            View Application
          </a>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px', color: '#7f8c8d', fontSize: '12px' }}>
        <p>This is an automated notification from the Jads Group lease management system.</p>
      </div>
    </div>
  );
} 