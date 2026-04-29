let options= {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}

export function getFormattedTime() {
    const now= new Date();
    now.setMinutes(now.getMinutes());

    const date= now.toLocaleDateString('en-US', options);
    const time= now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    })
    return {date, time};
}
export const getRelativeTime=(epochTime) => {
    if(!epochTime || isNaN(epochTime)) return "N/A";
    const now= Date.now();
    if(epochTime > now) return "just now";
    const diffInSecond= Math.floor((now-epochTime)/ 1000);
    if(diffInSecond< 60) return "just now"
    
    const diffInMinute= Math.floor(diffInSecond/ 60);
    if(diffInMinute< 60) return `${diffInMinute}m ago`;

    const diffInHours= Math.floor(diffInMinute/ 60);
    if(diffInHours< 24) return `${diffInHours}h ago`;

    const diffInDays= Math.floor(diffInHours/ 24);
    if(diffInDays< 30) return `${diffInDays}d ago`

    const diffInMonths= Math.floor(diffInDays/ 30);
    if(diffInMonths< 12) return `${diffInMonths}mo ago`;

    const diffInYears= Math.floor(diffInMonths/ 12);
    return `${diffInYears}y ago`;
}