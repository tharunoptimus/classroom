let isOwnerForAssignments = userLoggedIn.ownerOf.includes(classObject._id) ? true : false;

$(document).ready(async () => {
    $("#tests").addClass("selectedTabsDiv");
    
    if(isOwnerForAssignments) {
        $(".gridPlaceCenter").html(renderCreateAssignmentButton());
        $(".tipsBlockContainer").append(renderTipsForOwner());
        await $.get(`/api/tests/${classObject._id}/all`, (data) => {
            if(data.tests.length < 0) return
            let html = renderAssignment(data.tests, true)
            $(".assignments").html(html);
        });
    }
    else {
        $(".tipsBlockContainer").append(renderTipsForStudent());
        await $.get(`/api/tests/${classObject._id}/all`, (data) => {
            let arrayToShow = [];
            data.tests.forEach(test => {
                if(!userLoggedIn.tests.includes(test._id)) {
                    arrayToShow.push(test);
                }
            })
            
            let html = renderAssignment(arrayToShow, false)
            $(".assignments").html(html)
            let button = `<button class="goodAjaxButton loadPreviousAssignments">Load Completed Tests</button>`;
            $(".previousAssignments").html(button)
        })
    }
});



function renderTipsForOwner () {
    let html = `<div class="tipsBlock">
        <div class="tipsBlockHeader">
            <p class="standardText">Assign test to your class here</p>
        </div>
        <div class="tipsBlockBody">
            <div class="tipsBlockSubBody">
                <div class="svgContainer"> <svg class="svg-inline--fa fa-clipboard-list fa-w-12" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clipboard-list" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
                    </svg></div>
            </div><span>Create Tests and reward marks!</span>
        </div>
    </div>`

    return html
}

function renderTipsForStudent () {
    let html = `<div class="tipsBlock">
        <div class="tipsBlockHeader">
            <p class="standardText">Take care of your Tests</p>
        </div>
        <div class="tipsBlockBody">
            <div class="tipsBlockSubBody">
                <div class="svgContainer"> <svg class="svg-inline--fa fa-clipboard-check fa-w-12" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clipboard-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm121.2 231.8l-143 141.8c-4.7 4.7-12.3 4.6-17-.1l-82.6-83.3c-4.7-4.7-4.6-12.3.1-17L99.1 285c4.7-4.7 12.3-4.6 17 .1l46 46.4 106-105.2c4.7-4.7 12.3-4.6 17 .1l28.2 28.4c4.7 4.8 4.6 12.3-.1 17z"></path>
                    </svg></div>
            </div><span>Complete and get your marks!</span>
        </div>
    </div>`

    return html
}

function renderCreateAssignmentButton () {
    return `<button class="goodAjaxButton" style="outline:none;" id="createAnAssignment" data-toggle="modal" data-target="#createAssignmentModal">Create an Test</button>`
}

function renderAssignment (data, isOwner) {
    let html = ""
    data.reverse().forEach(test => {

        let buttonClass = isOwner ? "seeMoreDetailsButton" : "turnInAssignmentButton"
        let buttonContent = isOwner ? "See More Details" : "Turn In Assignment"

        html += `<div class="assignmentContainer">
        <div class="assignmentTitle" data-id="${test._id}">
            <p class="assignmentTitlePara">${test.name}</p><span class="assignmentTotalMarks">${test.assignedMarks}</span>
        </div>
        <div class="assignmentBody">
            <div class="assignmentBodyHolder">
                <p class="assignmentDescription">${test.description}</p>
                <a class="assignmentLink" href="${test.link}">Link to the assignment</a>
                <button class="goodAjaxButton ${buttonClass}">${buttonContent}</button>
            </div>
        </div>
    </div>`
    })

    return html
}

function renderCompletedAssignment (data) {
    let html = ""
    data.reverse().forEach(task => {

        let taskStatus = task.marksScored == 0 ? "Not yet graded" : `${task.marksScored}/${task.assignmentId.assignedMarks}`
        html += `<div class="assignmentContainer">
        <div class="assignmentTitle" data-id="${task._id}">
            <p class="assignmentTitlePara">${task.assignmentId.name}</p>
        </div>
        <div class="assignmentBody">
            <div class="assignmentBodyHolder">
                <p class="assignmentDescription">${task.assignmentId.description}</p>
                <a class="assignmentLink" href="${task.assignmentId.link}">Link to the assignment</a>
                <span class="assignmentStatus">${taskStatus}</span>
            </div>
        </div>
    </div>`
    })

    return html
}


$(document).on('click', '#confirmCreateAssignment', function () {
    let name = $('#createAssignmentModal').find('#assignmentTitleInput').val().trim()
    let description = $('#createAssignmentModal').find('#assignmentTitleDescriptionInput').val().trim()
    let link = $('#createAssignmentModal').find('#assignmentLinkInput').val().trim()
    let assignedMarks = parseInt($('#createAssignmentModal').find('#assignmentMarkInput').val().trim())
    
    if(!checkUrl(link)) return alert("Please verify that the Link is a valid link")
    if(!name || !description || !link || !assignedMarks) return alert("Please fill all the fields")

    let data = {
        classId: classObject._id,
        name: name,
        description: description,
        link: link,
        assignedMarks: assignedMarks
    }

    $.post('/api/tests/create', data, (data, status, xhr) => {
        
        if(xhr.status == 201) {
            let html = renderAssignment([data], true)
            $('.assignments').prepend(html)
            $('#createAssignmentModal').modal('hide')
            
            $('#createAssignmentModal').find('#assignmentTitleInput').val('')
            $('#createAssignmentModal').find('#assignmentTitleDescriptionInput').val('')
            $('#createAssignmentModal').find('#assignmentLinkInput').val('')
            $('#createAssignmentModal').find('#assignmentMarkInput').val('')
        }
        else {
            alert("Something went wrong")
        }

        
    })
})

// function to check whether the given string is a url or not
function checkUrl (string) {
    let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(string)
}


$(document).on('click', '.assignmentTitle', function () {
    $(this).parent().find('.assignmentBody').fadeToggle()
    $(this).parent().toggleClass('selectedAssignment')
})


$(document).on('click', '.turnInAssignmentButton', function () {
    let assignmentId = $(this).parent().parent().parent().find('.assignmentTitle').attr('data-id')
    let data = {
        classId: classObject._id,
        assignmentId: assignmentId,
        userId: userLoggedIn._id
    }
    $.ajax({
        url: '/api/tests/submit',
        method: 'PUT',
        data: data,
        success: (data, status, xhr) => {
            if(xhr.status == 201) {
                alert("Submitted Successfully!")
                location.reload()
            }
            else {
                alert("Something went wrong")
            }
        }
    })
})

$(document).on('click', '.seeMoreDetailsButton', function () {
    let assignmentId = $(this).parent().parent().parent().find('.assignmentTitle').attr('data-id')
    let url = `/test/${classObject._id}/${assignmentId}`
    window.location.href = url
})



$(document).on('click', '.loadPreviousAssignments', async () => {
    await $.get(`/api/tests/${classObject._id}/submitted`, (data, xhr, status) => {
        let html = renderCompletedAssignment(data)
        $(".previousAssignments").html(html)
    })
})