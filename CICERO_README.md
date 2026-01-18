# CICERO Projects Data Visualization

An interactive data visualization dashboard for analyzing CICERO research projects with advanced filtering capabilities.

## Overview

This visualization provides comprehensive insights into CICERO (Center for International Climate Research) project data:

- **Language Availability**: Which projects have English web pages vs. Norwegian-only
- **Project Status**: Distribution of ongoing, ended, and unknown status projects
- **Research Group Connections**: Projects with and without research group affiliations
- **Date Information**: Projects with complete date information vs. those without

## Features

### Advanced Filtering
Filter projects by:
- **Status**: Ongoing (pågående), Ended (avsluttet), or Unknown
- **English Availability**: Has English page or Norwegian-only
- **Research Groups**: Has research group connections or none
- **Text Search**: Search projects by name

The dashboard dynamically updates charts and statistics based on your filters.

### Interactive Dashboard
- **Summary Statistics**: Real-time cards showing key metrics for filtered results
- **Dynamic Charts**: Charts that update based on active filters
- **Sortable Table**: Click column headers to sort projects
- **Results Counter**: Shows how many projects match your filters
- **Direct Links**: Quick access to Norwegian and English project pages

### Data Management
- **Excel-Based**: Uses Excel file (`cicero_projects.xlsx`) for easy data updates
- **Multiple Sheets**:
  - All Projects
  - No English
  - No Research Groups
  - Ongoing
  - Ended
  - Summary statistics

## Access the Dashboard

Open `cicero-projects.html` in a web browser to view the interactive dashboard.

## Data Source

The dashboard reads from `data/cicero_projects.xlsx`, which contains:
- **140 total projects** from CICERO
- **59 projects** with English translations
- **81 projects** Norwegian-only
- **41 projects** without research group connections

The Excel file is generated from:
- `cicero_projects_cleaned.json` - Norwegian projects
- `cicero_projects_en_latest.json` - English projects

### Updating the Data

To update the Excel file with new data:
1. Update the JSON files in the `data/` folder
2. Run `python3 convert_to_excel.py`
3. Refresh the dashboard in your browser

## Key Findings

The dashboard helps identify:
1. 59 of 140 projects (42%) have English translations
2. 81 projects need English pages
3. 41 projects lack research group connections
4. Distribution of ongoing vs. ended projects
5. Data completeness and quality issues

## How to Use

1. **Open the Dashboard**: Load `cicero-projects.html` in any modern web browser
2. **Apply Filters**: Use the filter section to narrow down projects
3. **Explore Charts**: Visual representations update automatically
4. **Browse Table**: Scroll through filtered results with sortable columns
5. **Visit Projects**: Click NO/EN links to view original project pages

## Example Use Cases

### Find projects without English pages
1. Set "English Availability" filter to "No English"
2. Click "Apply Filters"
3. View the filtered list in the table below

### Find ongoing projects without research groups
1. Set "Status" to "Ongoing (pågående)"
2. Set "Research Groups" to "No Research Groups"
3. Click "Apply Filters"

### Search for specific projects
1. Type keywords in the "Search Name" field
2. Click "Apply Filters"
3. Results update immediately

## Technical Details

- **Technologies**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**:
  - Chart.js (visualizations)
  - SheetJS/xlsx (Excel file reading)
- **No Backend Required**: Runs entirely in the browser
- **Responsive Design**: Works on desktop and mobile devices

## Project Data Structure

Each project includes:
- Project Name
- Norwegian and English URLs
- Start and End Dates
- Current Status
- Funding Source
- Topic Areas
- Involved Researchers
- Related Research Groups
- External Website Links

---

**Data Source**: CICERO - Center for International Climate Research
**Last Updated**: January 2026
**Total Projects**: 140
