# School Management System

A modern web application built with Next.js and MySQL for managing school data efficiently. This project allows users to add new schools with detailed information and browse existing schools in an attractive grid layout.

## 🌟 Features

- **Add Schools**: Complete form with validation for adding new school records
- **View Schools**: Responsive grid layout displaying school information
- **Image Upload**: Upload and store school images
- **Form Validation**: Comprehensive validation using React Hook Form
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Database**: MySQL
- **File Upload**: Built-in file handling
- **Deployment**: Ready for Vercel/Netlify

## 📋 Database Schema

The application uses a MySQL database with the following schema:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact VARCHAR(15) NOT NULL,
    image TEXT,
    email_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd school-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Create a MySQL database named `school_management`
   - Run the SQL script from `database.sql` to create the required table
   ```bash
   mysql -u root -p school_management < database.sql
   ```

4. **Configure environment variables**
   - Copy `.env.local` and update with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=school_management
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
school-management/
├── src/
│   ├── app/
│   │   ├── addSchool/          # Add school page
│   │   ├── showSchools/        # Display schools page
│   │   ├── api/schools/        # API routes
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   └── Navigation.tsx      # Navigation component
│   └── lib/
│       └── db.ts               # Database connection
├── public/
│   └── schoolImages/           # Uploaded school images
├── database.sql                # Database schema
└── README.md
```

## 🎯 Features Overview

### Add School Page (`/addSchool`)
- Comprehensive form with the following fields:
  - School Name (required)
  - Address (required) 
  - City (required)
  - State (required)
  - Contact Number (required, 10 digits)
  - Email (required, valid email format)
  - School Image (optional)
- Real-time form validation
- Image upload with automatic file naming
- Success/error messaging
- Responsive design for all screen sizes

### Show Schools Page (`/showSchools`)
- Grid layout displaying all schools
- Each school card shows:
  - School image (or placeholder)
  - School name
  - Complete address
  - City and state
  - Contact number
  - Email address
  - Date added
- Responsive grid (1-4 columns based on screen size)
- Loading states and error handling

## 🔧 API Endpoints

### POST `/api/schools`
Add a new school to the database
- Accepts form data with school information
- Handles image upload
- Returns success status and school ID

### GET `/api/schools`
Retrieve all schools from the database
- Returns array of school objects
- Ordered by creation date (newest first)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile phones** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)
- **Large screens** (1280px+)

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Netlify Deployment

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Database Hosting

For production, consider using:
- **PlanetScale** (MySQL-compatible)
- **AWS RDS**
- **Google Cloud SQL**
- **DigitalOcean Managed Databases**

## 🔒 Environment Variables

Create a `.env.local` file with the following variables:

```env
DB_HOST=your_database_host
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=school_management
```

## 🧪 Testing

The application includes form validation and error handling for:
- Required field validation
- Email format validation
- Phone number format validation
- File upload validation
- Database connection errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the Issues section on GitHub
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- React Hook Form for excellent form handling
- Tailwind CSS for beautiful styling
- MySQL team for reliable database solution

---

**Happy Coding! 🚀**
