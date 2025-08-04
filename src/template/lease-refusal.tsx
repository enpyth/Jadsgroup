import * as React from 'react';

export interface LeaseRefusalEmailProps {
  applicantName: string;
  leaseId: string;
  refusalReason?: string;
  message: string;
}

export function LeaseRefusalEmail(props: LeaseRefusalEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ color: '#2c3e50', margin: '0 0 10px 0' }}>Lease Application Update</h2>
        <p style={{ color: '#7f8c8d', margin: '0' }}>Your lease application has been reviewed</p>
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '15px', 
          borderRadius: '6px', 
          border: '1px solid #ffeaa7',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#856404', margin: '0 0 10px 0' }}>Application Status: Not Approved</h3>
          <p style={{ color: '#856404', margin: '0', lineHeight: '1.5' }}>
            Dear {props.applicantName},
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#2c3e50', lineHeight: '1.6', margin: '0 0 15px 0' }}>
            Thank you for your interest in our property and for taking the time to submit your lease application (ID: {props.leaseId}).
          </p>
          
          <p style={{ color: '#2c3e50', lineHeight: '1.6', margin: '0 0 15px 0' }}>
            After careful review of your application, we regret to inform you that we are unable to proceed with your lease request at this time. This decision was made after thorough consideration of all application criteria and current market conditions.
          </p>

          <p style={{ color: '#2c3e50', lineHeight: '1.6', margin: '0 0 15px 0' }}>
            We understand this may be disappointing news, and we appreciate your understanding. We encourage you to consider other properties in our portfolio that may better suit your requirements.
          </p>
        </div>

        {props.refusalReason && (
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '6px', 
            border: '1px solid #e9ecef',
            marginBottom: '20px'
          }}>
            <strong style={{ color: '#495057' }}>Additional Information:</strong>
            <p style={{ color: '#6c757d', margin: '10px 0 0 0', lineHeight: '1.5' }}>
              {props.refusalReason}
            </p>
          </div>
        )}

        <div style={{ 
          backgroundColor: '#e8f5e8', 
          padding: '15px', 
          borderRadius: '6px', 
          border: '1px solid #d4edda',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: '#155724', margin: '0 0 10px 0' }}>Next Steps</h4>
          <ul style={{ color: '#155724', margin: '0', paddingLeft: '20px' }}>
            <li>You may apply for other available properties in our portfolio</li>
            <li>Feel free to contact us for assistance with future applications</li>
          </ul>
        </div>

        <div style={{ 
          backgroundColor: '#d1ecf1', 
          padding: '15px', 
          borderRadius: '6px', 
          border: '1px solid #bee5eb'
        }}>
          <h4 style={{ color: '#0c5460', margin: '0 0 10px 0' }}>Contact Information</h4>
          <p style={{ color: '#0c5460', margin: '0 0 5px 0' }}>
            <strong>Phone:</strong> +61 (0) 123 456 789
          </p>
          <p style={{ color: '#0c5460', margin: '0 0 5px 0' }}>
            <strong>Email:</strong> support@jadsgroup.com
          </p>
          <p style={{ color: '#0c5460', margin: '0' }}>
            <strong>Website:</strong> www.jadsgroup.com
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px', color: '#7f8c8d', fontSize: '12px' }}>
        <p>This is an automated notification from the Jads Group lease management system.</p>
        <p>Thank you for considering Jads Group for your property needs.</p>
      </div>
    </div>
  );
} 