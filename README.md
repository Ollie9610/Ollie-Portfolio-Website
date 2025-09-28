# Data Analyst Portfolio Website

A modern, interactive portfolio website designed specifically for data analysts, BI developers, and reporting analysts. Features a dashboard-style layout with analytics components, project showcases, and a built-in CMS for easy content management.

## 🚀 Features

- **Modern Dark Mode Design**: Sleek dark theme with animated gradients
- **Interactive Project Showcase**: Split into "Projects Delivered" and "Dashboards & Models"
- **Advanced Scroll Animations**: 3D card effects and smooth transitions
- **Profile Picture Management**: Easy photo upload and management
- **Built-in CMS**: No external dependencies - manage content directly in the admin panel
- **Responsive Design**: Works perfectly on all devices
- **Professional Appearance**: Designed to impress employers

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Styled Components for styling
- Framer Motion for advanced animations
- Recharts for data visualizations
- React Icons for icons
- Local Storage for data persistence

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm (version 6 or higher)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm start
```

The React app will be available at `http://localhost:3000`

### 3. Access the Admin Panel

1. Visit `http://localhost:3000/admin`
2. Login with:
   - Username: `admin`
   - Password: `portfolio2024`
3. Manage your content through the intuitive dashboard

## 📁 Project Structure

```
portfolio-site/
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx        # Hero section with profile picture
│   │   ├── Projects.tsx    # Project showcase (split sections)
│   │   ├── Skills.tsx      # Skills with animations
│   │   ├── Experience.tsx  # Work experience timeline
│   │   ├── AdminDashboard.tsx # CMS admin panel
│   │   ├── ProfileEditor.tsx  # Profile management
│   │   └── ...
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx # Authentication
│   │   └── DataContext.tsx # Data management
│   ├── data/              # JSON data files
│   │   ├── projects.json  # Project data
│   │   ├── experiences.json # Experience data
│   │   ├── skills.json    # Skills data
│   │   └── profile.json   # Profile data
│   ├── types/             # TypeScript types
│   └── App.tsx
├── package.json
└── README.md
```

## 🎨 Customization

### Personal Information
Update your personal information through the admin panel:
- **Profile Tab**: Name, title, bio, contact info, profile picture
- **Projects Tab**: Add/edit your portfolio projects
- **Experience Tab**: Manage your work experience
- **Skills Tab**: Update your technical skills

### Styling
The website uses a modern dark theme with:
- **Background**: Deep black with animated gradient overlays
- **Accents**: Purple/blue gradients (#667eea to #764ba2)
- **Text**: White with various opacity levels
- **Effects**: Glassmorphism with backdrop blur

### Content Management
All content is managed through the built-in CMS:
- **Projects**: Split into "Projects Delivered" and "Dashboards & Models"
- **Profile**: Complete personal information management
- **Experience**: Professional timeline with achievements
- **Skills**: Categorized skills with proficiency levels

## 📊 Content Types

### Project
- Title, description, category (project/dashboard)
- Image URL
- Technologies array
- Metrics (views, impact, duration)
- Detailed information (challenge, solution, results)
- Features list

### Experience
- Job title, company, location
- Duration and description
- Achievements list
- Technologies used

### Skill
- Name and proficiency level (1-100)
- Category (Technical, Analytical, Tools, Soft Skills)

### Profile
- Name, title, bio
- Contact information (email, phone, location)
- Profile image URL

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. No backend required - everything is client-side!

### Alternative Hosting
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- Any static hosting service

## 🎯 Key Features for Employers

- **Professional Dark Mode**: Modern, sophisticated appearance
- **Advanced Animations**: 3D effects and smooth transitions
- **Split Project Sections**: Clear categorization of work types
- **Profile Picture**: Personal touch with professional presentation
- **Interactive Elements**: Hover effects and scroll animations
- **Mobile Responsive**: Perfect on all devices
- **Easy Content Management**: Update content without coding

## 🎨 Animation Features

- **Scroll-triggered animations**: Elements animate as you scroll
- **3D card effects**: Projects and skills have depth and rotation
- **Gradient animations**: Text and borders have animated gradients
- **Hover interactions**: Smooth scale and rotation effects
- **Staggered entrances**: Elements appear in sequence
- **Floating elements**: Background animations for visual interest

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Admin Panel Features

- **Profile Management**: Complete personal information editing
- **Project Management**: Add, edit, and delete projects
- **Experience Management**: Timeline management
- **Skills Management**: Categorized skill editing
- **Live Preview**: See changes immediately
- **Data Persistence**: All changes saved to local storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for errors
2. Ensure Node.js is properly installed
3. Try clearing browser cache
4. Check the admin panel for data issues

## 🎉 Getting Started

1. Clone this repository
2. Run `npm install`
3. Run `npm start`
4. Visit `http://localhost:3000/admin` to customize your content
5. Deploy and share your professional portfolio!

---

**Happy coding!** 🚀