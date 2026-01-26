// HIWAI Research Project - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initActiveNavLink();
    initAnimations();
    loadDynamicContent();
});

// Mobile Navigation Toggle
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Set active navigation link based on current page
function initActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .feature-item, .team-card, .org-card, .news-item');
    animateElements.forEach(el => observer.observe(el));
}

// Load dynamic content from JSON files
async function loadDynamicContent() {
    const page = window.location.pathname.split('/').pop() || 'index.html';

    try {
        // Load site-wide content
        await loadSiteContent();

        // Load page-specific content
        switch (page) {
            case 'index.html':
            case '':
                await loadHomeContent();
                break;
            case 'news.html':
                await loadNewsContent();
                break;
            case 'team.html':
                await loadTeamContent();
                break;
            case 'about.html':
                await loadAboutContent();
                break;
        }
    } catch (error) {
        console.log('Using static content:', error.message);
    }
}

// Load site-wide content
async function loadSiteContent() {
    try {
        const response = await fetch('content/site.json');
        if (!response.ok) return;

        const data = await response.json();

        // Update footer content if needed
        if (data.footer) {
            const footerBrand = document.querySelector('.footer-brand p');
            if (footerBrand && data.footer.description) {
                footerBrand.textContent = data.footer.description;
            }
        }
    } catch (error) {
        // Silently fail - use static content
    }
}

// Load home page content
async function loadHomeContent() {
    try {
        const response = await fetch('content/home.json');
        if (!response.ok) return;

        const data = await response.json();

        // Update hero section
        if (data.hero) {
            const heroTitle = document.querySelector('.hero h1');
            const heroText = document.querySelector('.hero p');
            if (heroTitle && data.hero.title) heroTitle.textContent = data.hero.title;
            if (heroText && data.hero.subtitle) heroText.textContent = data.hero.subtitle;
        }

        // Update features
        if (data.features && data.features.length > 0) {
            const featuresGrid = document.querySelector('.features-grid');
            if (featuresGrid) {
                featuresGrid.innerHTML = data.features.map(feature => `
                    <div class="feature-item">
                        <div class="feature-icon">${feature.icon || '🔬'}</div>
                        <h3>${feature.title}</h3>
                        <p>${feature.description}</p>
                    </div>
                `).join('');
            }
        }
    } catch (error) {
        // Silently fail - use static content
    }
}

// Load news content
async function loadNewsContent() {
    try {
        const response = await fetch('content/news.json');
        if (!response.ok) return;

        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            const newsList = document.querySelector('.news-list');
            if (newsList) {
                newsList.innerHTML = data.articles.map(article => `
                    <article class="news-item">
                        <div class="news-image" style="${article.image ? `background-image: url('${article.image}')` : ''}"></div>
                        <div class="news-content">
                            <span class="news-date">${formatDate(article.date)}</span>
                            <h3>${article.title}</h3>
                            <p>${article.excerpt}</p>
                            <div class="news-tags">
                                ${(article.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            ${article.link ? `<a href="${article.link}" class="btn btn-accent mt-1">Read More</a>` : ''}
                        </div>
                    </article>
                `).join('');
            }
        }
    } catch (error) {
        // Silently fail - use static content
    }
}

// Load team content
async function loadTeamContent() {
    try {
        const response = await fetch('content/team.json');
        if (!response.ok) return;

        const data = await response.json();

        // Update team members
        if (data.members && data.members.length > 0) {
            const teamGrid = document.querySelector('.team-grid');
            if (teamGrid) {
                teamGrid.innerHTML = data.members.map(member => `
                    <div class="team-card">
                        <div class="team-photo" style="${member.photo ? `background-image: url('${member.photo}')` : ''}"></div>
                        <div class="team-info">
                            <h3>${member.name}</h3>
                            <p class="team-role">${member.role}</p>
                            <p class="team-org">${member.organization || ''}</p>
                            <p class="team-bio">${member.bio || ''}</p>
                            <div class="team-social">
                                ${member.email ? `<a href="mailto:${member.email}" title="Email">@</a>` : ''}
                                ${member.website ? `<a href="${member.website}" target="_blank" title="Website">🌐</a>` : ''}
                                ${member.orcid ? `<a href="https://orcid.org/${member.orcid}" target="_blank" title="ORCID">ID</a>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Update organizations
        if (data.organizations && data.organizations.length > 0) {
            const orgGrid = document.querySelector('.organizations-grid');
            if (orgGrid) {
                orgGrid.innerHTML = data.organizations.map(org => `
                    <div class="org-card">
                        <div class="org-logo" style="${org.logo ? `background-image: url('${org.logo}')` : ''}">${!org.logo ? org.name.substring(0, 2).toUpperCase() : ''}</div>
                        <div class="org-info">
                            <h3>${org.name}</h3>
                            <p>${org.description || ''}</p>
                            ${org.website ? `<a href="${org.website}" target="_blank" class="org-link">Visit Website →</a>` : ''}
                        </div>
                    </div>
                `).join('');
            }
        }
    } catch (error) {
        // Silently fail - use static content
    }
}

// Load about content
async function loadAboutContent() {
    try {
        const response = await fetch('content/about.json');
        if (!response.ok) return;

        const data = await response.json();

        if (data.sections) {
            data.sections.forEach((section, index) => {
                const textEl = document.querySelector(`.about-section-${index + 1} .about-text`);
                if (textEl && section.content) {
                    textEl.innerHTML = `<h2>${section.title}</h2>${section.content.map(p => `<p>${p}</p>`).join('')}`;
                }
            });
        }

        // Update stats
        if (data.stats && data.stats.length > 0) {
            const statsGrid = document.querySelector('.stats-grid');
            if (statsGrid) {
                statsGrid.innerHTML = data.stats.map(stat => `
                    <div class="stat-item">
                        <h3>${stat.value}</h3>
                        <p>${stat.label}</p>
                    </div>
                `).join('');
            }
        }
    } catch (error) {
        // Silently fail - use static content
    }
}

// Utility: Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Utility: Sanitize HTML to prevent XSS
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}
