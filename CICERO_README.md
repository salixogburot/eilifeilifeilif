# CICERO Projects Data Visualization

An interactive data visualization dashboard for analyzing CICERO research projects.

## Overview

This visualization provides insights into CICERO (Center for International Climate Research) project data, analyzing:

- **Language Availability**: Which projects have English web pages vs. Norwegian-only
- **Project Status**: Distribution of ongoing, ended, and unknown status projects
- **Research Group Connections**: Projects with and without research group affiliations
- **Date Information**: Projects with complete date information vs. those without

## Access the Dashboard

Open `cicero-projects.html` in a web browser to view the interactive dashboard.

## Features

### Summary Statistics
Quick overview cards showing:
- Total number of projects (140)
- Projects with English pages
- Projects without English pages
- Ongoing projects
- Ended projects
- Projects without research group connections

### Visual Charts
1. **Language Availability** - Doughnut chart showing English page coverage
2. **Project Status** - Pie chart of project statuses
3. **Research Group Connections** - Bar chart comparing projects with/without groups
4. **Date Information** - Chart showing data completeness

### Detailed Tables
- **Projects Without English Pages** - Complete list with status and research group info
- **Projects Without Research Groups** - Projects lacking group affiliations

## Data Sources

The visualization uses two JSON datasets:
- `data/cicero_projects_cleaned.json` - 140 Norwegian projects
- `data/cicero_projects_en_latest.json` - 87 English projects

## Key Findings

The dashboard helps identify:
1. Which of the 140 Norwegian projects have English translations
2. Projects that may need English pages added
3. Projects that lack research group connections
4. Distribution of ongoing vs. ended projects
5. Data quality and completeness

## Technical Details

- Pure HTML/CSS/JavaScript
- Uses Chart.js for visualizations
- No server required - runs entirely in browser
- Responsive design for desktop and mobile

## Project Data Structure

Each project includes:
- Project name and URL
- Start and end dates
- Current status (ongoing/ended)
- Funding source
- Topic areas
- Involved researchers
- Related research groups
- External website links

---

Data source: CICERO - Center for International Climate Research
