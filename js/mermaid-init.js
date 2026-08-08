(function () {
    var blocks = document.querySelectorAll(
        'pre code[data-lang="mermaid"], pre code.language-mermaid'
    );
    if (blocks.length === 0) return;

    var meta = document.querySelector('meta[name="mermaid-src"]');
    if (!meta) return;

    blocks.forEach(function (code) {
        var pre = code.parentElement;
        var container = document.createElement('div');
        container.className = 'mermaid';
        container.textContent = code.textContent;
        pre.replaceWith(container);
    });

    function currentTheme() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'default';
    }

    function renderAll() {
        if (!window.mermaid) return;
        var nodes = document.querySelectorAll('.mermaid');
        nodes.forEach(function (node) {
            if (node.dataset.mermaidSource === undefined) {
                node.dataset.mermaidSource = node.textContent;
            } else {
                node.removeAttribute('data-processed');
                node.innerHTML = node.dataset.mermaidSource;
            }
        });
        window.mermaid.initialize({
            startOnLoad: false,
            theme: currentTheme(),
            securityLevel: 'strict'
        });
        window.mermaid.run({ nodes: nodes });
    }

    var script = document.createElement('script');
    script.src = meta.content;
    script.onload = function () {
        renderAll();

        var observer = new MutationObserver(function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                if (mutations[i].attributeName === 'class') {
                    renderAll();
                    return;
                }
            }
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    };
    document.head.appendChild(script);
})();
