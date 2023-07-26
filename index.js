const livePreviewFrame = document.getElementById('live-preview');
const htmlEditor = document.getElementById('html');
const cssEditor = document.getElementById('css');
const jsEditor = document.getElementById('js');

function initializeLivePreview() {
    livePreviewFrame.contentWindow.document.body.innerHTML = '';
    const styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'live-preview-style');
    livePreviewFrame.contentWindow.document.head.appendChild(styleElement);

    const pagedJsScript = document.createElement('script');
    pagedJsScript.src = 'https://unpkg.com/pagedjs/dist/paged.legacy.polyfill.js';
    livePreviewFrame.contentWindow.document.head.appendChild(pagedJsScript);
}

function updateLiveHTMLPreview(codeEditors) {
    livePreviewFrame.contentWindow.document.body.innerHTML = codeEditors.html.getValue();
}

function updateLiveCSSPreview(codeEditors) {
    const styleElement = livePreviewFrame.contentWindow.document.getElementById('live-preview-style');
    styleElement.innerHTML = codeEditors.css.getValue();
}

function updateLiveJSPreview(codeEditors) {
    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = codeEditors.js.getValue();
    livePreviewFrame.contentWindow.document.body.appendChild(scriptElement);
}

function initializeCodeEditors() {
    function getDefaultOptions(object) {
        const defaultOptions = {
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            theme: 'panda-syntax'
        };
        if (object) {
            const keys = Object.keys(object);
            for (const key of keys) {
                defaultOptions[key] = object[key];
            }
        }
        return defaultOptions;
    }

    const codeEditors = {
        html: CodeMirror(htmlEditor, getDefaultOptions({
            mode: 'text/html',
            value: '',
        })),
        css: CodeMirror(cssEditor, getDefaultOptions({
            mode: 'css',
            value: '',
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
            hintOptions: {
                completeSingle: false,
                closeOnUnfocus: false
            }
        })),
        js: CodeMirror(jsEditor, getDefaultOptions({
            mode: 'javascript',
            value: ''
        })),
    };
    return codeEditors;
}

function setupLivePreviewStudio() {
    const codeEditors = initializeCodeEditors();

    CodeMirror.on(codeEditors.html, 'change', () => {
        updateLiveHTMLPreview(codeEditors);
    });

    CodeMirror.on(codeEditors.css, 'change', () => {
        updateLiveCSSPreview(codeEditors);
    });

    CodeMirror.on(codeEditors.js, 'change', () => {
        updateLiveJSPreview(codeEditors);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLivePreview();
    setupLivePreviewStudio();
});