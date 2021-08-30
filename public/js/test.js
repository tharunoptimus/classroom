let allottedMarks = 0

$(document).ready(async () => {

    $("#tests").addClass("selectedTabsDiv");

    await $.get(`/api/test/${assignmentObject._id}`, (data) => {
        let html = showTestDetails(data)
        $(".assignmentDetails").html(html)
    })
    
    await $.get(`/api/test/${classObject._id}/${assignmentObject._id}/submissions`, (data) => {
        let html = renderTestSubmit(data)
        $(".completedAssignments").html(html)
    })

})

$(document).on('click', '.assignmentTitle', function () {
    $(this).parent().find('.assignmentBody').fadeToggle()
    $(this).parent().toggleClass('selectedAssignment')
})


function renderTestSubmit (data) {
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
        let mark = task.marksScored

        html += `<div class="assignmentContainer">
                    <div class="assignmentTitle">
                        <p class="returnedStudentName">${name}</p>
                        <span class="rewardedMark">${mark}/${allottedMarks}</span>
                    </div>
                </div>`
    })

    return html
}


$(document).on('click', "#returned", async () => {
    $.get(`/api/test/${classObject._id}/${assignmentObject._id}/returned`, (data) => {
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
        url: `/api/test/return`,
        method: 'PUT',
        data: data,
        success: () => {
            location.reload()
        }
    })
})


function showTestDetails (test) {
    allottedMarks = test.assignedMarks
    let completed = parseInt(test.completedBy.length)
    let remaining = parseInt(classObject.students.length) - completed
    let html = ""
    html += `<div class="assignmentContainer">
        <div class="assignmentTitle" data-id="${test._id}">
            <p class="assignmentTitlePara">Test Details</p>
        </div>
        <div class="assignmentBody">
            <div class="assignmentBodyHolder">
                <p class="assignmentDescription">${test.name}</p>
                <p class="assignmentDescription">${test.description}</p>
                <a class="assignmentLink" href="${test.link}">Link to the test</a>
                <span>Assigned Marks: ${test.assignedMarks}</span>
                <div class="submissionDetails">
                    <span>
                        <p class="numeral"> ${completed} </p>
                        <p class="subNumeral"> Submitted </p>
                    </span>
                    <span>
                        <p class="numeral"> ${remaining} </p>
                        <p class="subNumeral"> Remaining </p>
                    </span>
                </div>
            </div>
        </div>
    </div>`

    return html
}