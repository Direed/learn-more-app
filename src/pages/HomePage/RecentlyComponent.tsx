import React from "react";
import RecentlyList from "./RecentlyList";

const RecentlyComponent = ({recentlyItems}: any) => {
    return (
        <div className='RecentlyComponent'>
            <div className='RecentlyComponent--titleWrapper'>
                <a>Recently opened</a>
                <button>View all</button>
            </div>
            <div className='RecentlyComponent--tabsWrapper'>
                <div>Subject</div>
                <div>Topic</div>
                <div>Cumulative score</div>
            </div>
            <RecentlyList recentlyItems={recentlyItems}/>
        </div>
    )
}

export default RecentlyComponent
