

export const checkSubscription = (study, subscriptions) => {
    return subscriptions.some(subscription => subscription.StudyID === study?.ID);
};

export const getRegionDescription = (study, regions) => {
    if(study) {
        return regions.find(region => region.ID === study.RegionID)?.Name;
    } else {
        return "-";
    }
};

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const getMonthName = month => {
    return monthNames[month];
}

export const getCurrentMonth = (numberMonthInThePast = 0) => {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth() - numberMonthInThePast;

    if (currentDate.getDate() < 6) {
        currentMonth--;
    }

    if (currentMonth < 0) {
        return 12 + currentMonth;
    } else {
        return currentMonth;
    }
};