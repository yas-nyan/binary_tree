<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>Yas.yokohama</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="js/jquery.min.js"></script>
        <script>
            $(document).ready(function(){
              
                $("#twitter").bind("click",function(){
                   window.open("http://twitter.com/yas_mimasu/",'_blank');
                   
               });
               $("#facebook").bind("click",function(){
                   window.open("https://www.facebook.com/yas.mimasu",'_blank');
                   
               });
               $('a[href^=#]').click(function(){
                //ページ内スクロールがゆっくりになる
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
               });
            });
            
        </script>
        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.css" rel="stylesheet">
        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
            
    </head>
    <body>
        <?php include_once("analyticstracking.php") ?>
        <header>
            <div class="navbar navbar-default navbar-fixed-top">
            <div class="container">
              <div class="navbar-header">
                <a href="http://yas.yokohama/" class="navbar-brand">yas.yokohama</a>
                <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </div>
              <div class="navbar-collapse collapse" id="navbar-main">
                <ul class="nav navbar-nav">
                  <li><a href="http://yas.yokohama/">Top</a></li>
                  <li class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Contact <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                      <li><a href="#me">About me</a></li>
                      <li><a href="" onclick="$('#twitter').trigger('click')">Twitter</a></li>
                      <li><a href="" onclick="$('#facebook').trigger('click')">Facebook</a></li>
                    </ul>
                  </li>
                  <li><a href="#content">Contents</a></li>
                </ul>
              </div>
            </div>
            </div>
        </header>
       
        <div class="jumbotron special">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 marginkure">
                        <h1 class="">Hello World</h1>
                        <img class="rum neco" alt="neco" src="img/neco.png" />
                        <p>This is yas-nyan's web site</p>
                    </div>
                    <div class="col-xs-12 col-sm-4"> 
                        <img  class="img-circle cat" alt="cat" src="img/cat.png" />
                       
                    </div>
                    <div id="dummy" class="col-lg-offset-12">
                        
                    </div>
                        
                    <div  class="col-xs-12 col-sm-8">
                        <div id="me" class="bs-component">
                            <div class="panel-primary">
                                <div class="panel-heading">
                                    <h3 class="panel-title">about me</h3> 
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div  class="col-md-4">
                                            <h2>Yasunobu Toyota</h2>
                                            <h5>RGID:yas-nyan</h5>
                                        </div>
                                        <div class="col-md-8">
                                            <h4>Keio Univ. SFC'14</h4>
                                            <h5>村井純研究会 NECO Lab. SIWS<br>
                                                
                                                <br>
                                                ミチシルベ 株式会社 
                                                <a href='http://car-moby.jp/'>MOBY</a> エディター
                                            </h5>
                                            
                                            <button  id="twitter" type='button' class="btn btn-info">
                                                <span class='fa fa-twitter-square'></span>
                                                Twitter 
                                            </button>
                                            
                                            
                                                <button id="facebook" type='button' class='btn btn-primary facebook'>
                                                    <span class='fa fa-facebook'></span>
                                                    Facebook
                                                </button>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                                
                        </div>
                            
                    </div>
                    <div class="col-xs-12 col-sm-4"> 
<!--                        <button type="button" class="btn btn-danger">ああ</button>-->
                    </div>
                </div>
            </div>
            
        </div>
        
        <section id="content" class="section section-default ">
            <div class="container">
                <div class="row">
                    <div class="col-md-4  col-xs-12">
                        <div class="bs-component">
                            <div class="panel-primary content">
                                <div class="panel-heading">
                                    <p>課題支援ツール</p>
                                    <h3 class="panel-title" style="font-size:200%; ">かだいやるぞう</h3>
                                </div>
                                <div class="panel-body">
                                    <h1><span class="fa fa-pencil" style="font-size:150px; color:#128f76; text-align:center;"></span></h1>
                                    <p>リアルタイムな文字カウント及び進捗表示と自動保存機能を兼ね揃えた軽快な課題専用テキストエディターです。美女に応援されるおまけ付き。</p>
                                    <ul>
                                        <li>2015年９月リリース。現在ver.1.3</li>
                                        <li><a href="http://yas.yokohama/kadaiyaruzo/">かだいやるぞう</a></li>
                                    </ul>
                                
                                </div>    
                            </div>
                        </div>
                        
                        
                        
                        
                    </div>
                    
                    <div class="col-md-4  col-xs-12">
                        <div class="bs-component">
                            <div class="panel-primary content">
                                <div class="panel-heading">
                                    <p>Chrome拡張プラグイン</p>
                                    <h3 class="panel-title" style="font-size:180%; ">SFS課題支援ツール(仮)</h3>
                                </div>
                                <div class="panel-body">
                                    <h1><span class="fa fa-chrome" style="font-size:150px; color:#128f76; text-align:center;"></span></h1>
                                    <p>リアルタイムな文字カウント及び進捗表示と自動保存機能を、Chrome拡張機能としてSFC-SFS内で実現します。美女に応援されるおまけはどうなるんでしょうか。</p>
                                    <ul>
                                        <li>現在鋭意開発中。</li>
                                        <li>2015年10月リリース予定</li>
                                    </ul>
                                
                                </div>    
                            </div>
                        </div>
                        
                        
                        
                        
                    </div>
                    
                    <div class="col-md-4  col-xs-12 content">
                        <div class="bs-component">
                            <div class="panel-primary content">
                                <div class="panel-heading">
                                    <p>Twitter,スピードブロられツール</p>
                                    <h3 class="panel-title" style="font-size:140%; ">Twitter拡張 鬼ファボメンヘラいちごちゃん</h3>
                                </div>
                                <div class="panel-body">
                                    <h1><span class="fa fa-venus" style="font-size:150px; color:#128f76; text-align:center;"></span></h1>
                                    <p>Chrome拡張機能です。ページ上に表示されているTLのツイートを全て自動でふぁぼります。多分すぐうざがられてブロられます。</p>
                                    <ul>
                                        <li>現在鋭意企画中。</li>
                                        <li>2015年度中にリリースできれば御の字</li>
                                    </ul>
                                
                                </div>    
                            </div>
                        </div>
                        
                        
                        
                        
                    </div>
                    
                </div>
            </div>
        </section>
          
        
        
        <footer class="small">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 text-center copyright">
                        © <?php echo date("Y"); ?> yas.yokohama all rights have reserves.
                    </div>
                
                </div>
                    
            </div>
        </footer>
       
        <!--bootstrap-->
        <script src="js/bootstrap.min.js"></script>
        <script type="text/javascript">
            $('.bs-component [data-toggle="popover"]').popover();
            $('.bs-component [data-toggle="tooltip"]').tooltip();
        </script>
    
    </body>
</html>
