import React from 'react';

const STAT_URL = 'https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f7333' +
    '2e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f30303732303' +
    '02e706e67';

function btnUrl(type) {
    return `http://ghbtns.com/github-btn.html?user=mir3z&repo=react-virtual-list&type=${type}&count=true`;
}

export default React.createClass({

    render() {
        return (
            <div className='meta'>
                <div className='badges'>
                    <iframe
                        src={ btnUrl('watch') }
                        allowtransparency='true' frameborder='0' scrolling='0' width='110' height='20'>
                    </iframe>

                    <iframe
                        src={ btnUrl('fork') }
                        allowtransparency='true' frameborder='0' scrolling='0' width='110' height='20'>
                    </iframe>

                    <iframe
                        src={ btnUrl('follow') }
                        allowtransparency='true' frameborder='0' scrolling='0' width='110' height='20'>
                    </iframe>
                    <div className='copy'>
                        React VirtualList is licensed under MIT.<br/>
                        Copyright © 2016 by mirz. All Rights Reserved.
                    </div>
                </div>
                <a href='https://github.com/mir3z/react-virtual-list'>
                    <img style={{ position: 'absolute', top: 0, right: 0, border: 0 }}
                         src={ STAT_URL }
                         alt='Fork me on GitHub'
                         data-canonical-src='https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png'
                    />
                </a>
            </div>
        );
    }
});