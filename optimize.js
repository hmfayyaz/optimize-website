var src, srcset, ks_windowWidth, ks_windowHeight, cls_css, flag = 1;

function ks_init() {
    console.log('ks_init calls');
    cls_css = document.querySelectorAll('.cls_css');
    cls_css.forEach(function (_0x193a93) {
        _0x193a93.remove();
    });
    inlineCriticalCss();
    lazyLoadCss();
    lazyLoadStyle();
    lazyLoadImg();
    lazyLoadBackground();
    lazyLoadPoster();
    lazyLoadVideo();
    lazyLoadIframe();
    preloadFonts();
    if (flag) {
        flag = 0;
        load_all_js();
    }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function lazyLoadImg() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                src = ks_windowWidth < 600 ?
                    (img.dataset.srcMobile !== undefined ? img.dataset.srcMobile : img.dataset.src) :
                    (img.dataset.src !== undefined ? img.dataset.src : img.src);
                srcset = img.hasAttribute('data-srcset') ? img.getAttribute('data-srcset') : "";
                if (src) img.src = src;
                if (srcset) img.srcset = srcset;
                img.classList.remove('lazyload');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: "0px 0px 200px 0px" });

    lazyImages.forEach(img => observer.observe(img));
}

function lazyLoadBackground() {
    const lazyBackgrounds = document.querySelectorAll('.lazybg');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const lazybg = ks_windowWidth < 600 ?
                    (element.dataset.bgMobile !== undefined ? element.dataset.bgMobile : element.dataset.bg) :
                    (element.dataset.bg !== undefined ? element.dataset.bg : element.style.backgroundImage);
                if (lazybg) element.style.backgroundImage = `url(${lazybg})`;
                element.classList.remove('lazyload');
                observer.unobserve(element);
            }
        });
    }, { rootMargin: "0px 0px 200px 0px" });

    lazyBackgrounds.forEach(bg => observer.observe(bg));
}

function lazyLoadCss() {
    const lazyCss = document.querySelectorAll('link[data-href]');
    lazyCss.forEach(link => {
        const newLink = document.createElement('link');
        newLink.href = link.getAttribute('data-href');
        newLink.rel = 'stylesheet';
        newLink.media = 'print';
        newLink.onload = function () { this.media = 'all'; };
        document.head.appendChild(newLink);
        link.remove();
    });
}

function lazyLoadStyle() {
    const lazyStyles = document.querySelectorAll('style[data-style]');
    lazyStyles.forEach(style => {
        const newStyle = document.createElement('style');
        newStyle.innerHTML = style.innerHTML;
        document.head.appendChild(newStyle);
        style.remove();
    });
}

function lazyLoadPoster() {
    const lazyPosters = document.querySelectorAll('video[data-poster]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.poster) {
                    video.poster = video.dataset.poster;
                    delete video.dataset.poster;
                }
                observer.unobserve(video);
            }
        });
    }, { rootMargin: "0px 0px 200px 0px" });

    lazyPosters.forEach(video => observer.observe(video));
}

function lazyLoadVideo() {
    const lazyVideos = document.querySelectorAll('video[data-src]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                src = ks_windowWidth < 600 ?
                    (video.dataset.srcMobile !== undefined ? video.dataset.srcMobile : video.dataset.src) :
                    (video.dataset.src !== undefined ? video.dataset.src : video.src);
                if (src) video.src = src;
                video.classList.remove('lazyload');
                observer.unobserve(video);
            }
        });
    }, { rootMargin: "0px 0px 200px 0px" });

    lazyVideos.forEach(video => observer.observe(video));
}

function lazyLoadIframe() {
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    delete iframe.dataset.src;
                }
                observer.unobserve(iframe);
            }
        });
    }, { rootMargin: "0px 0px 200px 0px" });

    lazyIframes.forEach(iframe => observer.observe(iframe));
}

function load_all_js() {
    const jsLinks = document.querySelectorAll('script[data-src]');
    jsLinks.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.getAttribute('data-src');
        newScript.defer = true;
        document.body.appendChild(newScript);
        script.remove();
    });
}

function preloadFonts() {
    const fontLinks = document.querySelectorAll('link[rel="preload"][as="font"]');
    fontLinks.forEach(link => {
        const newLink = document.createElement('link');
        newLink.href = link.href;
        newLink.rel = 'stylesheet';
        document.head.appendChild(newLink);
        link.remove();
    });
}

function inlineCriticalCss() {
    const criticalCss = document.querySelector('style[data-critical]');
    if (criticalCss) {
        const newStyle = document.createElement('style');
        newStyle.innerHTML = criticalCss.innerHTML;
        document.head.appendChild(newStyle);
        criticalCss.remove();
    }
}

document.addEventListener('DOMContentLoaded', ks_init);

window.addEventListener('load', () => {
    ks_windowWidth = window.innerWidth;
    ks_windowHeight = window.innerHeight;
    if (ks_windowWidth > 1024) {
        document.querySelectorAll('img[data-src]').forEach(img => {
            if (img.dataset.srcDesktop) {
                img.src = img.dataset.srcDesktop;
                delete img.dataset.srcDesktop;
            }
        });
        document.querySelectorAll('.lazybg').forEach(bg => {
            if (bg.dataset.bgDesktop) {
                bg.style.backgroundImage = `url(${bg.dataset.bgDesktop})`;
                delete bg.dataset.bgDesktop;
            }
        });
    }
});
