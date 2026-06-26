import user_image from './user-image.webp';
import code_icon from './code-icon.svg';
import code_icon_dark from './code-icon-dark.svg';
import edu_icon from './edu-icon.svg';
import edu_icon_dark from './edu-icon-dark.svg';
import project_icon from './project-icon.svg';
import project_icon_dark from './project-icon-dark.svg';
import right_arrow_white from './right-arrow-white.svg';
import mail_icon from './mail_icon.svg';
import profile_img from './profile-img.webp';
import web_icon from './code-icon.svg';
import mobile_icon from './project-icon.svg';
import ui_icon from './project-icon.svg';
import graphics_icon from './code-icon.svg';

export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    right_arrow_white,
    mail_icon,
    profile_img,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
};

// Each tool: { name } shown on hover, { src } is the logo.
export const toolsData = [
    // Existing
    { name: 'VS Code', src: 'https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg' },
    { name: 'Firebase', src: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg' },
    { name: 'MongoDB', src: 'https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg' },
    { name: 'Figma', src: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg' },
    { name: 'Git', src: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg' },
    { name: 'Google Analytics', src: 'https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg' },
    { name: 'Cloudflare', src: 'https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg' },
    // Added (local logos in public/tool-logos)
    { name: 'HTML5', src: '/tool-logos/html5.svg' },
    { name: 'CSS3', src: '/tool-logos/css3.svg' },
    { name: 'React.js', src: '/tool-logos/react.svg' },
    { name: 'Python', src: '/tool-logos/python.svg' },
    { name: 'Node.js', src: '/tool-logos/nodejs.svg' },
    { name: 'WordPress', src: '/tool-logos/wordpress.svg' },
    { name: 'Shopify', src: '/tool-logos/shopify.svg' },
    { name: 'Webflow', src: '/tool-logos/webflow.svg' },
    { name: 'Google Search Console', src: '/tool-logos/google-search-console.svg' },
    { name: 'Ahrefs', src: '/tool-logos/ahrefs.svg' },
    { name: 'Semrush', src: '/tool-logos/semrush.svg' },
];
