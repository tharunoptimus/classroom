let allottedMarks = 0

$(document).ready(async () => {

    $("#assignments").addClass("selectedTabsDiv");

    await $.get(`/api/assignment/${assignmentObject._id}`, (data) => {
        let html = showAssignmentDetails(data)
        $(".assignmentDetails").html(html)
    })
    
    await $.get(`/api/assignment/${classObject._id}/${assignmentObject._id}/submissions`, (data) => {
        let html = renderAssignmentSubmit(data)
        $(".completedAssignments").html(html)
    })

})

$(document).on('click', '.assignmentTitle', function () {
    $(this).parent().find('.assignmentBody').fadeToggle()
    $(this).parent().toggleClass('selectedAssignment')
})


function renderAssignmentSubmit (data) {
    let html = ""

    data.forEach(task => {
        let name = task.userId.firstName + " " + task.userId.lastName
        var date = timeDifference(new Date(), new Date(task.createdAt))

        html += `<div class="assignmentContainer">
                    <div class="assignmentTitle" data-id="${task._id}"> 
                    <p class="returnedStudentName">${name}</p>
                        <span class="rewardedMark">⌚ ${date} ago</span>
                    </div>
                    <div class="assignmentBody">
                        <input class="inputMarks" type="text" placeholder="Enter Marks" />
                        <button class="goodAjaxButton submitMarks">Submit</button>
                    </div>
                </div>`
    })

    return html
}

function renderAssignmentReturn (data) {
    let html = ""

    data.forEach(task => {
        let name = task.userId.firstName + " " + task.userId.lastName
        var date = timeDifference(new Date(), new Date(task.updatedAt))

        html += `<div class="assignmentContainer">
                    <div class="assignmentTitle">
                        <p class="returnedStudentName">${name}</p>
                        <span class="rewardedMark">25/${allottedMarks}</span>
                    </div>
                </div>`
    })

    return html
}


$(document).on('click', "#returned", async () => {
    $.get(`/api/assignment/${classObject._id}/${assignmentObject._id}/returned`, (data) => {
        let html = renderAssignmentReturn(data)
        $(".returnedAssignments").html(html)
        $("#returned").remove()
    })
})

$(document).on('click', '.submitMarks', async (event) => {
    let id = $(event.target).parent().parent().find('.assignmentTitle').data('id')
    let mark = $(event.target).parent().find('.inputMarks').val()
    if(mark == "") return;
    let data = {
        classId: classObject._id,
        assignmentId: assignmentObject._id,
        taskId: id,
        mark: mark
    }
    $.ajax({
        url: `/api/assignment/return`,
        method: 'PUT',
        data: data,
        success: () => {
            location.reload()
        }
    })
})

function showAssignmentDetails (assignment) {
    allottedMarks = assignment.assignedMarks
    let html = ""
    html += `<div class="assignmentContainer">
        <div class="assignmentTitle" data-id="${assignment._id}">
            <p class="assignmentTitlePara">Assignment Details</p>
        </div>
        <div class="assignmentBody">
            <div class="assignmentBodyHolder">
                <p class="assignmentDescription">${assignment.name}</p>
                <p class="assignmentDescription">${assignment.description}</p>
                <a class="assignmentLink" href="${assignment.link}">Link to the assignment</a>
                <span>Assigned Marks: ${assignment.assignedMarks}</span>
                <div class="submissionDetails">
                    <span>
                        <p class="numeral"> 1 </p>
                        <p class="subNumeral"> Submitted </p>
                    </span>
                    <span>
                        <p class="numeral"> 4 </p>
                        <p class="subNumeral"> Remaining </p>
                    </span>
                </div>
            </div>
        </div>
    </div>`

    return html
}