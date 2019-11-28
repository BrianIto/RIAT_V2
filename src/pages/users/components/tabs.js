import React from "react";
import "../styles/tabs.sass"

const Tabs = (props) => (
    <div className={'tabs'} style={{display: 'flex', width: '103.5%', textAlign: 'center'}}>
        {
            props.tabsData.map((tab, index) => (
                <div className={ props.tabSelected === index ? 'tab tab_selected' : 'tab'}
                     key={index} onClick={() => props.selectTab(index)}
                     style={{width: '100%'}}>
                    <h4>{tab.name}</h4>
                </div>
            ))
        }
    </div>
)

export default Tabs