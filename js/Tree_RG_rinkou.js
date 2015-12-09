
var TREE = TREE || {
};
//グローバル変数を使いたくない。が、無理なものもあるんだ…
var nodeSeeds = [];
TREE.height = "0";
//生成後は個々のプロパティを維持したままのnodeオブジェクトが格納される。呼び出す時は、nodes[i]でOKだ。
TREE.nodes = {};
TREE.root = "";
TREE.comparision = "";
//被ってるノードがあるかチェックするための辞書
TREE.dic = {};


TREE.commonMethod = {
};

TREE.event = {
    //新しいツリーを作成するときに"一度だけ"実行する。二度目以降は上書きされるはず。
    build: function (seeds) {
        //引数seedsにはnodeSeedsが入る。

        //TREE.rootにseeds[0]をインスタンス化したものを挿入。わざわざ変数を介してるのは、depthを0にしてからじゃないと変な気がするから。
        var rootNode = new Node(seeds[0]);
        rootNode.depth = 0;
        //TREE.root = rootNode;
        
        eval("TREE.nodes.node" + seeds[0] + "= rootNode");
        //ルートが入ったことをTREE.dicに宣言しとく。
        TREE.dic[seeds[0]] = 1;



        //seeds[0]は根ノードなので、それ以降でインサートを行っていく繰り返し。
        for (var i = 1, len = seeds.length; i < len; i++) {
            TREE.event.insert(seeds[i]);
        }




        //ツリー生成が完了したらDOMに書き込む。Object.keys().lengthは連想配列の項目数を表す。TREE.dicは被りを覗いた全てのノードが入ってる。
        $("#errMsg").html("ツリーの生成が完了しました。高さ:" + TREE.height + " ノードの数:" + Object.keys(TREE.dic).length + "<br>下記から操作をしてみてください。");



    },
    //seedの挿入はこちらを実行する。(一つのシードごとに呼び直すのでワンループの処理でおｋ)ツリーをビルドするときも、新規ノードを挿入する時もまたしかりである。
    insert: function (seed) {

        //はじめに比べるのは必ず根ノードであるので、初期値は根にする。
        TREE.comparision = eval("TREE.nodes.node" + nodeSeeds[0]);

        //もしTREE.dicに存在しなければグローバル変数としてこのノードを宣言する。名前は安直にnode[prm] (ex,node1, node114514)
        if (!TREE.dic[seed]) {
            TREE.dic[seed] = 1;
            eval("TREE.nodes.node" + seed + "= new Node(seed)");
        } else {
            //既に同じノードがある場合は終了。
            return;
        }

        //連続して比較する。葉ノードで無い時にループ
        while (eval("TREE.nodes.node" + seed + ".leaf") === false) {

            //深さカウント whileを通過する度に１つずつ出していく。
            eval("TREE.nodes.node" + seed + ".depth" + "=" + "TREE.nodes.node" + seed + ".depth +1");



            //seedが比較対象より大きいまたは等しい時、右に持っていく
            if (TREE.comparision.prm < seed) {
                //alert("おおきいよ！" + seed);

                //比較対象に右の子供がいる場合
                if (eval("TREE.nodes.node" + TREE.comparision.prm + ".rightChild")) {
                    //次の比較対象をそいつにする。
                    //alert("次の比較対象はこいつだ" + TREE.comparision.rightChild.prm);


                    TREE.comparision = TREE.comparision.rightChild;
                } else {
                    //右の子供がいない場合,比較対象のグローバル変数node[prm]の右の子供を、node[seed]とする。
                    eval("TREE.nodes.node" + TREE.comparision.prm + ".rightChild = TREE.nodes.node" + seed);
                    //比較対象のリーフ属性をこっそりfalseにする
                    eval("TREE.nodes.node" + TREE.comparision.prm + ".leaf = false");

                    //そんで、node[seed]の親をもともとの比較対象のノードにする。
                    eval("TREE.nodes.node" + seed + ".parent" + "= TREE.nodes.node" + TREE.comparision.prm);
                    //右の子供がいなかったということはすなわち、このノードは葉ノードになったということだね。これでループを抜ける。
                    eval("TREE.nodes.node" + seed + ".leaf" + "= true");
                }
            } else if (TREE.comparision.prm > seed) {//seedが比較対象より小さい時

                //alert("小さいよ" + seed);
                //比較対象に左の子供がいる場合
                if (eval("TREE.nodes.node" + TREE.comparision.prm + ".leftChild")) {
                    //次の比較対象はそいつにする。
                    //alert("次の比較対象はこいつだ" + TREE.comparision.leftChild.prm);
                    TREE.comparision = TREE.comparision.leftChild;
                } else {
                    //左の子供が居ない場合、比較対象のnode[prm]の左の子供はnode[seed]になる。
                    eval("TREE.nodes.node" + TREE.comparision.prm + ".leftChild = TREE.nodes.node" + seed);
                    //比較対象のリーフ属性をこっそりfalseにする
                    eval("TREE.nodes.node" + TREE.comparision.prm + ".leaf = false");

                    //そんで、node[seed]の親を比較対象のノードにする。
                    eval("TREE.nodes.node" + seed + ".parent" + "= TREE.nodes.node" + TREE.comparision.prm);
                    //比較対象の左の子供がいなかったということはすなわち、このノードは葉ノードになったということだね。これでループを抜ける。
                    eval("TREE.nodes.node" + seed + ".leaf" + "= true");
                }


            }
        }
        //木の高さを求めるために、TREE.heightに最高値を記録しておく
        if (eval("TREE.nodes.node" + seed + ".depth > TREE.height")) {
            //TREE.heightよりnode[seed]の深さが大きい場合、
            eval("TREE.height = TREE.nodes.node" + seed + ".depth");
        }
        //一通り完了したら、cosole.logしとく。
        console.log("TREE.nodes.node" + seed + ":OK");
    },
    find: function (seed) {

        //最初の比較ターゲットは根
        TREE.comparision = eval("TREE.nodes.node" + nodeSeeds[0]);
        while (TREE.comparision.prm != seed) {
            //探したいターゲットが比較対象より大きい時
            if (TREE.comparision.prm < seed) {
                if (!TREE.comparision.rightChild) {
                    //比較対象の右の子供が存在しない時
                    return (seed + "はこのツリーに存在しません。近似値としては" + TREE.comparision.prm + "があります。").toString();

                }
                //次のターゲットは今の比較対象の右の子供
                TREE.comparision = TREE.comparision.rightChild;
            } else if (TREE.comparision.prm > seed) {
                //探したいターゲットが比較対象より小さい時
                if (!TREE.comparision.leftChild) {
                    //比較対象の左の子供が存在しない時
                    return (seed + "はこのツリーに存在しません。近似値としては" + TREE.comparision.prm + "があります。").toString();

                }
                //次のターゲットは今の比較対象の左の子供
                TREE.comparision = TREE.comparision.leftChild;
            }
        }
        if (TREE.comparision.prm == seed) {
            //探したいターゲットがそのものの時
            return TREE.comparision.position();
        }


    },
    sort: function () {
        //未実装
//        var orderedNodes =[];
//        //how many tree nodes
//        var hmtNodes = Object.keys(TREE.dic).length;
//        //最初の比較ターゲットは根
//        TREE.comparision = eval("node" + nodeSeeds[0]);
//        while(TREE.comparision.leftChild){
//            //１番左下に行く
//            TREE.comparision = TREE.comparision.leftChild;
//        }
//        orderedNodes.push(TREE.comparision.prm);
//        
//        //こっからスタート
//        while(orderedNodes.length ==  hmtNodes){
//            if(TREE.comparision.leftChild){
//                TREE.comparision = TREE.comparision.leftChild;
//            }
//            
//        }

    }


};



//ランダムにノードシードに整数値を入れるよ。
function getRandomInt(min, max, amount) {

    for (var i = 0; i < amount; i++) {
        nodeSeeds[i] = Math.floor(Math.random() * (max - min + 1)) + parseInt($("#min").val());//パースイント出来無い
        console.log(nodeSeeds[i]);

    }
}

//onclickでシードを実際に生成する。
$("#seedInput").bind("click", function () {
    //if($("#min").val().type() != int)

    getRandomInt($("#min").val(), $("#max").val(), $("#amount").val());
    $("#seedOutput").html("生成結果：");

    //出来た配列をDOMに書き出す。
    for (var i = 0; i < nodeSeeds.length; i++) {
        $("#seedOutput").append(nodeSeeds[i] + ",");
    }
});

//ノードのクラス
var Node = function (prm) {
    this.prm = prm;
    this.depth = 0;
    this.leaf = false; //葉ノードであるかどうかはブーリアン型で定義付け。デフォはfalse
    this.parent = "";
    this.rightChild = "";
    this.leftChild = "";
};
//ノードの今の場所を確認するメソッド
Node.prototype.position = function () {
    return "数値:" + this.prm + " 深さ"+ this.depth +"　親:" + this.parent.prm + "　子:" + this.leftChild.prm + "," + this.rightChild.prm;
};


//クリックでツリーの初期ビルド
$("#treeOutput").bind("click", function () {
    TREE.event.build(nodeSeeds);
});

//このノードを挿入するで後から挿入出来る
$("#insert").bind("click", function () {
    var target = $("#target").val();
    if (TREE.dic[target]) {
        $("#resultMsg").html(target + "は既に存在します。");
        return;
    }
    TREE.event.insert(target);
    //終わったらエラーログを追加。
    $("#resultMsg").html(target + "を挿入しました。");

});

//木から探索関数を呼び出す。
$("#find").bind("click", function () {
    var target = $("#target").val();
    //findは返り値で文字列を持ってくるのでそれをただhtmlに投げる。
    $("#resultMsg").html(TREE.event.find(target));


});
//気をソートする
$("#sort").bind("click", function () {
    $("#resultMsg").html(TREE.event.sort());
});


//探索比較用関数を呼び出す。
$("#shougou").bind("click", function () {
    var target = $("#s_target").val();

    $("#sMsg").html(shougou(target));

});

//バブルソート関数を呼び出す。
$("#bsort").bind("click", function () {
    bubbleSort();
    for (var i = 0; i < aftersort.length; i++) {
        $("#sMsg").append(aftersort[i] + ",");
    }
});

//探索比較用関数
function shougou(target) {
    //何回出てきたか
    var count = 0;
    //何番目が最初か
    var th = 0;


    for (var i = 0, len = nodeSeeds.length; i < len; i++) {


        if (target == nodeSeeds[i]) {
            count++;
            if (th == 0) {
                th = i + 1;
            }

        }

    }
    return "探索が終了しました。配列内で" + target + "は" + count + "回出てきており、初めに出てきたのは" + th + "番目です。";
}
function bubbleSort() {
    aftersort = nodeSeeds;
    for (i = 0; i < aftersort.length - 1; i++)
    {
        for (j = 0; j < aftersort.length - i - 1; j++)
        {
            if (aftersort[j] > aftersort[j + 1])
            {
                n = aftersort[j];
                aftersort[j] = aftersort[j + 1];
                aftersort[j + 1] = n;
            }
        }
    }


}


//ツリーをグラフに書き出す。
$("#makegraf").bind("click", function(){
    makeGraf();
});
//オブジェクトをJSONにする。
function makeGraf() {
    $.parseJSON(TREE.nodes);
     
    //alert(json_text);
}