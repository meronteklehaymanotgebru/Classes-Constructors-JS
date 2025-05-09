function FeatureToggle(featureTitle, isActive, userGroups) {
    this.featureTitle = featureTitle;
    this.isActive = isActive;
    this.userGroups = userGroups;
}
FeatureToggle.prototype.canAccess = function(role) {
    return this.userGroups.includes(role);
};
FeatureToggle.prototype.toggleFeature = function(newState) {
    this.isActive = newState;
};
// 2
function TimeTracker(freelancerName, projectDetails) {
    this.freelancerName = freelancerName;
    this.projectDetails = projectDetails;
    this.timeEntries = [];
}
TimeTracker.prototype.addEntry = function(date, hoursWorked) {
    this.timeEntries.push({ date, hoursWorked });
};
TimeTracker.prototype.calculateTotalEarnings = function() {
    return this.timeEntries.reduce((total, entry) => {
        return total + (entry.hoursWorked * this.projectDetails.hourlyRate);
    }, 0);
};
TimeTracker.prototype.getEntriesInDateRange = function(startDate, endDate) {
    return this.timeEntries.filter(entry => {
        const logDate = new Date(entry.date);
        return logDate >= new Date(startDate) && logDate <= new Date(endDate);
    });
};
TimeTracker.prototype.hasExceededWeeklyHours = function() {
    const currentWeekEntries = this.timeEntries.filter(entry => {
        const logDate = new Date(entry.date);
        const weekStart = new Date(logDate);
        weekStart.setDate(logDate.getDate() - logDate.getDay());
        return logDate >= weekStart && logDate < new Date(weekStart).setDate(weekStart.getDate() + 7);
    });
    const totalHours = currentWeekEntries.reduce((sum, entry) => sum + entry.hoursWorked, 0);
    return totalHours > 40;
};
// 3
function Order(customerInfo, itemsList) {
    this.customerInfo = customerInfo;
    this.itemsList = itemsList;
    this.status = "Pending";
}
Order.prototype.calculateTotalCost = function() {
    return this.itemsList.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
};
Order.prototype.updateStatus = function(paymentReceived) {
    this.status = paymentReceived ? "Paid" : "Pending";
};
Order.prototype.getUrgencyCategory = function() {
    switch (this.status) {
        case "Paid":
            return "Order confirmed.";
        case "Pending":
            return "Awaiting payment.";
        default:
            return "Status unknown.";
    }
};
// 4
function Employee(id, name, performanceMetrics) {
    this.id = id;
    this.name = name;
    this.performanceMetrics = performanceMetrics;
    this.feedbackList = [];
}
Employee.prototype.calculateAverageScore = function() {
    const scores = Object.values(this.performanceMetrics);
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    return totalScore / scores.length;
};
Employee.prototype.getPerformanceLevel = function() {
    const averageScore = this.calculateAverageScore();
    if (averageScore >= 4.5) {
        return "Excellent";
    } else if (averageScore >= 3.5) {
        return "Good";
    } else {
        return "Needs Improvement";
    }
};
Employee.prototype.addFeedback = function(comment) {
    if (comment) {
        this.feedbackList.push(comment);
    }
};
// 5
function Course(title, instructor) {
    this.title = title;
    this.instructor = instructor;
    this.enrolledStudents = [];
}
Course.prototype.addStudent = function(student) {
    this.enrolledStudents.push(student);
};
Course.prototype.getCompletedStudentNames = function() {
    return this.enrolledStudents
        .filter(student => student.completionStatus)
        .map(student => student.name);
};
Course.prototype.countStudentsByExpertise = function() {
    const expertiseCounts = {};
    this.enrolledStudents.forEach(student => {
        const expertise = student.expertise;
        if (!expertiseCounts[expertise]) {
            expertiseCounts[expertise] = 0;
        }
        expertiseCounts[expertise]++;
    });
    return expertiseCounts;
};
Course.prototype.instructorMessage = function() {
    return this.enrolledStudents.length > 5
        ? "You have a full class!"
        : "Consider recruiting more students.";
};