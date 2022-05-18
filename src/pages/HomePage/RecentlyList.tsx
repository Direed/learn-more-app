import React from "react";

const RecentlyList = ({recentlyItems}: any) => {
    const recentlyListMap = recentlyItems.map((recentlyItem: any) => (
        <div className='RecentlyItem'>
            <div className='RecentlyItem--itemWrapper'>
                <p>{recentlyItem.subject}</p>
            </div>
            <div className='RecentlyItem--itemWrapper'>
                <p>{recentlyItem.topic}</p>
            </div>
            <div className='RecentlyItem--itemWrapper'>
                <div>
                    <div>

                    </div>
                </div>
                <p>{recentlyItem.progress}</p>
            </div>
        </div>
    ))

    return (
        <div className='RecentlyList'>
            {recentlyListMap}
        </div>
    )
}

export default RecentlyList;
