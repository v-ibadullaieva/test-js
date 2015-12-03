function removeClass(el, cls) {
    var classes = el.className.split(' ');
    var index = classes.indexOf(cls);
    if(~index) { classes.splice(index, 1) }
    el.className = classes.join(' ');
}

function addClass(el, cls) {
    var classes = el.className.split(' ');
    var index = classes.indexOf(cls);
    if(~index) return;
    classes.push(cls);
    el.className = classes.join(' ');
}

function Router(routes, opts) {
    function getPath(window) {
        return window.location.hash.slice(1);
    }
    function callHandler(path) {
        var fn = routes[path];
        if (fn) { 
            fn();
        } else {
            window.location.hash = '#' + opts.default;
        }
    }
    return function() {
        window.addEventListener('hashchange', function(e) {
            callHandler(getPath(window));
        })    
        callHandler(getPath(window));
    };
}

+function(window, document) {
    var router = Router({
        '/general': selectGeneral,
        '/additional': selectAdditional,
        '/confirmation': selectConfirmation,
    }, { default: '/general' });
    router();

    function selectGeneral() { selectTab('general') }
    function selectAdditional() { selectTab('additional') }
    function selectConfirmation() { selectTab('confirmation') }

    function selectTab(tabname) {
        var tabs = document.querySelectorAll('.tab-select');
        var panels = document.querySelectorAll('.tab-panel');
        for (var i = panels.length - 1; i >= 0; i--) {
            removeClass(panels[i], 'active');
        };
        for (var i = tabs.length - 1; i >= 0; i--) {
            var tab = tabs[i];
            removeClass(tab, 'active');
            if (tab.getAttribute("data-name") == tabname) {
                var selected = tab;
                var id = selected.getAttribute("data-target");
                var panel = document.getElementById(id);
                if (panel) addClass(panel, 'active');
                addClass(selected, 'active');
            }
        };
    }
}(window, document);
