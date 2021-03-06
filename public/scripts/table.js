function populateTable() {
    'use strict';

    var SPACES = {
        '0': 16,
        '3': 10,
        '11': 10,
        '89': [18, 1]
    };

    function getTagsInfo() {
        var tags = getTags();

        var documentFragment = _.reduce(tags, function (fragment, tagName) {
            var node = document.createElement(tagName);
            fragment.appendChild(node);
            return fragment;
        }, document.createDocumentFragment());

        var elementsNode = document.getElementById('elements');
        elementsNode.appendChild(documentFragment);

        var tagsInfo = _.map(elementsNode.children, function (child) {
            var style = window.getComputedStyle(child);
            return _.reduce(style, function (res, value, key, curStyle) {
                if (!_.startsWith(value, '-')) {
                    res[value] = curStyle[value];
                }
                return res;
            }, {name: child.tagName.toLowerCase()});
        });

        elementsNode.parentElement.removeChild(elementsNode);

        return tagsInfo;
    }

    function addSpace(fragment, space) {
        var spaceNode = document.createElement('div');
        spaceNode.className = 'space';
        spaceNode.style.width = (50 * space) + 'px'
        fragment.appendChild(spaceNode);
    }

    function spanify(ch) {
        return '<span class="char char_' + ch + '">' + ch + '</span>';
    }

    function spanifyYGLF(text) {
        return text.replace(/[yglf]/g, spanify);
    }

    function getTagTitleNode(tag) {
        var tagTitleNode = document.createElement('div');
        tagTitleNode.innerHTML = spanifyYGLF(tag.name);
        tagTitleNode.className = 'title';
        return tagTitleNode;
    }

    function getTagInfoNode(tag) {
        var tagInfoNode = document.createElement('div');
        tagInfoNode.className = 'info';
        tagInfoNode.innerHTML = _.reduce(tag, function (res, value, key) {
            if (key !== 'name') {
                res += key + ': ' + value + '<br>';
            }
            return res;
        }, '');
        return tagInfoNode;
    }

    function getTagContentNode(tag) {
        var tagContentNode = document.createElement('a');
        tagContentNode.className = 'content';
        tagContentNode.appendChild(getTagTitleNode(tag));
        tagContentNode.appendChild(getTagInfoNode(tag));
        tagContentNode.href = 'https://developer.mozilla.org/en/docs/Web/HTML/Element/' + tag.name;
        tagContentNode.target = '_blank';
        return tagContentNode;
    }

    function getTagNode(tag, index) {
        var tagNode = document.createElement('div');
        tagNode.className = 'tag tag-display-' + tag.display;
        tagNode.dataset.index = index;
        tagNode.appendChild(getTagContentNode(tag));
        return tagNode;
    }

    function consoleDoge() {
        var dogeUrl = window.location.href.replace('index.html', 'images/doge.jpg');
        console.log('%c  ', 'background: url(' + dogeUrl + ') no-repeat; font-size: 500px');
    }

    var tableNode = document.getElementById('table');
    var tagsInfo = getTagsInfo();
    var documentFragment = _.reduce(tagsInfo, function (fragment, tag, index) {
        fragment.appendChild(getTagNode(tag, index));
        var spaces = SPACES[index];
        if (spaces) {
            if (_.isArray(spaces)) {
                _.forEach(spaces, function (space) {
                    addSpace(fragment, space);
                });
            } else {
                addSpace(fragment, spaces);
            }

        }
        return fragment;
    }, document.createDocumentFragment());
    tableNode.appendChild(documentFragment);
    consoleDoge();


}