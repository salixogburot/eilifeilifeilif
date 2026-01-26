# HIWAI Research Project Website

A professional, responsive website for the HIWAI (Hydrogen Impacts on Water and Atmospheric Interactions) research project.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Professional Layout**: Clean, modern design suitable for academic/research projects
- **Multiple Pages**: Home, About, News, and Team pages
- **Simple CMS**: Built-in content management system for easy updates
- **GitHub Pages Ready**: Configured for easy deployment

## Pages

1. **Home (`index.html`)**: Landing page with hero section, features, stats, and latest news
2. **About (`about.html`)**: Project mission, research approach, and objectives
3. **News (`news.html`)**: News articles and updates
4. **Team (`team.html`)**: Team members and partner organizations

## Content Management System (CMS)

The website includes a simple CMS for managing content without touching HTML files.

### Using the CMS

1. Open `admin/index.html` in your browser
2. Navigate to the section you want to edit
3. Make your changes in the forms
4. Click "Save Changes" to preview
5. Click "Download JSON" to get the updated content file
6. Replace the corresponding file in `/content/` directory
7. Commit and push to GitHub

### Content Files

Content is stored in JSON files in the `/content/` directory:

- `home.json` - Home page content (hero, features)
- `about.json` - About page content (mission, stats, objectives)
- `news.json` - News articles
- `team.json` - Team members and organizations
- `site.json` - Site-wide settings (contact info, social links)

## Deployment to GitHub Pages

### Option 1: Deploy from Root

1. Go to your repository Settings > Pages
2. Under "Source", select "Deploy from a branch"
3. Choose `main` branch and `/hiwai` folder (or root if you move files)
4. Click Save
5. Your site will be available at `https://yourusername.github.io/reponame/hiwai/`

### Option 2: Deploy from Docs Folder

1. Rename `hiwai` folder to `docs`
2. Go to repository Settings > Pages
3. Under "Source", select `main` branch and `/docs` folder
4. Click Save

### Option 3: Use GitHub Actions

Create `.github/workflows/deploy.yml` for custom deployment workflows.

## Customization

### Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #0066cc;     /* Main blue */
    --secondary-color: #00a86b;   /* Green accent */
    --accent-color: #f0f7ff;      /* Light background */
    /* ... more variables */
}
```

### Adding Images

1. Place images in the `images/` folder
2. Reference them in content JSON files or HTML
3. For team photos, use the `photo` field in team.json
4. For news images, use the `image` field in news.json

### Adding New Pages

1. Copy an existing HTML file
2. Update the content and navigation
3. Add the page to the navigation in all HTML files
4. Create corresponding content JSON if needed

## File Structure

```
hiwai/
├── index.html           # Home page
├── about.html           # About page
├── news.html            # News page
├── team.html            # Team page
├── README.md            # This file
├── css/
│   └── style.css        # Main stylesheet
├── js/
│   └── main.js          # Main JavaScript
├── content/
│   ├── home.json        # Home page content
│   ├── about.json       # About page content
│   ├── news.json        # News articles
│   ├── team.json        # Team & organizations
│   └── site.json        # Site settings
├── admin/
│   ├── index.html       # CMS interface
│   ├── cms.css          # CMS styles
│   └── cms.js           # CMS functionality
└── images/              # Image assets
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This website template is provided for the HIWAI research project.
