/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload =function(){
        var getText = document.getElementById('text');
        var getGirl = document.getElementById('girl');
        
        getGirl.style.width="150px";
        getGirl.style.bottom="-15px";
        };
$(document).ready(function(){
      $(".delete").click(function(){
      flag = confirm("保存された作業内容を削除します。よろしいですか？");
      if(flag === true){
            $.clearStorage();
            alert("完了");
      }
      console.log(flag);
  });
    
});