<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

<html>
    <head>
        <meta charset="UTF-8">
        <title>かだいやるぞう リアルタイム文字数カウンター</title>
        <script src="jquery.min.js"></script>
        
        <script src="jquery.cookie.min.js"></script>
        <!--localStorageプラグイン-->
        <script src="jquery.storage.js"></script>
        <!--textchangeを検知するプラグイン-->
        <script src="jquery.textchange.min.js"></script>
        <script src="reborn.js"></script>


        <script>
            
            $(document).ready(function(){
            //jqueryお決まりの文句
            
                
            $("#textarea").bind("textchange",function count(){
                //#textareaでtextchangeされたら発火するようにbind
                
                //打ったものをそれぞれ取得。nowtypedは空白・改行を""にしてしまう。
                var nowtyped = parseInt($("#textarea").val().replace(/\s+/g,'').length);
                var target = parseInt($("#target").val());
                

                //現在打ち込んだ文字数を書き出し。
                $('#xxxx').html(nowtyped);
                //目標を書き出し。
                $("#yyyy").html(target);

                //現在の進捗を書き出し。
                var ratio = nowtyped / target * 100;
                $("#zzzz").html(ratio.toFixed());

               //localStorageに保存する。
               preserveToStorage();
               

                //目標達成表示
                var getText = document.getElementById('text');
                var getGirl = document.getElementById('girl');
             
             
                if (nowtyped >= target){
                    //目標達成の文言
                    $("#complete").html("目標達成 <br> お疲れ様でした。");
                    //以下テキストの書き換え・サイズ最適化
                    getText.src = 'img/otukare.png';
                    getText.style.width = '60px';
                    getText.style.maxWidth = '10%';

                    //以下女子の書き換え・サイズ最適化
                    getGirl.src ="img/oyasumigirl.png";
                    getGirl.style.width = '500px';
                    getGirl.style.maxWidth= "80%";
                }else if(ratio >= 50){
                    //50%オーバーでボーナス
                    //50%突破表示
                    $("#complete").html("50%突破");
                    //以下テキストの書き換え・サイズ最適化
                    getText.src = 'img/hanbun.png';
                    getText.style.width = '400px';
                    getText.style.maxWidth = '30%';
                    
                    //以下女子の書き換え・サイズ最適化
                    getGirl.src ="img/moesode.png";
                    getGirl.style.width = '500px';
                    getGirl.style.maxWidth= "80%";
                    
                }else if($("#girl").attr('src') === "img/agent.png"){
                    //おっさんだった場合、諸々を動かさない(ボーナスになるまで放置。)
                   
                    
                    
                }else{
                    //目標達成状態ではなくなった場合、諸々を元に戻す。
                    //目標達成の文言を無にする。
                    $("#complete").html("");
                    //テキスト
                    getText.src ="img/kadai.png";
                    getText.style.width = "40px";
                    getText.style.maxWidth = "7%";
                    //女子
                    getGirl.src ="img/girl-only_s.png";
                    getGirl.style.width = '200px';
                    getGirl.style.maxWidth= "40%";

                 } 
     
            });
            //pasteしたら起こる用にする。
            //どうしてもペースト前に起こるので、count系のお仕事はさせないことにした。
            document.getElementById('textarea').addEventListener('paste', function() {
               var getText = document.getElementById('text');
               var getGirl = document.getElementById('girl');
               //コピーガード機能()
               juncheck = confirm("MRIJUN「おい、その文章自分のなんだろうなぁ？」");
               
                if (juncheck === false){
                   //小保方する。
                   $("#attention").html("剽窃は某リケジョルートです。");
                   //おっさんが出てくる
                   getGirl.src = "img/agent.png";
                   getGirl.style.width = '400px';
                   getGirl.style.maxWidth= "60%";
                   
                   //放塾になっても良いんだろうな！？
                   getText.src ="img/death.png";
                   getText.style.width = "100px";
                   getText.style.maxWidth = "60%";
                   
                   
               }
               
               
            }, false);
            /*
            $("#targetset").click(function(){
                $("#textarea").textchange;
            });
            */
            
            });
            
      
           
            
            function targetset(){
                //#textareaがkeyupされたのと同じ動作。
                $("#textarea").trigger("textchange");
                
                
                //目標設定・計算・localStorageへの保存など諸々はcount()に移譲しました。
                //よって空っぽ。
                
            };
            
            
           
         
           
           
           
           
           
           function preserveToStorage(){
                //毎回localStorageに保存
                //ぶち込むデータを定義。
                var typedtext = $("#textarea").val();
                var target = $("#target").val();
                var now = new Date();
                var upDate = now.toLocaleDateString("Japan");
                var upTime = now.toLocaleTimeString("Japan");
                
                //一切合切を厚切りjson形式にする。
                var preservedData = {
                    "target" : target,
                    "typedtext" : typedtext,
                    "upDate" : upDate,
                    "upTime" : upTime
                };
                
                //localStorageに保存
                $.storage("preservedData",preservedData);
                console.log($.storage("preservedData").typedtext);
                //成功の印にupDateを書き出しておく。
                $("#upDate").html("最終保存日時:"+upDate+" "+upTime);
                
            }
            
            
            
             
        </script>
        <link rel="stylesheet" type="text/css" href="fuga.css" />
        
        
    </head>
    <body>
        <!-- アナリティクス-->
        <?php include_once("analyticstracking.php") ?>
        
        <!--背景画像girl-->

        <img id="girl" alt="girl" class="object" src="img/girl-only_s.png" />
        <img id="text" alt="text" class="object" src="img/kadai.png" />
        <!--<img id="jun" alt="jun" class="object" src="img/juncheck.png"/>-->
             
        
        <div id="header">
            <h3>かだいやるぞう!</h3>
            <p>リアルタイム文字数カウンター(作業内容は自動で永久保存！） <a href="readme.php">README</a></p>
        </div>
         <div class="sidebar">
            <p>現在<span id="xxxx">0</span>文字</p>
            <p>目標:<span id="yyyy">0</span>文字</p>
            <p id="complete"></p>
            <!-- #attention 小保方用のエリア-->
            <p id="attention"></p>
            <p>進捗<span id="zzzz">0</span>%</p>
            
                
        </div>
        <p class="message" >自動保存機能が利用できます。文字数制限はありませんが、あまりに大きい(50万字~)と動作が不安定になるおそれがあります。</p>
        <div id="main">
            <textarea  id="textarea" cols="150" rows="30" name="text" ></textarea>
        </div><!--onkeyup="count();"--> <!-- onpaste="copygard()"-->
        <!--テスト-->
        <span id="upDate"></span>
        <p id="test"></p>
        <p id="test2"></p>
        <p id="test3"></p>
        <p>目標文字数:
            <input type="number" id="target" /></p>
        
        <div id="targetset" onclick="targetset()" class="general-button" >
                <div class="button-content">
                      <span class="button-text">目標文字数セット</span>
                </div>
            </div>
        
        

                
        
        <div id="footer">
            <div class="copy">Copyright <?php echo date("Y");?> yas-nyan All Rights Reserved.(except imgs)</div>
        </div>

    </body>
</html>
