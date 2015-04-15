<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Himanshi Bhardwaj's Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="author" content="Himanshi Bhardwaj"/>

    <link href="homepage/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="homepage/css/bootstrap-responsive.min.css" rel="stylesheet"/>
    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link href="homepage/css/style.css" rel="stylesheet"/>
    <link href="homepage/css/bootstrap-lightbox.min.css" rel="stylesheet"/>
    <link href="homepage/css/m-styles.min.css" rel="stylesheet"/>
    <link href="homepage/css/font-awesome.min.css" rel="stylesheet"/>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css'/>
    <link rel="image_src" href="homepage/img/MyImage.jpg"/> 
</head>

<body data-spy="scroll" data-target=".navbar" data-offset='64' onload="$.stellar();">
    <div id="preloader">
        <div id="status">&nbsp;</div>
    </div>
    <!--start navigation-->
    <div class="navbar navbar-fixed-top" id="navigation">
        <div class="navbar-inner">
            <div class="container">
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>

                <div class="nav-collapse collapse">
                    <ul class="nav pull-right">
                        <li><a href="#intro">Home</a></li>
                        <li><a href="#whosishe">Who am I</a></li>
                        <li><a href="#works-top">Projects</a></li>
                        <li><a href="#experiments-top">Experiments</a></li>
                        <li><a href="#contact-top">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <section id="intro">
        <div class="container">
            <div class="row">
                <div class="span8 offset2 margin25">
                    <div id="carousel_fade_intro" class="carousel slide carousel-fade">
                        <div class="carousel-inner">
                            <div class="active item">
                                <h2>Himanshi Bhardwaj</h2>
                            </div>
                            <div class="inactive item">
                                <h2>हिमांशी भारद्वाज</h2>
                            </div>
                            <div class="inactive item">
                                <h2> 巴德瓦杰</h2>
                            </div>
                            <div class="inactive item">
                                <h2>ஹிமான்ஷி பரத்வாஜ்</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fadeInUp delay animated" id="more">

            <a href="#whosishe" class="m-btn a-btn blue big icn-only">
                Check out!
            </a>
        </div>
    </section>
   
    <section id="whosishe">
        <!--start services-desktop header-->
        <section id="services-top-desktop" class="visible-desktop" data-stellar-background-ratio="0.6" data-stellar-vertical-offset="20">
            <h1 class="header">Who is Himanshi?</h1>
            <p class="header">Who is she?</p>
        </section>
        <!--start services-mobile header-->
        <section id="services-top-mobile" class="hidden-desktop">
            <h1 class="header">Who is Himanshi?</h1>
            <p class="header">Who is she?</p>
        </section>
    </section>
    <!--start services-->
    <section id="services">
        <div class="container">
            <div class="row divide">
                <div class="span12">
                    <ul class="thumbnails">
                        <li class="span3">
                            <div class="thumbnail">

                                <h4>Student</h4>
                                <span>Northeastern University, MA</span>
                                <p>Himanshi is pursuing Masters of Science, with specialization in Computer Science.
                                </p>
                 
                            </div>
                        </li>

                        <li class="span3">
                            <div class="thumbnail">
                                <h4>Name/Home</h4>
                                <span>New Delhi (India)</span>
                                <p>Pronounced - <b>he-Maan-she</b>.<br />
                                   Meaning - Piece of ice
                                </p>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <h4>Work Experience</h4>
                                <span>Samsung R&D Noida, India</span>
                                <p>Himanshi has 1.5 years of working experience with Samsung as a Software Engineer.</p>
                            </div>
                        </li>

                        <li class="span3">
                            <div class="thumbnail">
                                <h4>Mentor</h4>
                                <span>Personal</span>
                                <p>Himanshi has mentored over 300 students from different colleges on windows phone app development. 
                                </p>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </section>
    <!--start works header-->
    <section id="works-top">
        <!--start works-desktop header-->
        <section id="works-top-desktop" class="visible-desktop" data-stellar-background-ratio="0.6" data-stellar-vertical-offset="20">
            <h1 class="header">Projects</h1>
            <p class="header">Projects that I have done in the past!</p>
        </section>
        <!--start works-mobile header-->
        <section id="works-top-mobile" class="hidden-desktop">
            <h1 class="header">Projects</h1>
            <p class="header">Projects that I have done in the past!</p>
        </section>
    </section>
    <!--start works-->
    <section id="works">
        <div class="container">
            <div class="row divide">
                <center>
                    <ul class="thumbnails">
                        <li class="span4">
                            <div class="thumbnail">
                                <img src="homepage/img/suv.jpg"/>
                                <h4>SAMUDRA-AUV</h4>
                                <span>Autonomous Underwater Vehicle</span>
                                <p>Worked in a team on an AUV which travels underwater. This project was ranked third in the finals of “National Student Competition on Student Autonomous underwater Vehicle (SAVe 2012)” by National Institute of Ocean Technology (NIOT), Chennai, India.
                                </p>
                            </div>
                        </li>

                        <li class="span4">
                            <div class="thumbnail">
                                <img src="homepage/img/pnc.png"/>
                                <h4>PORTING LINUX ON ARM CORTEX</h4>
                                <span>Created our own OS ! Sorta!?!</span>
                                <p>
                                    Ported and configured Linux kernel on ARM Cortex-A8 board, using a BeagleBone development board.
                                    Development process included Building of a cross-compiler Toolchain, configuring of U-Boot and
                                    kernel compilation for omap2plus config to obtain uImage.
                                </p>
                            </div>
                        </li>

                        <li class="span4">
                            <div class="thumbnail">
                                <img src="homepage/img/mdc.png"/>
                                <h4>MULTIPLE DATA COMPRESSOR</h4>
                                <span>C language (GNU standard) using GCC complier</span>
                                <p>used to compress a text file into smaller size, with enabled encryption. Using the concept of multiple compression,
                                 the project compresses a file upon many levels, further increasing the level of encryption.
                                </p>
                            </div>
                        </li>

                    </ul>

                    <h1> Certifications </h1>
                </center>

                <ul>
                    <li>Microsoft Certification: Programming in HTML5 with JavaScript and CSS3</li>
                    <li>Microsoft Certification: Programming in C#</li>
                    <li>Microsoft Certification: Essentials in Developing Windows Store Apps using HTML5 and JavaScript</li>
                    <li>Microsoft Certification: Advanced Windows Store App Development using HTML5 and JavaScript</li>
                </ul>

            </div>
        </div>
    </section>

    <!--start experiments header-->
    <section id="experiments-top">
        <!--start experiments-desktop header-->
        <section id="experiments-top-desktop" class="visible-desktop" data-stellar-background-ratio="0.6" data-stellar-vertical-offset="20">
            <h1 class="header">Experiments</h1>
            <p class="header">Various Links</p>
        </section>
        <!--start experiments-mobile header-->
        <section id="experiments-top-mobile" class="hidden-desktop">
            <h1 class="header">Experiments</h1>
            <p class="header">Various Links</p>
        </section>
    </section>

    <!--start experiments-->
    <!--start thumbnails section-->
    <section id="experiments">
        <div class="container">
            <div class="row divide">
                <div class="span12">
                    <ul class="thumbnails">

                        <li class="span3">
                            <div class="thumbnail">
                                <a href="sitestatistics/" target="_blank">SiteStatistics</a>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <a href="statistics/" target="_blank">Statistics</a>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <a href="source/" target="_blank">Source</a>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <a href="search/" target="_blank">Search</a>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <a href="searchtree/" target="_blank">SearchTree</a>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <a href="textview/" target="_blank">TextView</a>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <a href="filelist.aspx" target="_blank">FileList</a>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <a href="autofile.aspx" target="_blank">AutoFile</a>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <a href="images/autoimage.aspx" target="_blank">Images</a>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <a href="blog/" target="_blank">Blog</a>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <a href="story/index.htm?../Experiments/story.txt" target="_blank">My Experiments</a>
                            </div>
                        </li>
                        <li class="span3">
                            <div class="thumbnail">
                                <a href="https://github.com/himi1/CS5610-himanshi" target="_blank">Github Files</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!--start contact header-->
    <section id="contact-top">
        <!--start contact-desktop header-->
        <section id="contact-top-desktop" class="visible-desktop" data-stellar-background-ratio="0.6" data-stellar-vertical-offset="20">
            <h1 class="header">Contact</h1>
            <p class="header">Reach Me!</p>
        </section>
        <!--start contact-mobile header-->
        <section id="contact-top-mobile" class="hidden-desktop">
            <h1 class="header">Contact</h1>
            <p class="header">Reach Me!</p>
        </section>
    </section>
    <!--start contact-->
    <section id="contact">
        <div class="container">
            <div class="row divide">
                <div class="span8">
                    <div class="row">
                        Connect with Himanshi at <br />
                        himanshi (dot) bhardwaj (at) outlook (dot) com {Personal Email}<br />
                        himanshi (at) ccs (dot) neu (dot) edu {Department Email}<br />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--start footer-->
    <section id="footer">
        <div class="container">
            <div class="row divide">
                <div class="span3">

                    <p>2015 created by: Himanshi Bhardwaj</p><br/>

                </div>
                <!--footer menu-->
                <div class="span2 offset4">
                    <ul>
                        <li><h5>Menu</h5></li>
                        <li><a href="#intro">Home</a></li>
                        <li><a href="#whosishe">Who am I</a></li>
                        <li><a href="#works-top">Projects</a></li>
                        <li><a href="#experiments-top">Experiments</a></li>
                    </ul>
                </div>
                <!--link to social networks-->
                <div class="span2 offset1">
                    <ul>
                        <li><h5>Social</h5></li>
                        <li><a class="facebook" href="https://www.facebook.com/bhardwaj.himanshi" target="_blank">Facebook</a></li>
                        <li><a class="linkedin" href="https://www.linkedin.com/profile/view?id=184004120" target="_blank">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <!--latest jQuery-->
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <!--main bootstrap js-->
    <script src="homepage/js/bootstrap.min.js" type="text/javascript"></script>
    <!--custom js-->
    <script src="homepage/js/custom.js" type="text/javascript"></script>
    <!--preloader-->
    <script src="homepage/js/loader.js" type ="text/javascript"></script>
    <!--retina support-->
    <script src="homepage/js/retina.js" type="text/javascript"></script>
    <!--smooth scroll on page-->
    <script src="homepage/js/jquery.easing-1.3.pack.js" type="text/javascript"></script>
    <!--custom scrollbar-->
    <script src="homepage/js/jquery.nicescroll.min.js" type="text/javascript"></script>
    <!--parallax-->
    <script src="homepage/js/jquery.stellar.js" type="text/javascript"></script>
    <!--contact-->
    <script src="homepage/js/jquery.form.js"></script>
    <!--experiments lightbox-->
    <script src="homepage/js/bootstrap-lightbox.min.js"></script>

</body>
</html>
