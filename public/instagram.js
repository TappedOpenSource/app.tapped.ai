function instagramFix() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const str = navigator.userAgent;
  const instagram = str.indexOf('Instagram');
  const facebook = str.indexOf('FB');

  if (/android/i.test(userAgent) && (instagram != -1 || facebook != -1) ) {
    document.write('<a target="_blank" href="https://tapped.ai" download id="open-browser-url">Open in Browser</a>');
    window.stop();
    const input = document.getElementById('open-browser-url');
    if (input) {
      input.click();
    }
  }
}

instagramFix();
