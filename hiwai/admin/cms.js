// HIWAI CMS - Content Management System

// Data storage
let cmsData = {
    home: null,
    about: null,
    news: null,
    team: null,
    site: null
};

// Initialize CMS
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    loadAllContent();
    initForms();
});

// Navigation between sections
function initNavigation() {
    const navLinks = document.querySelectorAll('.cms-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;

            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding section
            document.querySelectorAll('.cms-section').forEach(s => s.classList.remove('active'));
            document.getElementById(`section-${section}`).classList.add('active');
        });
    });
}

// Load all content from JSON files
async function loadAllContent() {
    try {
        const [home, about, news, team, site] = await Promise.all([
            fetchJSON('../content/home.json'),
            fetchJSON('../content/about.json'),
            fetchJSON('../content/news.json'),
            fetchJSON('../content/team.json'),
            fetchJSON('../content/site.json')
        ]);

        cmsData.home = home;
        cmsData.about = about;
        cmsData.news = news;
        cmsData.team = team;
        cmsData.site = site;

        populateForms();
        showToast('Content loaded successfully', 'success');
    } catch (error) {
        console.error('Error loading content:', error);
        showToast('Error loading content. Using defaults.', 'error');
        initializeDefaults();
    }
}

async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    return response.json();
}

function initializeDefaults() {
    cmsData.home = { hero: { title: '', subtitle: '' }, features: [] };
    cmsData.about = { intro: { title: '', content: '' }, stats: [], objectives: [] };
    cmsData.news = { articles: [] };
    cmsData.team = { members: [], organizations: [] };
    cmsData.site = { siteName: '', siteTitle: '', siteDescription: '', footer: { description: '' }, contact: { email: '', address: '' }, social: {} };
    populateForms();
}

// Populate forms with loaded data
function populateForms() {
    populateHomeForm();
    populateAboutForm();
    populateNewsForm();
    populateTeamForm();
    populateOrganizationsForm();
    populateSiteForm();
}

function populateHomeForm() {
    if (!cmsData.home) return;

    document.getElementById('hero-title').value = cmsData.home.hero?.title || '';
    document.getElementById('hero-subtitle').value = cmsData.home.hero?.subtitle || '';

    const featuresList = document.getElementById('features-list');
    featuresList.innerHTML = '';
    (cmsData.home.features || []).forEach((feature, index) => {
        featuresList.appendChild(createFeatureItem(feature, index));
    });
}

function populateAboutForm() {
    if (!cmsData.about) return;

    document.getElementById('about-intro-title').value = cmsData.about.intro?.title || '';
    document.getElementById('about-intro-content').value = cmsData.about.intro?.content || '';

    const statsList = document.getElementById('stats-list');
    statsList.innerHTML = '';
    (cmsData.about.stats || []).forEach((stat, index) => {
        statsList.appendChild(createStatItem(stat, index));
    });

    const objectivesList = document.getElementById('objectives-list');
    objectivesList.innerHTML = '';
    (cmsData.about.objectives || []).forEach((objective, index) => {
        objectivesList.appendChild(createObjectiveItem(objective, index));
    });
}

function populateNewsForm() {
    if (!cmsData.news) return;

    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';
    (cmsData.news.articles || []).forEach((article, index) => {
        newsList.appendChild(createNewsItem(article, index));
    });
}

function populateTeamForm() {
    if (!cmsData.team) return;

    const teamList = document.getElementById('team-list');
    teamList.innerHTML = '';
    (cmsData.team.members || []).forEach((member, index) => {
        teamList.appendChild(createTeamMemberItem(member, index));
    });
}

function populateOrganizationsForm() {
    if (!cmsData.team) return;

    const orgList = document.getElementById('organizations-list');
    orgList.innerHTML = '';
    (cmsData.team.organizations || []).forEach((org, index) => {
        orgList.appendChild(createOrganizationItem(org, index));
    });
}

function populateSiteForm() {
    if (!cmsData.site) return;

    document.getElementById('site-name').value = cmsData.site.siteName || '';
    document.getElementById('site-title').value = cmsData.site.siteTitle || '';
    document.getElementById('site-description').value = cmsData.site.siteDescription || '';
    document.getElementById('footer-description').value = cmsData.site.footer?.description || '';
    document.getElementById('contact-email').value = cmsData.site.contact?.email || '';
    document.getElementById('contact-address').value = cmsData.site.contact?.address || '';
    document.getElementById('social-twitter').value = cmsData.site.social?.twitter || '';
    document.getElementById('social-linkedin').value = cmsData.site.social?.linkedin || '';
    document.getElementById('social-github').value = cmsData.site.social?.github || '';
}

// Create repeater item elements
function createFeatureItem(feature, index) {
    const div = document.createElement('div');
    div.className = 'repeater-item';
    div.innerHTML = `
        <div class="repeater-header">
            <h4>Feature ${index + 1}</h4>
            <div class="repeater-actions">
                <button type="button" class="btn-remove" onclick="removeFeature(${index})">Remove</button>
            </div>
        </div>
        <div class="form-group">
            <label>Icon (emoji or text)</label>
            <input type="text" name="features[${index}].icon" value="${escapeHtml(feature.icon || '')}">
        </div>
        <div class="form-group">
            <label>Title</label>
            <input type="text" name="features[${index}].title" value="${escapeHtml(feature.title || '')}">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea name="features[${index}].description" rows="2">${escapeHtml(feature.description || '')}</textarea>
        </div>
    `;
    return div;
}

function createStatItem(stat, index) {
    const div = document.createElement('div');
    div.className = 'repeater-item';
    div.innerHTML = `
        <div class="repeater-header">
            <h4>Stat ${index + 1}</h4>
            <div class="repeater-actions">
                <button type="button" class="btn-remove" onclick="removeStat(${index})">Remove</button>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Value</label>
                <input type="text" name="stats[${index}].value" value="${escapeHtml(stat.value || '')}">
            </div>
            <div class="form-group">
                <label>Label</label>
                <input type="text" name="stats[${index}].label" value="${escapeHtml(stat.label || '')}">
            </div>
        </div>
    `;
    return div;
}

function createObjectiveItem(objective, index) {
    const div = document.createElement('div');
    div.className = 'repeater-item';
    div.innerHTML = `
        <div class="repeater-header">
            <h4>Objective ${index + 1}</h4>
            <div class="repeater-actions">
                <button type="button" class="btn-remove" onclick="removeObjective(${index})">Remove</button>
            </div>
        </div>
        <div class="form-group">
            <label>Objective Text</label>
            <input type="text" name="objectives[${index}]" value="${escapeHtml(objective || '')}">
        </div>
    `;
    return div;
}

function createNewsItem(article, index) {
    const div = document.createElement('div');
    div.className = 'repeater-item';
    div.innerHTML = `
        <div class="repeater-header">
            <h4>Article: ${escapeHtml(article.title || 'New Article')}</h4>
            <div class="repeater-actions">
                <button type="button" class="btn-remove" onclick="removeNewsArticle(${index})">Remove</button>
            </div>
        </div>
        <div class="form-group">
            <label>Title</label>
            <input type="text" name="articles[${index}].title" value="${escapeHtml(article.title || '')}">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Date</label>
                <input type="date" name="articles[${index}].date" value="${article.date || ''}">
            </div>
            <div class="form-group">
                <label>Author</label>
                <input type="text" name="articles[${index}].author" value="${escapeHtml(article.author || '')}">
            </div>
        </div>
        <div class="form-group">
            <label>Excerpt</label>
            <textarea name="articles[${index}].excerpt" rows="2">${escapeHtml(article.excerpt || '')}</textarea>
        </div>
        <div class="form-group">
            <label>Full Content</label>
            <textarea name="articles[${index}].content" rows="4">${escapeHtml(article.content || '')}</textarea>
        </div>
        <div class="form-group">
            <label>Image URL (optional)</label>
            <input type="text" name="articles[${index}].image" value="${escapeHtml(article.image || '')}">
        </div>
        <div class="form-group">
            <label>Tags (comma-separated)</label>
            <input type="text" name="articles[${index}].tags" value="${(article.tags || []).join(', ')}">
        </div>
        <div class="form-group">
            <label>Link URL (optional)</label>
            <input type="text" name="articles[${index}].link" value="${escapeHtml(article.link || '')}">
        </div>
    `;
    return div;
}

function createTeamMemberItem(member, index) {
    const div = document.createElement('div');
    div.className = 'repeater-item';
    div.innerHTML = `
        <div class="repeater-header">
            <h4>${escapeHtml(member.name || 'New Member')}</h4>
            <div class="repeater-actions">
                <button type="button" class="btn-remove" onclick="removeTeamMember(${index})">Remove</button>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="members[${index}].name" value="${escapeHtml(member.name || '')}">
            </div>
            <div class="form-group">
                <label>Role</label>
                <input type="text" name="members[${index}].role" value="${escapeHtml(member.role || '')}">
            </div>
        </div>
        <div class="form-group">
            <label>Organization</label>
            <input type="text" name="members[${index}].organization" value="${escapeHtml(member.organization || '')}">
        </div>
        <div class="form-group">
            <label>Bio</label>
            <textarea name="members[${index}].bio" rows="2">${escapeHtml(member.bio || '')}</textarea>
        </div>
        <div class="form-group">
            <label>Photo URL (optional)</label>
            <input type="text" name="members[${index}].photo" value="${escapeHtml(member.photo || '')}">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="members[${index}].email" value="${escapeHtml(member.email || '')}">
            </div>
            <div class="form-group">
                <label>ORCID</label>
                <input type="text" name="members[${index}].orcid" value="${escapeHtml(member.orcid || '')}">
            </div>
        </div>
        <div class="form-group">
            <label>Website URL (optional)</label>
            <input type="text" name="members[${index}].website" value="${escapeHtml(member.website || '')}">
        </div>
    `;
    return div;
}

function createOrganizationItem(org, index) {
    const div = document.createElement('div');
    div.className = 'repeater-item';
    div.innerHTML = `
        <div class="repeater-header">
            <h4>${escapeHtml(org.name || 'New Organization')}</h4>
            <div class="repeater-actions">
                <button type="button" class="btn-remove" onclick="removeOrganization(${index})">Remove</button>
            </div>
        </div>
        <div class="form-group">
            <label>Organization Name</label>
            <input type="text" name="organizations[${index}].name" value="${escapeHtml(org.name || '')}">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea name="organizations[${index}].description" rows="2">${escapeHtml(org.description || '')}</textarea>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Logo URL (optional)</label>
                <input type="text" name="organizations[${index}].logo" value="${escapeHtml(org.logo || '')}">
            </div>
            <div class="form-group">
                <label>Country</label>
                <input type="text" name="organizations[${index}].country" value="${escapeHtml(org.country || '')}">
            </div>
        </div>
        <div class="form-group">
            <label>Website URL</label>
            <input type="text" name="organizations[${index}].website" value="${escapeHtml(org.website || '')}">
        </div>
    `;
    return div;
}

// Add new items
function addFeature() {
    if (!cmsData.home.features) cmsData.home.features = [];
    cmsData.home.features.push({ icon: '', title: '', description: '' });
    const featuresList = document.getElementById('features-list');
    featuresList.appendChild(createFeatureItem({}, cmsData.home.features.length - 1));
}

function addStat() {
    if (!cmsData.about.stats) cmsData.about.stats = [];
    cmsData.about.stats.push({ value: '', label: '' });
    const statsList = document.getElementById('stats-list');
    statsList.appendChild(createStatItem({}, cmsData.about.stats.length - 1));
}

function addObjective() {
    if (!cmsData.about.objectives) cmsData.about.objectives = [];
    cmsData.about.objectives.push('');
    const objectivesList = document.getElementById('objectives-list');
    objectivesList.appendChild(createObjectiveItem('', cmsData.about.objectives.length - 1));
}

function addNewsArticle() {
    if (!cmsData.news.articles) cmsData.news.articles = [];
    const newArticle = {
        id: String(Date.now()),
        title: '',
        date: new Date().toISOString().split('T')[0],
        excerpt: '',
        content: '',
        image: '',
        tags: [],
        author: 'HIWAI Team',
        link: ''
    };
    cmsData.news.articles.unshift(newArticle);
    populateNewsForm();
}

function addTeamMember() {
    if (!cmsData.team.members) cmsData.team.members = [];
    cmsData.team.members.push({
        id: String(Date.now()),
        name: '',
        role: '',
        organization: '',
        bio: '',
        photo: '',
        email: '',
        website: '',
        orcid: ''
    });
    populateTeamForm();
}

function addOrganization() {
    if (!cmsData.team.organizations) cmsData.team.organizations = [];
    cmsData.team.organizations.push({
        id: String(Date.now()),
        name: '',
        description: '',
        logo: '',
        website: '',
        country: ''
    });
    populateOrganizationsForm();
}

// Remove items
function removeFeature(index) {
    cmsData.home.features.splice(index, 1);
    populateHomeForm();
}

function removeStat(index) {
    cmsData.about.stats.splice(index, 1);
    populateAboutForm();
}

function removeObjective(index) {
    cmsData.about.objectives.splice(index, 1);
    populateAboutForm();
}

function removeNewsArticle(index) {
    cmsData.news.articles.splice(index, 1);
    populateNewsForm();
}

function removeTeamMember(index) {
    cmsData.team.members.splice(index, 1);
    populateTeamForm();
}

function removeOrganization(index) {
    cmsData.team.organizations.splice(index, 1);
    populateOrganizationsForm();
}

// Initialize form submission handlers
function initForms() {
    document.getElementById('form-home').addEventListener('submit', function(e) {
        e.preventDefault();
        saveHomeContent();
    });

    document.getElementById('form-about').addEventListener('submit', function(e) {
        e.preventDefault();
        saveAboutContent();
    });

    document.getElementById('form-news').addEventListener('submit', function(e) {
        e.preventDefault();
        saveNewsContent();
    });

    document.getElementById('form-team').addEventListener('submit', function(e) {
        e.preventDefault();
        saveTeamContent();
    });

    document.getElementById('form-organizations').addEventListener('submit', function(e) {
        e.preventDefault();
        saveTeamContent();
    });

    document.getElementById('form-site').addEventListener('submit', function(e) {
        e.preventDefault();
        saveSiteContent();
    });
}

// Save content functions
function saveHomeContent() {
    const form = document.getElementById('form-home');
    cmsData.home.hero = {
        title: form.querySelector('[name="hero.title"]').value,
        subtitle: form.querySelector('[name="hero.subtitle"]').value
    };

    cmsData.home.features = [];
    const featureItems = document.querySelectorAll('#features-list .repeater-item');
    featureItems.forEach((item, index) => {
        cmsData.home.features.push({
            icon: item.querySelector(`[name="features[${index}].icon"]`).value,
            title: item.querySelector(`[name="features[${index}].title"]`).value,
            description: item.querySelector(`[name="features[${index}].description"]`).value
        });
    });

    showToast('Home content saved!', 'success');
}

function saveAboutContent() {
    const form = document.getElementById('form-about');
    cmsData.about.intro = {
        title: form.querySelector('[name="intro.title"]').value,
        content: form.querySelector('[name="intro.content"]').value
    };

    cmsData.about.stats = [];
    const statItems = document.querySelectorAll('#stats-list .repeater-item');
    statItems.forEach((item, index) => {
        cmsData.about.stats.push({
            value: item.querySelector(`[name="stats[${index}].value"]`).value,
            label: item.querySelector(`[name="stats[${index}].label"]`).value
        });
    });

    cmsData.about.objectives = [];
    const objectiveItems = document.querySelectorAll('#objectives-list .repeater-item');
    objectiveItems.forEach((item, index) => {
        cmsData.about.objectives.push(item.querySelector(`[name="objectives[${index}]"]`).value);
    });

    showToast('About content saved!', 'success');
}

function saveNewsContent() {
    cmsData.news.articles = [];
    const newsItems = document.querySelectorAll('#news-list .repeater-item');
    newsItems.forEach((item, index) => {
        const tagsInput = item.querySelector(`[name="articles[${index}].tags"]`).value;
        cmsData.news.articles.push({
            id: String(index + 1),
            title: item.querySelector(`[name="articles[${index}].title"]`).value,
            date: item.querySelector(`[name="articles[${index}].date"]`).value,
            author: item.querySelector(`[name="articles[${index}].author"]`).value,
            excerpt: item.querySelector(`[name="articles[${index}].excerpt"]`).value,
            content: item.querySelector(`[name="articles[${index}].content"]`).value,
            image: item.querySelector(`[name="articles[${index}].image"]`).value,
            tags: tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [],
            link: item.querySelector(`[name="articles[${index}].link"]`).value
        });
    });

    showToast('News content saved!', 'success');
}

function saveTeamContent() {
    // Save members
    cmsData.team.members = [];
    const memberItems = document.querySelectorAll('#team-list .repeater-item');
    memberItems.forEach((item, index) => {
        cmsData.team.members.push({
            id: String(index + 1),
            name: item.querySelector(`[name="members[${index}].name"]`).value,
            role: item.querySelector(`[name="members[${index}].role"]`).value,
            organization: item.querySelector(`[name="members[${index}].organization"]`).value,
            bio: item.querySelector(`[name="members[${index}].bio"]`).value,
            photo: item.querySelector(`[name="members[${index}].photo"]`).value,
            email: item.querySelector(`[name="members[${index}].email"]`).value,
            website: item.querySelector(`[name="members[${index}].website"]`).value,
            orcid: item.querySelector(`[name="members[${index}].orcid"]`).value
        });
    });

    // Save organizations
    cmsData.team.organizations = [];
    const orgItems = document.querySelectorAll('#organizations-list .repeater-item');
    orgItems.forEach((item, index) => {
        cmsData.team.organizations.push({
            id: String(index + 1),
            name: item.querySelector(`[name="organizations[${index}].name"]`).value,
            description: item.querySelector(`[name="organizations[${index}].description"]`).value,
            logo: item.querySelector(`[name="organizations[${index}].logo"]`).value,
            website: item.querySelector(`[name="organizations[${index}].website"]`).value,
            country: item.querySelector(`[name="organizations[${index}].country"]`).value
        });
    });

    showToast('Team content saved!', 'success');
}

function saveSiteContent() {
    const form = document.getElementById('form-site');
    cmsData.site = {
        siteName: form.querySelector('[name="siteName"]').value,
        siteTitle: form.querySelector('[name="siteTitle"]').value,
        siteDescription: form.querySelector('[name="siteDescription"]').value,
        footer: {
            description: form.querySelector('[name="footer.description"]').value
        },
        contact: {
            email: form.querySelector('[name="contact.email"]').value,
            address: form.querySelector('[name="contact.address"]').value
        },
        social: {
            twitter: form.querySelector('[name="social.twitter"]').value,
            linkedin: form.querySelector('[name="social.linkedin"]').value,
            github: form.querySelector('[name="social.github"]').value
        }
    };

    showToast('Site settings saved!', 'success');
}

// Download JSON files
function downloadJSON(type) {
    let data, filename;

    switch(type) {
        case 'home':
            saveHomeContent();
            data = cmsData.home;
            filename = 'home.json';
            break;
        case 'about':
            saveAboutContent();
            data = cmsData.about;
            filename = 'about.json';
            break;
        case 'news':
            saveNewsContent();
            data = cmsData.news;
            filename = 'news.json';
            break;
        case 'team':
            saveTeamContent();
            data = cmsData.team;
            filename = 'team.json';
            break;
        case 'site':
            saveSiteContent();
            data = cmsData.site;
            filename = 'site.json';
            break;
    }

    const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Downloaded ${filename}`, 'success');
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
