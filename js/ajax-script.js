(function($) {
  $('#another-quote').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'get',
      url: qod_vars.rest_url + 'wp/v2/posts/',
      data: {
        comment_status: 'closed'
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', qod_vars.wpapi_nonce);
      }
    }).done(function(response) {
      console.log(response);
      randomPost = response[Math.floor(Math.random() * response.length)];
      changePost(randomPost);
    });
  });

  function changePost(quote) {
    newId = `post-${quote.id}`;
    $('article').removeClass($('article').attr('id'));
    $('article').addClass(newId);
    $('article').attr('id', newId);
    $('.entry-content').html(quote.content.rendered);
    $('.entry-info').html(
      `<h2 class='author-name'>${quote.title.rendered}</h2>`
    );
    if (quote._qod_quote_source_url && quote._qod_quote_source) {
      $('.entry-info')
        .append(`<span class='author-source'>, </span><a target='_blank' class='author-source'
            href=${quote._qod_quote_source_url}
            >${quote._qod_quote_source}</a>`);
    }
  }
})(jQuery);
