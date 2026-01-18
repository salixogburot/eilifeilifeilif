#!/usr/bin/env python3
"""Convert CICERO projects JSON data to Excel format."""

import json
import pandas as pd
from pathlib import Path

def main():
    # Load JSON files
    with open('data/cicero_projects_cleaned.json', 'r', encoding='utf-8') as f:
        norwegian_data = json.load(f)

    with open('data/cicero_projects_en_latest.json', 'r', encoding='utf-8') as f:
        english_data = json.load(f)

    # Create a map of English project slugs and URLs
    # Extract project slug from URL (last part after final /)
    english_projects = {}
    english_slugs_list = []
    for p in english_data['projects']:
        slug = p['url'].split('/')[-1]
        english_projects[slug] = p['url']
        english_slugs_list.append((slug, p['url']))

    # Also try to match by converting Norwegian slug or project name
    english_names = {p['name'].lower(): p['url'] for p in english_data['projects']}

    # Process projects into flat structure for Excel
    projects_list = []

    for project in norwegian_data['projects']:
        # Check if English version exists by matching slug or name
        norwegian_slug = project['url'].split('/')[-1]
        has_english = False
        english_url = ''

        # Try to match by exact slug
        if norwegian_slug in english_projects:
            has_english = True
            english_url = english_projects[norwegian_slug]
        # Try to match by name
        elif project['name'].lower() in english_names:
            has_english = True
            english_url = english_names[project['name'].lower()]
        # Try partial slug matching (English slug is prefix of Norwegian slug)
        else:
            for en_slug, en_url in english_slugs_list:
                # Check if English slug is at the start of Norwegian slug
                if norwegian_slug.startswith(en_slug + '-') or norwegian_slug == en_slug:
                    has_english = True
                    english_url = en_url
                    break

        # Extract research groups
        research_groups = ', '.join([g['name'] for g in project.get('related_research_groups', [])])
        has_research_groups = len(project.get('related_research_groups', [])) > 0

        # Extract topic areas
        topic_areas = ', '.join([t['name'] for t in project.get('topic_areas', [])])

        # Extract researchers
        researchers = ', '.join([r['name'] for r in project.get('involved_researchers', [])])
        num_researchers = len(project.get('involved_researchers', []))

        projects_list.append({
            'Project Name': project['name'],
            'Norwegian URL': project['url'],
            'English URL': english_url,
            'Has English': 'Yes' if has_english else 'No',
            'Start Date': project.get('start_date', ''),
            'End Date': project.get('end_date', ''),
            'Date Raw': project.get('date_raw', ''),
            'Status': project.get('status', ''),
            'Funding': project.get('funding', ''),
            'Topic Areas': topic_areas,
            'Research Groups': research_groups,
            'Has Research Groups': 'Yes' if has_research_groups else 'No',
            'Researchers': researchers,
            'Number of Researchers': num_researchers,
            'External Website': project.get('external_website', '')
        })

    # Create DataFrame
    df = pd.DataFrame(projects_list)

    # Create Excel writer object
    output_file = 'data/cicero_projects_overview_v5.xlsx'
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        # Write all projects
        df.to_excel(writer, sheet_name='All Projects', index=False)

        # Write projects without English
        df_no_english = df[df['Has English'] == 'No']
        df_no_english.to_excel(writer, sheet_name='No English', index=False)

        # Write projects without research groups
        df_no_groups = df[df['Has Research Groups'] == 'No']
        df_no_groups.to_excel(writer, sheet_name='No Research Groups', index=False)

        # Write ongoing projects
        df_ongoing = df[df['Status'].isin(['pågående', 'ongoing'])]
        df_ongoing.to_excel(writer, sheet_name='Ongoing', index=False)

        # Write ended projects
        df_ended = df[df['Status'].isin(['avsluttet', 'ended'])]
        df_ended.to_excel(writer, sheet_name='Ended', index=False)

        # Create summary sheet
        summary_data = {
            'Metric': [
                'Total Projects',
                'Projects with English',
                'Projects without English',
                'Projects with Research Groups',
                'Projects without Research Groups',
                'Ongoing Projects',
                'Ended Projects',
                'Projects with Unknown Status',
                'Projects with Complete Dates',
                'Projects without Complete Dates'
            ],
            'Count': [
                len(df),
                len(df[df['Has English'] == 'Yes']),
                len(df[df['Has English'] == 'No']),
                len(df[df['Has Research Groups'] == 'Yes']),
                len(df[df['Has Research Groups'] == 'No']),
                len(df_ongoing),
                len(df_ended),
                len(df[~df['Status'].isin(['pågående', 'ongoing', 'avsluttet', 'ended'])]),
                len(df[(df['Start Date'] != '') & (df['End Date'] != '')]),
                len(df[(df['Start Date'] == '') | (df['End Date'] == '')])
            ]
        }
        df_summary = pd.DataFrame(summary_data)
        df_summary.to_excel(writer, sheet_name='Summary', index=False)

    print(f"Excel file created: {output_file}")
    print(f"Total projects: {len(df)}")
    print(f"Projects with English: {len(df[df['Has English'] == 'Yes'])}")
    print(f"Projects without English: {len(df[df['Has English'] == 'No'])}")
    print(f"Projects without Research Groups: {len(df_no_groups)}")

if __name__ == '__main__':
    main()
