import React from 'react';
import ReactDOM from 'react-dom';

function copyStyles(sourceDoc, targetDoc) {
    Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
        if (styleSheet.cssRules) { // for <style> elements
            const newStyleEl = sourceDoc.createElement('style');

            Array.from(styleSheet.cssRules).forEach(cssRule => {
                // write the text of each rule into the body of the style element
                newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
            });

            targetDoc.head.appendChild(newStyleEl);
        } else if (styleSheet.href) { // for <link> elements loading CSS from a URL
            const newLinkEl = sourceDoc.createElement('link');

            newLinkEl.rel = 'stylesheet';
            newLinkEl.href = styleSheet.href;
            targetDoc.head.appendChild(newLinkEl);
        }
    });
}

class MyWindowPortal extends React.PureComponent {

    constructor(props) {
        super(props);
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }

    componentDidMount() {
        this.externalWindow = window.open('', '', 'width=595,height=842,left=200,top=200');
        copyStyles(document, this.externalWindow.document);
        this.externalWindow.document.body.appendChild(this.containerEl);
    }

    componentWillUnmount() {
        this.externalWindow.close();
    }
}

export default MyWindowPortal