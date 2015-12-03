<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>かだいやるぞう README</title>
        <script src="jquery.min.js"></script>
        <script src="jquery.cookie.min.js"></script>
        <!--localStorageプラグイン-->
        <script src="jquery.storage.js"></script>
        <!--textchangeを検知するプラグイン-->
        <script src="jquery.textchange.min.js"></script>
        <script src="readme.js">
        //standjkの最適化
        
        
        </script>
        <link rel="stylesheet" type="text/css" href="fuga.css" />
       
    </head>
    <body>
        <!-- アナリティクス-->
        <?php include_once("analyticstracking.php") ?>
        
        <img id="girl" alt="girl" class="object" src="img/standjk.png" />


         <div id="header">
            <h3>かだいやるぞう</h3>
            <p><a href="index.php">TOP</a>README</p>
        </div>
        
        <div id="timeline">
            <a class="twitter-timeline" href="https://twitter.com/YAS_mimasu" data-widget-id="645680365961502720">@YAS_mimasuさんのツイート</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
        </div>
        <div id="paragram">
            <p>更新履歴</p>
            <textarea class="recent" readonly>
2015/09/23字数制限の無いリアルタイム自動保存機能実装。各部分を最適化。
2015/09/22細かい部分修正。コードの最適化。スペースや改行が字数にカウントされないようにしました。
2015/09/21自動保存機能テストスタート。450文字以上保存できないお粗末な出来。
2015/09/20よりテスト中。色々お粗末です。

            </textarea>
                <p>主な機能:
                <ul>
                    <li>空欄文字をリアルタイムに数える機能</li>
                    <li>目標値を設定し進捗がわかる機能</li>
                    <li>かわいい女の子が色々出てくる機能</li>
                    <li><s>偉い人</s>が出てくるコピーガード(諸事情で削除しました)</li>
                    <li>作業内容のリアルタイム自動保存</li>
                </ul>
                <p>動作確認ブラウザ：Chrome バージョン 45.0.2454.93 </p>
                <p>これから実装したい機能:</p>
                <ul>
                    <li><s>450文字以上の文字の自動保存機能実装</s>→出来ました☆</li>
                    <li>スマホ対応</li>
                    <li>もっとマシなコピーガード</li>
                    <li>Chromeプラグイン化</li>
                    <li>and so on...募集中</li>
                </ul>
                <div class="message">
                <p>現在スマホだと表示が崩れるようです。気が向いたら直します。</p>
                <p>4byte文字は正しくカウントが出来ません。</p>
                <p>バグや仕様によって生じた問題及びいかなる損害も保証いたしかねます。</p>
                <p>バグ・要望などのご連絡はtwitterまでお願いします。</p>
                <p>
                <p>現在スマホだと表示が崩れるようです。気が向いたら直します。</p>
                <p>保存されたデータの削除はこちらからどうぞ。動作が重たくなった時効果的です。</p>
                <p>復旧は物理的に不可能です。よく考えて押して下さい。</p>
                </div>
                <input class="delete" type="button" value="保存データ全削除"  ></input>
               <div class="copy">Copyright <?php echo date("Y");?> yas-nyan All Rights Reserved.(except imgs)</div>
                
                
                
          
            
        </div>
         
        
            
        <div id="footer">
            <div class="copy">Copyright <?php echo date("Y");?> yas-nyan All Rights Reserved.(except imgs)</div>
        </div>
        
    </body>
</html>
