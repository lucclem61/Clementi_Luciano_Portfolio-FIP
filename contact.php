<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <title>Contact — Luciano Clementi</title>
    <link href="css/grid.css" rel="stylesheet" />
    <link href="css/main.css" rel="stylesheet" />
  </head>
  <body>
    <p class="hidden">Contact — Luciano Clementi</p>

    <header id="main-header" class="grid-con">
      <div class="header-bar col-span-full">
        <div class="header-brand">
          <img class="brand-logo" src="images/Logo-1.svg" alt="Luciano Clementi logo" />
          <span class="brand-name">Luciano Clementi</span>
        </div>

        <button class="nav-toggle" aria-label="Toggle navigation">
          <span class="nav-toggle-line"></span>
          <span class="nav-toggle-line"></span>
          <span class="nav-toggle-line"></span>
        </button>

        <nav id="main-nav" aria-label="Main navigation">
          <ul>
            <li><a href="index.html" data-nav="home">Home</a></li>
            <li><a href="index.html#projects" data-nav="work">Projects</a></li>
            <li><a href="index.html#testimonials" data-nav="testimonials">Testimonials</a></li>
            <li><a href="contact.php" data-nav="contact" class="active">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <div class="grid-con" id="contact-us">

        <?php
        if(isset($_GET['msg'])) {
          echo '<p class="col-span-full m-col-span-8">' . $_GET['msg'] . '</p>';
        }
        ?>

        <form id="contact-form" class="col-span-full m-col-span-8" method="post" action="includes/send.php" novalidate>
          <p>Enter your info, and I’ll get back to you as soon as possible.</p>

          <label for="fname">*First Name</label>
          <input type="text" id="fname" name="fname" />

          <label for="lname">*Last Name</label>
          <input type="text" id="lname" name="lname" />

          <label for="email">*Email</label>
          <input type="email" id="email" name="email" />

          <label for="city">*City</label>
          <input type="text" id="city" name="city" />

          <label for="comments">*Comments</label>
          <textarea id="comments" name="comments"></textarea>

          <input id="submit" type="submit" value="Contact Me" />
        </form>
      </div>
    </main>

    <footer class="site-footer grid-con">
      <div class="footer-surface col-span-full">
        <div class="footer-top">
          <div class="footer-left">
            <a class="footer-email" href="mailto:luciano.s.clementi@gmail.com">luciano.s.clementi@gmail.com</a>
          </div>

          <nav class="footer-nav" aria-label="Footer">
            <ul>
              <li><a href="index.html" data-nav="home">Home</a></li>
              <li><a href="index.html#projects" data-nav="work">Projects</a></li>
              <li><a href="index.html#testimonials" data-nav="testimonials">Testimonials</a></li>
              <li><a href="contact.php" data-nav="contact">Contact</a></li>
            </ul>
          </nav>
        </div>

        <div class="footer-badges"></div>
        <hr class="footer-divider" />

        <div class="footer-bottom">
          <p>&copy; <span id="year"></span> — Luciano Clementi</p>
        </div>
      </div>
    </footer>

    <script src="js/main.js"></script>
  </body>
</html>
