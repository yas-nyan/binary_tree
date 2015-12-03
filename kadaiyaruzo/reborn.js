//前回の作業内容をクッキーから復旧。
//分割cookieを一緒にする作業。
            
            $(document).ready(function(){

                if(typeof($.storage("preservedData"))!== "undefined"){
                    if(confirm("前回の作業内容が残っています。\n 復旧しますか？")){
                        //localStorageより作業内容を復旧。
                        var getPreData =$.storage("preservedData");
                        
                        $("#textarea").val(getPreData.typedtext);

                        //localStorageより目標を復旧。 #yyyyに目標を。 #targetにも目標を。
                        $("#yyyy").html(getPreData.target);
                        $("#target").val(getPreData.target);
                        //作成日時を書き出し。
                        $("#upDate").html("最終保存日時:" + getPreData.upDate +" " + getPreData.upTime);
                        
                    }else if(confirm("前回の作業内容を削除します。本当によろしいですか？")){
                        //storage削除
                        $.clearStorage();
                        alert("完了");
                    }else{
                        //とりあえず復旧
                        alert("とりあえず復旧します( ｰ`дｰ´)ｷﾘｯ");
                        $("#yyyy").html(getPreData.target);
                        $("#target").val(getPreData.target);
                        //作成日時を書き出し。
                        $("#upDate").html("最終保存日時:" + getPreData.upDate +" " + getPreData.upTime);
                    }
                }
                //文字数カウントnowtypedは空白・改行を""にしてしまう。
                $("#xxxx").html($("#textarea").val().replace(/\s+/g,'').length);
                //進捗%を計算。打った文字数は#xxxxより文字列を、目標は#targetから数値を取る。
                var ratio = parseInt($("#xxxx").html()) / $("#target").val() * 100;
                $("#zzzz").html(ratio.toFixed());
                
                
                
                
        });
 