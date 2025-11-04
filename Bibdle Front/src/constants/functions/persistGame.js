export function persistItem(itemName, itemInfo) {
    localStorage.setItem(itemName, JSON.stringify(itemInfo));   
}

export function resetLsAtMidnight() {
    const lastReset = localStorage.getItem("lastResetDate");
    const now = new Date();

    const todayDate = now.toISOString().split("T")[0];

    if (lastReset !== todayDate) {
        localStorage.clear();
        localStorage.setItem("lastResetDate", todayDate)
    }
}