(function($) {
  // Event listener for quote button
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
      changeContent(newQuoteMarkup(response[0]));
    });
  });

  function changeContent(content) {
    //Changes the markup for the page to display a new quote
    $('article').removeClass($('article').attr('id'));
    $('article').addClass(content.id);
    $('article').attr('id', content.id);
    $('.entry-content').html(content.text);
    $('.entry-info').html(content.author + content.link);
  }
  function newQuoteMarkup(quote) {
    //Returns an object that has the markup for the new quote and its content
    return {
      id: `post-${quote.id}`,
      text: quote.content.rendered,
      author: `<h2 class='author-name'>&mdash;${quote.title.rendered}</h2>`,
      link:
        quote._qod_quote_source_url && quote._qod_quote_source
          ? `<span class='author-source'>, <a class='author-source'
      href=${quote._qod_quote_source_url}
      >${quote._qod_quote_source}</a></span>`
          : quote._qod_quote_source
          ? `<span class='author-source'>, ${quote._qod_quote_source}</span>`
          : ''
    };
  }
  //Event listener for quote submit form
  $('#submit-form').on('submit', function(event) {
    event.preventDefault();

    const info = {
      title: $('#quote-author').val(),
      content: $('#quote-text').val(),
      _qod_quote_source: $('#quote-source').val(),
      _qod_quote_source_url: $('#quote-url').val()
    };

    $.ajax({
      method: 'post',
      url: qod_vars.rest_url + 'wp/v2/posts/',
      data: info,
      success: function() {},
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', qod_vars.wpapi_nonce);
      }
    })
      .done(function() {
        $('.entry-content').html(
          '<p>Thanks, your quote submission was recieved!</p>'
        );
      })
      .fail(function() {
        $('.entry-content').html(
          '<p>Sorry, your quote submission was not recieved.Please try again.</p>'
        );
      });
  });
})(jQuery);
