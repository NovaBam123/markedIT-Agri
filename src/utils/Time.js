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
    const now= Date.now();
    const diffInSecond= Math.floor((now-epochTime)/ 1000);
    if(diffInSecond< 60) return "just now"
    
    const diffInMinute= Math.floor(diffInSecond/ 60);
    if(diffInMinute< 60) return `${diffInMinute}m ago`;

    const diffInHours= Math.floor(diffInMinute/ 60);
    if(diffInHours< 24) return `${diffInHours}h ago`;

    const diffInDays= Math.floor(diffInHours/ 24);
    if(diffInDays< 7) return `${diffInDays}d ago`

    const diffInMonths= Math.floor(diffInDays/ 30);
    if(diffInDays< 12) return `${diffInMonths}mo ago`;

    const diffInYears= Math.floor(diffInDays/ 365);
    return `${diffInYears}y ago`;
}