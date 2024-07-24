# StoreOps: Store Frontend Example

[checkout this video](https://youtu.be/iBbT-Pzn-aA) from more detail


## Introduction

This repository contains the frontend example for the StoreOps e-commerce platform. It demonstrates how to create a customer-facing storefront that integrates with the StoreOps admin portal API.

## Features

- Responsive design for optimal viewing on various devices
- Product browsing and searching
- Shopping cart functionality
- Integration with StoreOps admin portal API

## Store Front End Setup Guide

Follow these steps to set up the StoreOps store frontend example project on your local machine:

1. Clone the repository:

```
git clone https://github.com/niranjangirhe/ecommerce-store-frontend.git
```

2. Install dependencies (Node.js version 20 is recommended):

```
npm i
```

3. Set up environment variables as per the sample.env file.

4. Start the development server:

```
NEXT_PUBLIC_API_URL=
```

You'll get this value from the admin portal in the settings section. Check out the Base URL section in the StoreOps admin portal repository for more information.

**Important:** Make sure you have a store set up in the admin portal to ensure proper functioning of the store frontend.

## Prerequisites

Before running this frontend, ensure you have:

1. Set up the StoreOps admin portal [link](https://github.com/niranjangirhe/storeops-admin-portal)
2. Created at least one store in the admin portal
3. Obtained the API URL for your store

## Usage

After setting up the project and starting the development server, you can access the store frontend in your web browser. The frontend will interact with the StoreOps admin portal API to fetch and display products, handle cart operations, and process orders.

## Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please read our [Contributing Guidelines](CONTRIBUTING.md) for detailed information on how to get started, submit changes, and more.

## License

Your contributions help make this project better for everyone. Thank you for your interest and support!

## Support

If you encounter any issues or need further clarification, please open an issue in this repository or contact our support team.

## Additional Resources

For more detailed information about the StoreOps project and its API, please visit our documentation:

[StoreOps Documentation](https://storeops-admin.vercel.app/docs)
