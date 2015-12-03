
var TREE = TREE || {
};
//グローバル変数を使いたくない。が、無理なものもあるんだ…
var nodeSeeds = [];
TREE.height = "0";
//生成後は個々のプロパティを維持したままのnodeオブジェクトが格納される。呼び出す時は、nodes[i]でOKだ。
TREE.nodes = [];
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
        //ルートはnode[prm]になってない！！！
        eval("node" + seeds[0] + "= rootNode");
        //ルートが入ったことをTREE.dicに宣言しとく。
        TREE.dic[seeds[0]] =1;



        //seeds[0]は根ノードなので、それ以降でインサートを行っていく繰り返し。
        for (var i = 1, len = seeds.length; i < len; i++) {
            TREE.event.insert(seeds[i]);
        }



        /*seedsは実際に演算するまでseedのままでいいので以下をコメントアウト
         for(var i=0,len = seeds.length;  i < len; i++){
         // var node"i"  = new Node(seeds[i]); ってのがしたい！
         
         eval("var node" + i + "=" + "new Node(seeds[" + i +"]);");   //ローカル変数としてインスタンスを作成する。node0,node1,node2~
         var thisnode = eval("node" + i);    //evalでnode i を変数にする。
         TREE.nodes.push(thisnode);   //TREE.nodeの配列の最後尾に打ち込む
         if(i === 0){    //i=0すなわち、node0を作ってるループであれば、そのnode+iのrootプロパティをtrueにする。
         thisnode.root = true;
         }
         TREE.event.insert(thisnode);    //各ノードでツリーへの挿入を実行させる。ここもevalで処理。
         console.log(TREE.nodes[i]);
         
         }*/

        //ツリー生成が完了したらDOMに書き込む。
        $("#errMsg").html("ツリーの生成が完了しました。下記から操作をしてみてください。");



    },
    //seedの挿入はこちらを実行する。(一つのシードごとに呼び直すのでワンループの処理でおｋ)ツリーをビルドするときも、新規ノードを挿入する時もまたしかりである。
    insert: function (seed) {

        //はじめに比べるのは必ず根ノードであるので、グローバル変数comparisionを宣言し(while内で弄りたいのでしゃーない)、初期値は根にする。
        TREE.comparision = eval("node" + nodeSeeds[0]);

        //グローバル変数としてこのノードを宣言する。名前は安直にnode[prm] (ex,node1, node114514)
        if (!TREE.dic[seed]) {
            TREE.dic[seed] = 1;
            eval("node" + seed + "= new Node(seed)");
        } else {
            //既に同じノードがある場合は終了。
            return;
        }

        //連続して比較する。葉ノードで無い時にループ
        while (eval("node" + seed + ".leaf") === false) {

            //深さカウント whileを通過する度に１つずつ出していく。
            eval("node" + seed + ".depth" + "=" + "node" + seed + ".depth +1");



            //seedが比較対象より大きいまたは等しい時、右に持っていく
            if (TREE.comparision.prm < seed) {
                alert("おおきいよ！" + seed);

                //比較対象に右の子供がいる場合
                if (eval("node" + TREE.comparision.prm + ".rightChild")) {
                    //次の比較対象をそいつにする。
                    alert("次の比較対象はこいつだ" + TREE.comparision.rightChild.prm);
                    
                    
                    TREE.comparision = TREE.comparision.rightChild;
                } else {
                    //比較対象の下にこのノードが入るわけなので、比較対象の.leaf属性をfaleseにする。
                    //eval("node" + TREE.comparision.prm +".leaf = false");
                    //右の子供がいない場合,比較対象のグローバル変数node[prm]の右の子供を、node[seed]とする。
                    eval("node" + TREE.comparision.prm + ".rightChild = node" + seed);
                    //そんで、node[seed]の親をもともとの比較対象のノードにする。
                    eval("node" + seed + ".parent" + "= node" + TREE.comparision.prm);
                    //右の子供がいなかったということはすなわち、このノードは葉ノードになったということだね。これでループを抜ける。
                    eval("node" + seed + ".leaf" + "= true");
                }
            } else if (TREE.comparision.prm > seed) {//seedが比較対象より小さい時

                alert("小さいよ" + seed);
                //比較対象に左の子供がいる場合
                if (eval("node" + TREE.comparision.prm + ".leftChild")) {
                    //次の比較対象はそいつにする。
                    alert("次の比較対象はこいつだ" + TREE.comparision.leftChild.prm);
                    TREE.comparision = TREE.comparision.leftChild;
                } else {
                    //比較対象の下にこのノードが入るわけなので、比較対象の.leaf属性をfaleseにする。
                    //eval("node" + TREE.comparision.prm +".leaf = false");
                    //左の子供が居ない場合、比較対象のnode[prm]の左の子供はnode[seed]になる。
                    eval("node" + TREE.comparision.prm + ".leftChild = node" + seed);
                    //そんで、node[seed]の親を比較対象のノードにする。
                    eval("node" + seed + ".parent" + "= node" + TREE.comparision.prm);
                    //比較対象の左の子供がいなかったということはすなわち、このノードは葉ノードになったということだね。これでループを抜ける。
                    eval("node" + seed + ".leaf" + "= true");
                }


            }
        }

        //一通り完了したら、cosole.logしとく。
        console.log("node" + seed +":OK");
    },
    find: function () {


    },
    sort: function () {

    }

};



//ランダムにノードシードに整数値を入れるよ。
function getRandomInt(min, max, amount) {
    if ((max - min) < amount) {
        alert("生成するノードの数は最小値〜最大値に収まるようにして下さい。");
    } else {
        for (var i = 0; i < amount; i++) {
            nodeSeeds[i] = Math.floor(Math.random() * (max - min + 1)) + parseInt($("#min").val());//パースイント出来無い
            console.log(nodeSeeds[i]);
        }
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
    return "数値:" + this.prm + "　親:" + this.parent.prm + "　子:" + this.leftChild.prm + "," + this.rightChild.prm;
};


//クリックでツリーの初期ビルド
$("#treeOutput").bind("click", function () {
    TREE.event.build(nodeSeeds);
});

//このノードを挿入するで後から挿入出来る
$("#insert").bind("click", function(){
   var target =$("#target").val();
   if(TREE.dic[target]){
       $("#resultMsg").html(target +"は既に存在します。");
       return;
   }
   TREE.event.insert(target);
   //終わったらエラーログを追加。
   $("#resultMsg").html(target + "を挿入しました。");
   
});