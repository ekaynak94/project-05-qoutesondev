(function($) {
  $('#another-quote').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'get',
      url:
        qod_vars.rest_url +
        'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      data: {
        comment_status: 'closed'
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', qod_vars.wpapi_nonce);
      }
    }).done(function(response) {
      console.log(response);
      changeContent(newQuoteMarkup(response[0]));
    });
  });

  function changeContent(content) {
    $('article').removeClass($('article').attr('id'));
    $('article').addClass(content.id);
    $('article').attr('id', content.id);
    $('.entry-content').html(content.text);
    $('.entry-info').html(content.author + content.link);
  }
  function newQuoteMarkup(quote) {
    return {
      id: `post-${quote.id}`,
      text: quote.content.rendered,
      author: `<h2 class='author-name'>&mdash;${quote.title.rendered}</h2>`,
      link: quote._qod_quote_source_url
        ? `<span class='author-source'>, <a class='author-source'
      href=${quote._qod_quote_source_url}
      >${quote._qod_quote_source}</a></span>`
        : quote._qod_quote_source
        ? `<span class='author-source'>, ${quote._qod_quote_source}</span>`
        : ''
    };
  }
})(jQuery);
