function escapeHtml(text) {
    return text.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}

const filename = new URLSearchParams(window.location.search).get('filename');

if (filename) {
    // prevent auto-play
    document.querySelector("video").autoplay = false;
    document.querySelector("video").muted = true;

    // display "Downloading..." message
    document.body.insertAdjacentHTML('afterbegin', `<div class="downloading-wrapper"><p class="downloading-text">Downloading...</p></div>`);

    // download file
    const src = document.querySelector("source").src;
    document.body.insertAdjacentHTML('beforeend', `<a class='download-node' href='${escapeHtml(src)}' download='${escapeHtml(filename)}'></a>`);
    document.querySelector('.download-node').click();

    // close window after download prompt has likely opened
    setTimeout(() => window.close(), 400);
}
