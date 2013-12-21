// 空白のテンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: このアプリケーションは新しく起動しました。ここでアプリケーションを
                // 初期化します。
            } else {
                // TODO: このアプリケーションは中断状態から再度アクティブ化されました。
                // ここでアプリケーションの状態を復元します。
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: このアプリケーションは中断しようとしています。ここで中断中に
        // 維持する必要のある状態を保存します。中断中に自動的に保存され、
        // 復元される WinJS.Application.sessionState オブジェクトを使用
        // できます。アプリケーションを中断する前に非同期操作を完了する
        // 必要がある場合は、args.setPromise() を呼び出して
        // ください。
    };

    app.start();
    $(function () {
       

        
        var count=0;
        var AUDIO_LIST = {
            //1: new Audio("audio/b_1." + "mp3")
            //"se01": new Audio("audio/se01." + AUDIO_EXT),
            //"se02": new Audio("audio/se02." + AUDIO_EXT),
        };
        //スタートボタン
        $("#startBtn").click(function () {
            $("#level").css("display", "none");
            $("#startBtn").css("display", "none");
            //$("#panelcontent").fadeIn("slow");
            $("#replayBtn").fadeIn("slow");
            $("#player_field").fadeIn("slow");
            $("#player_add").fadeIn("slow");
            //音源作成
            //ボタン関連作成
    
            var levelCount = $("#level").val();

            //オーディオ読み込み
            var num = levelCount * 3;
            var panel_array = new Array();
            console.log("num:", num);

            String.prototype.lpad = function (padString, length) {
                var str = this;
                while (str.length < length)
                    str = padString + str;
                return str;
            }

            for (var i = 0; i < num; i++) {
                //
                var num_str = String(i);
                var audio_num = num_str.lpad("0", 3);
                console.log(audio_num);
                AUDIO_LIST[i] = new Audio("audio/" + audio_num + ".wav");
               
            }

            
          
          
            //ボタンの並び替え
            for (var j = 0; j < levelCount * 6; j++) {
                if (j >= (levelCount * 6) / 2) {

                    var rest_number = j % (levelCount * 3);
                    panel_array.push(rest_number);
                } else {
                    panel_array.push(j);
                }
            }
                
            //パネルをシャッフルする
            panel_array.shuffle();

            if (levelCount == 2) {
                $("#panelcontent").css("top","200px");
            } else if(levelCount == 4) {
                $("#panelcontent").css("top", "100px");
            }
            //レベルに応じてパネルの数を変える
            for (var i = 0; i < 6*levelCount; i++) {

                if (i > 1 && i % 6 == 0) {
                    $("#panelcontent").append('<br/>');
                }
                var id_string = new String();
                id_string = "btn" + i;
                $("#panelcontent").append('<input type="button" id="' + id_string + '" class="pushBtn"  value="" style="font-size:50px; background-color:#d64f2a;"/>');
                var number = new String();
                number += "#btn";
                number += i;
                
                //$(number).val(panel_array[i]);
                $(number).attr("name", panel_array[i]);
            }

            $("#panelcontent").fadeIn("slow");
            //プレイヤーの色を付ける
            $("#player1").css("background-color", "#9ca69d");
            
            var first_flag = 0;
            var tmp_value;
            var tmp_id;
            var ok_count = 0;
            
            var playerNum = 1;

            $(".pushBtn").click(function () {

                console.log("sound", first_flag);
                console.log("slice:", $(this).attr("name"));
               
                
                var btn_name = $(this).attr("name");
                //プレイヤー判定
                //振出フラグ
                var changeFlag = 0;


                //同時押し判定
                if (tmp_id == $(this).attr("id")) {
                    console.log("same");;
                } else {
                    AUDIO_LIST[btn_name].play();
                    AUDIO_LIST[btn_name] = new Audio(AUDIO_LIST[btn_name].src);
                    //二回目
                    if (first_flag == 1) {
                        //神経衰弱一致
                        //console.log($(this).attr("name"));
                        //console.log(tmp_value);
                        //プレイヤー交代
                        playerNum += 1; 
                        if ((playerNum-1) == member_count) {
                            //もとに戻す
                            console.log("振り出し");
                            playerNum = 1;
                            changeFlag = 1;
                            $("#player" + member_count).css("background-color", "transparent");
                            $("#player1").css("background-color", "#9ca69d");

                        } else {
                            console.log("Player:", playerNum);

                            $("#player"+(playerNum-1)).css("background-color", "transparent");
                            $("#player" + playerNum).css("background-color", "#9ca69d");

                        }
                      
                      
                        if (tmp_value == $(this).attr("name")) {
                            console.log("OK");
                            console.log(tmp_id);
                            var tmp_number = new String();
                            tmp_number += "#";
                            tmp_number += tmp_id;
                            console.log("tmp_number ", tmp_number);
                            //playerのカウントを上げる
                            //得点を入れる
                            //テキスト取得
                            if (changeFlag == 1) {
                              
                                console.log("#Lastplayer_count:" + member_count);
                                var playScore = parseInt($("#player_count" + member_count).text().slice(6));
                                console.log("Score:", playScore)
                                playScore += 1;
                                $("#player_count" + member_count).text("COUNT:" + playScore);
                                changeFlag == 0;

                            } else {

                                console.log("#player_count:" + (playerNum - 1));

                                var playScore = parseInt($("#player_count" + (playerNum - 1)).text().slice(6));
                                console.log("Score:", playScore)
                                playScore += 1;
                                $("#player_count" + (playerNum - 1)).text("COUNT:" + playScore);

                            }
                           
                            $(tmp_number).css("visibility", "hidden");
                            $(this).css("visibility", "hidden");
                            ok_count += 1;
                            console.log("ok_count :", ok_count);

                            //全部クリアー

                            if (ok_count == levelCount * 3) {
                                console.log("CLEAR!!");
                              
                                //winner関連を出力
                                //全プレイヤーの得点を出力
                                var maxtmp;

                                

                                //一人プレイ
                                if (member_count == 1) {
                                    $("#winnerplayer").append("Player" + member_count);
                                    //音出力
                                    var finishwav = new Audio("audio/finish.wav");
                                    finishwav.play();
                                } else {

                                    for (var i = 1; i < member_count + 1; i++) {
                                        var finalScore = parseInt($("#player_count" + i).text().slice(6));
                                        console.log("FINAL:" + i + ":", finalScore);
                                        if (i > 1 && finalScore > maxtmp) {
                                            //上書き
                                            console.log("finalscore:", finalScore);
                                            //この時のプレイヤーnumberを保持
                                            //winnerarray.push(i);
                                            //$("#winnerplayer").append("Player" + i);
                                            maxtmp = finalScore;
                                        } else if (i == 1) {
                                            //初回
                                            console.log("初回");
                                            maxtmp = finalScore;

                                        } else {
                                            console.log("超えない");
                                        }
                                    }

                                    //勝者確定
                                    
                                    for (var j = 1; j < member_count + 1; j++) {
                                        var playermax = parseInt($("#player_count" + j).text().slice(6));
                                        if (maxtmp == playermax) {
                                            $("#winnerplayer").append("【Player" + j + "】" + "<br />");
                                        }
                                    }
                                }


                                $("#winnercontent").fadeIn("slow");
                                //音出力
                                var finishwav = new Audio("audio/finish.wav");
                                finishwav.play();

                            }


                        } else {
                            console.log("NO");
                            //$("#" + tmp_id).css("background-color", "transparent");
                            //色をもとに戻す
                            $(this).css("background-color", "#d64f2a");
                            $("#" + tmp_id).css("background-color", "#d64f2a");
                        }
                        //もとに戻す

                        first_flag = 0;
                        tmp_value = null;
                        tmp_id = null;


                        //初回
                    } else {
                        tmp_value = $(this).attr("name");
                        $(this).css("background-color", "#f2385a");
                        tmp_id = $(this).attr("id");
                        first_flag += 1;

                    }
                }
            });
            //タイマー
        });

      

        $("#replayBtn").click(function () {
            location.reload();
        });


    });//function
})();
Array.prototype.shuffle = function () {
    var i = this.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
};