# Luciano Clementi Portfolio

This is my personal portfolio website built to showcase my design and development work.

## Subject

The site is built with HTML, Sass, JavaScript, and PHP.
It includes a hero section, an about section, a projects section with dynamic content, a testimonials section, an admin section, and a contact page.
The layout uses a custom grid system and is fully responsive on desktop, tablet, and mobile.
The site features custom JavaScript such as a video player, project detail toggles, looping image and video carousels, GSAP scroll animations, and ScrollTrigger effects.
Model Viewer is used on one project to display an interactive 3D model.
All JavaScript is written as modules and follows best practices covered in class.
The contact form is handled with PHP and AJAX. It validates the input, stores the data in a MySQL database using PDO, and returns a message to the user after the form is submitted.
The projects section loads content dynamically from the database instead of being hard-coded.

## CMS

The site includes a custom admin panel.
The CMS allows new projects to be created, existing projects to be updated, and projects to be deleted.
All database queries use PDO with prepared statements.
Project data is stored in MySQL and retrieved dynamically.

## Usage

Begin with index.html.
Scroll through each section to see the GSAP animations.
Project cards include carousels and expandable project details.
Project content is loaded from the database.
The video player in the hero section uses custom controls.
The contact page contains a working AJAX-enabled form processed through PHP.
The admin section allows login access to manage portfolio content.

## Hosting

The site is deployed to a live hosting environment and connected to a registered domain.
Environment variables are managed securely for database configuration.

## Credits

Luciano Clementi

## License

MIT
