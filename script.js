function getTextContent(el) {
    return document.querySelector(el) ? document.querySelector(el).textContent : '';
}

function escapeHtml(text) {
    return text.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}

/* build filename */
let filename = getTextContent(".jp-title");
const username = window.location.pathname.match(/\/u\/([^/]+)\//)[1]; // find username based on URL itself

filename = filename.replace(/^[\s_]*(.+?)[\s_]*$/, '$1'); // on mobile - random strings of `_ _` are getting added at the beginning and end of the title

if ((filename + username).length > 150) {
    filename = filename.slice(0, 147 - username.length) + '...'; // trim long filenames
}
if (username) {
    filename += ` by ${username}`;
}
filename += '.m4a';

/* create download button */
// listen for src added to jPlayer to enable button
const observer = new MutationObserver((_, self) => {
    const src = document.querySelector("#jp_audio_0").src;
    if (src) {
        const downloadNode = `<div class='jp-download'><a target="_blank" href='${escapeHtml(src)}?filename=${escapeHtml(encodeURIComponent(filename))}'><span class='fa fa-download'></span>Download</a><div>`;
        document.querySelector('.jp-type-single').insertAdjacentHTML('beforeend', downloadNode);

        self.disconnect();
    }
});
observer.observe(document, {
  childList: true,
  subtree: true,
});
