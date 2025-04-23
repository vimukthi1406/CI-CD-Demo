# Sri Lanka Electricity Bill Calculator

The Sri Lanka Electricity Bill Calculator is a Micro SaaS application designed to help Sri Lankan residents and businesses accurately calculate their electricity bills based on the complex tariff structure set by the Ceylon Electricity Board (CEB) and Lanka Electricity Company (LECO). This tool aims to provide clarity and transparency in electricity billing, helping users budget effectively and identify potential energy-saving opportunities.

## Deployment & CI/CD Pipeline

This application is built with Next.js and automatically deployed using Netlify's CI/CD pipeline.

### CI/CD Workflow

1. **Continuous Integration**:
   - Every push to the main branch triggers automated builds
   - Code is automatically tested and validated
   - Build previews are generated for pull requests

2. **Continuous Deployment**:
   - Successful builds on the main branch are automatically deployed to production
   - Zero-downtime deployments ensure uninterrupted service
   - Each deployment creates a unique URL for version tracking

### Netlify Deployment Features

- **Automatic HTTPS**: SSL certificates are automatically provisioned and renewed
- **Edge Network**: Content is distributed globally for fast access
- **Branch Deploys**: Feature branches get their own preview deployments
- **Deploy Previews**: Visual review of changes before merging to main
- **Environment Variables**: Secure management of configuration values
- **Build Plugins**: Optimized build process for Next.js applications
- **Serverless Functions**: Support for API routes and server components

### Development Workflow

1. Make changes locally and push to GitHub
2. Netlify automatically builds and deploys your changes
3. Review deploy previews for pull requests
4. Merge to main for production deployment

[Live Demo](https://srilankaelectricitybillcalculator.netlify.app/)


