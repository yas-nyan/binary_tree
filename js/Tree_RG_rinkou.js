

var TREE = TREE || {
};
var nodeSeeds = [];
TREE.height = "0";
TREE.nodes = {};
TREE.root = "";
TREE.comparision = "";
//被ってるノードがあるかチェックするためのハッシュ
TREE.dic = {};


TREE.commonMethod = {
};

TREE.event = {
    /*
     * ツリーの作成メソッドです。TREE.event.buildで発火します。
     * 
     */
    //新しいツリーを作成するときに"一度だけ"実行する。二度目以降は上書きされる。
    build: function (seeds) {

        //引数seedsにはnodeSeedsが入る。

        //TREE.rootにseeds[0]をインスタンス化したものを挿入。
        var rootNode = new Node(seeds[0]);
        TREE.root = rootNode;
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
    /*
     * ノードの挿入メソッドです。TREE.event.insertで発火します。
     * 
     */
    //seedの挿入はこちらを実行する。ツリーをビルドするときも、新規ノードを挿入する時もまたしかりである。
    insert: function (seed) {

        //はじめに比べるのは必ず根ノードであるので、初期値は根にする。
        TREE.comparision = TREE.root;
        //何もキー入力がされなかった場合そのまま帰す。
        if (!seed) {
            return;
        }

        //もしTREE.dicに存在しなければTREE.nodes.nodeXとしてこのノードを宣言する。
        if (!TREE.dic[seed]) {
            TREE.dic[seed] = 1;
            eval("TREE.nodes.node" + seed + "= new Node(seed)");
        } else {
            //既に同じノードがある場合は終了。
            return;
        }

        //連続して比較する。葉ノードで無い時にループ
        while (eval("TREE.nodes.node" + seed + ".leaf") === false) {

            //深さカウント whileを通過する度に１つずつ足していく。
            eval("TREE.nodes.node" + seed + ".depth" + "=" + "TREE.nodes.node" + seed + ".depth +1");



            //seedが比較対象より大きいまたは等しい時、右に持っていく
            if (TREE.comparision.prm < seed) {

                //比較対象に右の子供がいる場合
                if (eval("TREE.nodes.node" + TREE.comparision.prm + ".rightChild")) {
                    //次の比較対象をそいつにする。
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
    /*
     * ツリーの探索メソッドです。TREE.event.findで発火します。
     * 
     */
    find: function (seed) {
        

        //最初の比較ターゲットは根
        TREE.comparision = TREE.root;
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
    /*
     * ツリーのソートメソッドです。TREE.event.sortで発火します。
     * 
     */
    sort: function () {

        var orderedNodes = [];
        var tansakuzumi = {};
        TREE.comparision = TREE.root;
        while (Object.keys(tansakuzumi).length < Object.keys(TREE.dic).length) {
            //全てのノードが探索済みになるまで


            //まず左に行けるだけ行く
            while (TREE.comparision.leftChild && !tansakuzumi[TREE.comparision.leftChild.prm]) {
                //比較対象に左の子供が居てかつ、tansakuzumiの中にその左の子供が入ってない時は繰り返しで、

                //左に進む
                TREE.comparision = TREE.comparision.leftChild;
            }

            //次に入れられるなら入れる。
            if (!tansakuzumi[TREE.comparision.prm]) {
                //比較対象がtansakuzumiに入って無ければ、

                //探索済みにして、
                tansakuzumi[TREE.comparision.prm] = 1;

                //orderedNodesに追加する。
                orderedNodes.push(TREE.comparision.prm);
            } else //もし無理なら右に一つだけ行く
            if (TREE.comparision.rightChild && !tansakuzumi[TREE.comparision.rightChild.prm]) {
                //比較対象に右の子供が居てかつ、tansakuzumiの中にその右の子供が入ってなかったら(右に行くのは一個だけずつバック)
                TREE.comparision = TREE.comparision.rightChild;

            } else {
                //いずれにもあてはらまらない場合一個上に戻る。
                TREE.comparision = TREE.comparision.parent;
            }







        }
        //ソートされた配列を返す。
        return orderedNodes;

    }
};

/*
 * 乱数を生成する関数です。
 * 
 */

//ランダムにノードシードに整数値を入れる。
function getRandomInt(min, max, amount) {

    for (var i = 0; i < amount; i++) {
        nodeSeeds[i] = Math.floor(Math.random() * (max - min + 1)) + parseInt($("#min").val());//パースイント出来無い
        console.log(nodeSeeds[i]);

    }
}
/*
 * 乱数関数を呼び出し、配列に入れます。
 * 
 */
$("#seedInput").bind("click", function () {
    //if($("#min").val().type() != int)

    getRandomInt($("#min").val(), $("#max").val(), $("#amount").val());
    $("#seedOutput").html("生成結果：");

    //出来た配列をDOMに書き出す。
    for (var i = 0; i < nodeSeeds.length; i++) {
        $("#seedOutput").append(nodeSeeds[i] + ",");
    }
});

/*
 * ノードクラスです。ノードの要素を定義します。
 * 
 */

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
    return "数値:" + this.prm + " 深さ" + this.depth + "　親:" + this.parent.prm + "　子:" + this.leftChild.prm + "," + this.rightChild.prm;
};

/*
 * TREE.event.buildをクリックで発火します。
 * 
 */
//クリックでツリーの初期ビルド
$("#treeOutput").bind("click", function () {
    var startTime =+new Date();
    TREE.event.build(nodeSeeds);
    var finishTime =+new Date();
    var calctime = (startTime-finishTime);
    $("#t-time").html("計算時間" + calctime + "ms");
    
});

/*
 * TREE.event.insertをクリックで発火します。
 * 
 */
$("#insert").bind("click", function () {
    var startTime =+new Date();
    var target = $("#target").val();
    if (TREE.dic[target]) {
        $("#resultMsg").html(target + "は既に存在します。");
        return;
    }
    TREE.event.insert(target);

    //終わったらエラーログを追加。targetが空の場合はハネる。
    if (!target) {
        $("#resultMsg").html("何か数字を入れて下さい。");
    } else {
        $("#resultMsg").html(target + "を挿入しました。");
    }
    var finishTime =+new Date();
    var calctime = (startTime-finishTime);
    $("#t-time").html("計算時間" + calctime + "ms");

});

/*
 * TREE.event.findをクリックで発火します。
 * 
 */
$("#find").bind("click", function () {
    var startTime =+new Date();
    var target = $("#target").val();
    //findは返り値で文字列を持ってくるのでそれをただhtmlに投げる。
    $("#resultMsg").html(TREE.event.find(target));
    var finishTime =+new Date();
    var calctime = (startTime-finishTime);
    $("#t-time").html("計算時間" + calctime + "ms");


});
/*
 * TREE.event.sortをクリックで発火します。
 * 
 */
$("#sort").bind("click", function () {
    var startTime =+new Date();
    var ordered = TREE.event.sort();
    for (var i = 0, len = ordered.length; i < len; i++) {
        $("#sortresult").append(ordered[i] + ",");
    }
    var finishTime =+new Date();
    var calctime = (startTime-finishTime);
    $("#t-time").html("計算時間" + calctime + "ms");


});

/*
 * 以下参考用探索関数など
 * 
 */


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
    aftersort = Object.keys(TREE.dic);
    for (i = 0; i < aftersort.length - 1; i++)
    {
        for (j = 0; j < aftersort.length - i - 1; j++)
        {
            if (parseInt(aftersort[j]) > parseInt(aftersort[j + 1]))
            {
                n = parseInt(aftersort[j]);
                aftersort[j] = parseInt(aftersort[j + 1]);
                aftersort[j + 1] = n;
            }
        }
    }


}
//探索比較用関数を呼び出す。
$("#shougou").bind("click", function () {
    var startTime =+new Date();
    var target = $("#s_target").val();
    

    $("#sMsg").html(shougou(target));
    
    var finishTime =+new Date();
    var calctime = (startTime-finishTime);
    $("#s-time").html("計算時間" + calctime + "ms");

});

//バブルソート関数を呼び出す。
$("#bsort").bind("click", function () {
    var startTime =+new Date();
    bubbleSort();
    for (var i = 0; i < aftersort.length; i++) {
        $("#ssort").append(aftersort[i] + ",");
    }
    var finishTime =+new Date();
    var calctime = (startTime-finishTime);
    $("#s-time").html("計算時間" + calctime + "ms");
});







/*
 * 以下はやりたかったけど出来なかったものの遺跡。
 */
//ツリーをグラフに書き出す。
$("#makegraf").bind("click", function () {
    makeGraf();
});
//オブジェクトをJSONにする。
function makeGraf() {
    //さあ鬼の書き出しだ。
    var jsonTREE = {};
    testNode = clone(TREE.root.rightChild);
    testNode.prm = "testtest";


    A = {
        rootnode: {
            'prm': 2,
            'rightChild': node3 = {
            },
            'leftChild': node1 = {
            }
        }

    };





}