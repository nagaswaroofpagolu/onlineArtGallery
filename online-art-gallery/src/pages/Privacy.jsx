import React from 'react';
import '../styles/privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: November 3, 2025</p>

        <section className="privacy-section">
          <h2>Introduction</h2>
          <p>
            Welcome to Online Art Gallery. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Information We Collect</h2>
          <h3>Account Information</h3>
          <ul>
            <li>Name and email address when you create an account</li>
            <li>Profile information (biography, profile picture)</li>
            <li>Password (securely hashed and encrypted)</li>
          </ul>

          <h3>Artist Information</h3>
          <ul>
            <li>Artwork submissions and descriptions</li>
            <li>Artist biography and portfolio</li>
            <li>Payment information for sales</li>
          </ul>

          <h3>Customer Information</h3>
          <ul>
            <li>Purchase history</li>
            <li>Shipping addresses</li>
            <li>Payment details (processed securely through our payment processor)</li>
          </ul>

          <h3>Usage Data</h3>
          <ul>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>IP address and location data</li>
            <li>Pages visited and interaction with content</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To process your transactions</li>
            <li>To communicate with you about your account or purchases</li>
            <li>To improve our website and user experience</li>
            <li>To protect against fraud and unauthorized access</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Data Protection</h2>
          <p>
            We implement robust security measures to protect your personal information:
          </p>
          <ul>
            <li>Encryption of sensitive data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Strict access controls for employee data access</li>
            <li>Regular backups and disaster recovery procedures</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Your Data Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for data processing</li>
            <li>Export your data in a portable format</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will remove your personal information within 30 days, except where we must retain it for legal purposes.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services for:
          </p>
          <ul>
            <li>Payment processing</li>
            <li>Analytics</li>
            <li>Email communications</li>
            <li>Cloud storage</li>
          </ul>
          <p>
            These services have their own privacy policies and may collect and use your information according to their terms.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for users under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your personal data, please contact us at:
          </p>
          <div className="contact-details">
            <p>Email: privacy@onlineartgallery.com</p>
            <p>Phone: 1-800-ART-HELP</p>
            <p>Address: 123 Gallery Street, Art City, AC 12345</p>
          </div>
        </section>
      </div>
    </div>
  );
}