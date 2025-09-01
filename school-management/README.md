# 🏫 School Management System

<div align="center">

![School Management](https://img.shields.io/badge/Next.js-14.0.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

*A modern, responsive web application for efficient school data management*

[🚀 Live Demo](#) | [📖 Documentation](#-quick-start) | [🐛 Report Bug](#-support--help) | [💡 Request Feature](#-support--help)

</div>

---

## 📖 Table of Contents

<details>
<summary><strong>🗂️ Click to expand navigation</strong></summary>

- [📝 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🗄️ Database Schema](#️-database-schema)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Architecture](#-project-architecture)
- [🎯 Application Features](#-application-features)
- [🔌 API Documentation](#-api-documentation)
- [📱 Responsive Design](#-responsive-design)
- [🚀 Deployment Guide](#-deployment-guide)
- [🧪 Testing & Validation](#-testing--validation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🆘 Support & Help](#-support--help)
- [🙏 Acknowledgments](#-acknowledgments)

</details>

---

## 📝 Overview

A comprehensive school management system built with **Next.js 14** and **MySQL**, featuring a modern UI and robust functionality for managing educational institutions. The application provides an intuitive interface for adding new schools with detailed information and browsing existing records in an attractive, responsive grid layout.

## ✨ Key Features

<table>
<tr>
<td>

### 🏗️ **Core Functionality**
- ✅ **Add Schools** - Complete form with validation
- 👀 **View Schools** - Responsive grid layout  
- 📷 **Image Upload** - Upload and store school images
- 🔍 **Form Validation** - React Hook Form integration
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Clean Tailwind CSS styling

</td>
<td>

### 🛡️ **Technical Features**
- ⚡ **Next.js 14** - App Router & Server Components
- 🔒 **TypeScript** - Type-safe development
- 🗄️ **MySQL Integration** - Robust data persistence
- 🚀 **API Routes** - RESTful endpoints
- 📝 **Form Handling** - React Hook Form validation
- 🌐 **SEO Optimized** - Meta tags and structure

</td>
</tr>
</table>

## 🛠️ Tech Stack

<div align="center">

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) | 14.0.3 | React Framework |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) | 5.0+ | Type Safety |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | 3.3.0 | UI Styling |
| **Forms** | ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat&logo=reacthookform&logoColor=white) | 7.48.2 | Form Management |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) | 8.0+ | Data Storage |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) | - | Hosting Platform |

</div>

## 🗄️ Database Schema

<details>
<summary><strong>📊 Click to view database structure</strong></summary>

The application uses a **MySQL** database with the following optimized schema:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- 🔑 Unique identifier
    name TEXT NOT NULL,                          -- 🏫 School name
    address TEXT NOT NULL,                       -- 📍 Full address
    city TEXT NOT NULL,                          -- 🌆 City name
    state TEXT NOT NULL,                         -- 🗺️ State/Province
    contact VARCHAR(15) NOT NULL,                -- 📞 Contact number
    image TEXT,                                  -- 🖼️ Image file path (optional)
    email_id TEXT NOT NULL,                      -- 📧 Email address
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     -- 📅 Creation date
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- 🔄 Last update
);
```

### Field Specifications:
- **Primary Key**: Auto-incrementing ID for unique identification
- **Required Fields**: Name, address, city, state, contact, email
- **Optional Fields**: Image (can be null)
- **Timestamps**: Automatic creation and update tracking

</details>

## 🚀 Quick Start

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white) **Node.js 18+**
- ![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=flat&logo=mysql&logoColor=white) **MySQL 8.0+**
- ![npm](https://img.shields.io/badge/npm-latest-CB3837?style=flat&logo=npm&logoColor=white) **npm or yarn**

### ⚡ Installation

Follow these steps to get your development environment running:

<details>
<summary><strong>🔧 Step-by-step setup</strong></summary>

#### 1️⃣ **Clone the repository**
```bash
git clone https://github.com/your-username/school-management.git
cd school-management
```

#### 2️⃣ **Install dependencies**
```bash
npm install
# or
yarn install
```

#### 3️⃣ **Set up the database**
Create a MySQL database and import the schema:
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE school_management;"

# Import schema
mysql -u root -p school_management < database.sql
```

#### 4️⃣ **Configure environment variables**
Create a `.env.local` file in the root directory:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
DB_PORT=3306

# For cloud databases (optional)
DATABASE_URL=mysql://username:password@host:port/database
```

#### 5️⃣ **Test database connection**
```bash
npm run test-db
```

#### 6️⃣ **Start the development server**
```bash
npm run dev
```

#### 7️⃣ **Open your browser**
Navigate to **[http://localhost:3000](http://localhost:3000)** 🎉

</details>

### 🎯 Quick Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test-db` | Test database connection |

## 📁 Project Architecture

<details>
<summary><strong>🏗️ Click to explore project structure</strong></summary>

```
school-management/
├── 📂 src/
│   ├── 📂 app/                     # Next.js 14 App Router
│   │   ├── 📂 addSchool/           # ➕ Add new school page
│   │   │   └── page.tsx
│   │   ├── 📂 showSchools/         # 👀 Display schools grid
│   │   │   └── page.tsx
│   │   ├── 📂 api/
│   │   │   └── 📂 schools/         # 🔌 REST API endpoints
│   │   │       └── route.ts
│   │   ├── 🎨 globals.css          # Global styles
│   │   ├── 🏠 layout.tsx           # Root layout component
│   │   └── 🏡 page.tsx             # Home page
│   ├── 📂 components/
│   │   └── 🧭 Navigation.tsx       # Navigation component
│   └── 📂 lib/
│       └── 🗄️ db.ts                # Database connection & config
├── 📂 public/
│   └── 📂 schoolImages/            # 🖼️ Uploaded school images
├── 📂 api/                         # 🔌 Legacy API routes (backup)
│   └── 📂 schools/
├── 🗃️ database.sql                 # Database schema & setup
├── ⚙️ next.config.js               # Next.js configuration
├── 🎨 tailwind.config.ts           # Tailwind CSS config
├── 📝 tsconfig.json                # TypeScript configuration
├── 📦 package.json                 # Dependencies & scripts
└── 📚 README.md                    # Project documentation
```

### 🏗️ Architecture Highlights:
- **App Router**: Utilizing Next.js 14's latest routing system
- **API Routes**: RESTful endpoints for CRUD operations
- **Component-Based**: Modular, reusable React components
- **TypeScript**: Full type safety across the application
- **File-Based Routing**: Intuitive page organization

</details>

## 🎯 Application Features

<div align="center">

### 🌟 **User Experience Highlights**

</div>

<table>
<tr>
<td width="50%">

#### ➕ **Add School Page** (`/addSchool`)

**Form Fields:**
- 🏫 **School Name** *(required)*
- 📍 **Address** *(required)*
- 🌆 **City** *(required)*
- 🗺️ **State** *(required)*
- 📞 **Contact Number** *(required, 10 digits)*
- 📧 **Email** *(required, valid format)*
- 🖼️ **School Image** *(optional)*

**Features:**
- ✅ Real-time form validation
- 📤 Drag & drop image upload
- 🏷️ Automatic file naming
- 🎯 Success/error messaging
- 📱 Mobile-optimized design

</td>
<td width="50%">

#### 👀 **Show Schools Page** (`/showSchools`)

**Display Information:**
- 🖼️ School image or placeholder
- 🏫 School name
- 📍 Complete address
- 🌆 City and state information
- 📞 Contact number
- 📧 Email address
- 📅 Date added

**Grid Features:**
- 📱 Responsive layout (1-4 columns)
- ⚡ Loading states & error handling
- 🎨 Modern card design
- 🔍 Hover effects

</td>
</tr>
</table>

## 🔌 API Documentation

<details>
<summary><strong>📋 View API endpoints</strong></summary>

### 📤 **POST** `/api/schools`
Add a new school to the database

**Request:**
```javascript
// Content-Type: multipart/form-data
{
  "name": "School Name",
  "address": "123 School Street",
  "city": "City Name",
  "state": "State Name",
  "contact": "1234567890",
  "email": "school@email.com",
  "image": File // Optional
}
```

**Response:**
```javascript
{
  "success": true,
  "message": "School added successfully",
  "schoolId": 123
}
```

---

### 📥 **GET** `/api/schools`
Retrieve all schools from the database

**Response:**
```javascript
{
  "success": true,
  "schools": [
    {
      "id": 1,
      "name": "Example School",
      "address": "123 School Street",
      "city": "City Name",
      "state": "State Name",
      "contact": "1234567890",
      "email": "school@email.com",
      "image": "/schoolImages/1234567890-image.jpg",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

## 📱 Responsive Design

<div align="center">

### 🎨 **Multi-Device Support**

| Device | Breakpoint | Layout | Optimization |
|--------|------------|--------|-------------|
| 📱 **Mobile** | 320px+ | Single column | Touch-friendly buttons |
| 📱 **Large Mobile** | 480px+ | Single column | Improved spacing |
| 💻 **Tablet** | 768px+ | 2-column grid | Enhanced navigation |
| 🖥️ **Desktop** | 1024px+ | 3-column grid | Full feature set |
| 📺 **Large Screen** | 1280px+ | 4-column grid | Maximum content |

**Key Features:**
- 🎯 **Mobile-first approach** for optimal performance
- 🔄 **Flexible grid system** that adapts to any screen size
- 👆 **Touch-optimized** interface elements
- ⚡ **Progressive enhancement** for larger screens

</div>

## 🚀 Deployment Guide

<div align="center">

### 🌐 **Production Deployment Options**

</div>

<table>
<tr>
<td width="50%">

#### ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) **Vercel** (Recommended)

1. **📤 Push to GitHub**
   ```bash
   git push origin main
   ```

2. **🔗 Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository

3. **⚙️ Configure Environment Variables**
   ```env
   DATABASE_URL=your_production_db_url
   NODE_ENV=production
   ```

4. **🚀 Deploy**
   - Automatic deployment on push
   - Zero-config setup for Next.js

</td>
<td width="50%">

#### ![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat&logo=railway&logoColor=white) **Railway** (Alternative)

1. **📦 Connect Repository**
   - Link your GitHub repo

2. **🗄️ Add MySQL Service**
   - One-click MySQL deployment

3. **🔧 Environment Setup**
   - Auto-generated DATABASE_URL

4. **✅ Deploy**
   - Automatic builds & deployments

</td>
</tr>
</table>

### 🗄️ **Database Hosting Options**

| Provider | Free Tier | Best For | Setup Difficulty |
|----------|-----------|----------|------------------|
| ![PlanetScale](https://img.shields.io/badge/PlanetScale-000000?style=flat&logo=planetscale&logoColor=white) **PlanetScale** | ✅ 1 billion reads | Next.js apps | 🟢 Easy |
| ![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat&logo=railway&logoColor=white) **Railway** | ✅ $5 credit | Development | 🟢 Easy |
| ![AWS RDS](https://img.shields.io/badge/AWS_RDS-FF9900?style=flat&logo=amazon-aws&logoColor=white) **AWS RDS** | ✅ 12 months | Production | 🟡 Medium |
| ![Aiven](https://img.shields.io/badge/Aiven-FF3F46?style=flat&logo=aiven&logoColor=white) **Aiven** | ✅ 30 days trial | Enterprise | 🟡 Medium |

<details>
<summary><strong>🔧 Detailed deployment instructions</strong></summary>

### Environment Variables Setup

Create these variables in your deployment platform:

```env
# Database Configuration
DATABASE_URL=mysql://username:password@host:port/database

# Optional: Individual database credentials
DB_HOST=your_database_host
DB_USER=your_database_username  
DB_PASSWORD=your_database_password
DB_NAME=school_management
DB_PORT=3306

# Application
NODE_ENV=production
```

### Pre-deployment Checklist

- [ ] ✅ Database schema imported
- [ ] 🔧 Environment variables configured
- [ ] 🧪 Database connection tested
- [ ] 📦 Dependencies up to date
- [ ] 🔒 Sensitive data secured

</details>

## 🧪 Testing & Validation

<details>
<summary><strong>🔍 Testing features included</strong></summary>

### Form Validation
- ✅ **Required field validation** - All mandatory fields checked
- 📧 **Email format validation** - Valid email pattern required
- 📞 **Phone number validation** - 10-digit format enforced
- 🖼️ **File upload validation** - Image type and size limits
- 🗄️ **Database connection errors** - Graceful error handling

### Built-in Test Commands
```bash
npm run test-db          # Test database connectivity
npm run lint             # Check code quality
npm run build            # Test production build
```

</details>

## 🤝 Contributing

<div align="center">

### 🌟 **We welcome contributions!**

</div>

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **💾 Commit** your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **📤 Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **🔄 Open** a Pull Request

### 📋 Contribution Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Help

<table>
<tr>
<td width="50%">

### 🐛 **Found a Bug?**
1. Check existing [GitHub Issues](../../issues)
2. Create a [new issue](../../issues/new) with:
   - Detailed description
   - Steps to reproduce
   - Error messages
   - Environment details

</td>
<td width="50%">

### 💡 **Need Help?**
- 📖 Read the documentation above
- 🔍 Search existing issues
- 💬 Start a [discussion](../../discussions)
- 📧 Contact the maintainers

</td>
</tr>
</table>

## 🙏 Acknowledgments

<div align="center">

**Built with ❤️ using amazing open-source technologies**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)

</div>

### Special Thanks To:
- 🚀 **Next.js team** - For the incredible React framework
- 📝 **React Hook Form** - For excellent form handling
- 🎨 **Tailwind CSS** - For beautiful, utility-first styling  
- 🗄️ **MySQL team** - For reliable database solutions
- 🌐 **Vercel** - For seamless deployment platform

---

<div align="center">

### 🎉 **Ready to build something amazing?**

**Star this repo if it helped you!** ⭐

[🚀 Get Started](#-quick-start) | [📖 Documentation](#-overview) | [🤝 Contribute](#-contributing)

**Happy Coding!** 💻✨

</div>
