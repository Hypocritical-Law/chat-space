$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content} ` : '';
    var img = message.image ? `<img src='${ message.image }'> ` : '';
    var html = `<div class = "message" data-message-id=${message.id}>
                  <div class = "upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class = "upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                      ${ message.content}
                    </p>
                    ${img}
                  </div>
               </div>`;
    return html;
  }

//new_message
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
     })
    .done(function(data){
      if ( data.content != undefined ){
       var html = buildHTML(data);
       $('.main-messages').append(html);
       $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight}, 'fast');      
       $('form')[0].reset();
       }
       
       else{
         alert("メッセージを入力して下さい")
       }
       $('.form__submit').prop('disabled', false);
    })
  
     .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
     })   
     

  })

  var reloadMessages = function() {

    
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(date) {
      if (date.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(date, function(i, date) {
          insertHTML += buildHTML(date)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main-messages').append(insertHTML);
        $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight}, 'fast');
      }
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 3000);
  }
});
