let totalPostsVisible = 0;

$(document).ready( async () => {
    await fetchMessages(true)
});

$(document).on('click', '#seeMoreMessagesButton', async () => {
    await fetchMessages()
})

$(document).on('click', '#stream', function() {
    window.location.href = '/class/' + classObject._id;
});

$('.className').text(classObject.className);

$('.classOwnerDisplay').text(classObject.owners[0].firstName + ' ' + classObject.owners[0].lastName);

$("#stream").addClass("selectedTabsDiv");

$(document).on('keydown', '#announcementText', async (event) => {
    if(event.which === 13 && !event.shiftKey) {
        await sendMessage()
        return false;
    }
})

$(document).on('click', '#sendMessageButton', async () => {
    await sendMessage()
})

async function fetchMessages(initial = false) {
    let classId = classObject._id
    await $.get(`/api/messages/${classId}/${totalPostsVisible}/5`, (data, status, xhr) => {
        if (xhr.status === 0) {
            return alert("Please connect to the Internet and try again!")
        }
        if (xhr.status !== 200) {
            return alert("Something went wrong, try reloading the page!")
        }
        let html = generateMessagesHtml(data)
        initial ? $('.messages').html(html) : $('.messages').prepend(html)
    })
}

async function sendMessage() {
    let content = $('#announcementText').val().trim()
    let classId = classObject._id;
    if (content === '') return;

    await $.post('/api/messages', { content, classId })
    .then(function(data) {
        $('#announcementText').val('');
        let html = generateMessagesHtml([data])
        $('.messages').append(html)
    });
}

function generateMessagesHtml (messages) {
    let html = ""
    messages.reverse().forEach(message => {
        
        let name = message.sender.firstName + " " + message.sender.lastName
        var timestamp = timeDifference(new Date(), new Date(message.createdAt))
        let isOwnerMessage = message.isOwner ? `style="background-color: var(--bgByOwner);"` : ""

        html += `<div class="messageContainer" ${isOwnerMessage}>
                    <div class="profileContainer">
                        <img src="${message.sender.profilePic}" alt="Profile Picture">
                    </div>
                    <div class="message">
                        <p class="senderName">
                            <span class="standardTextEllipses whiteSpaceBreakSpace">${name}</span>
                            <span>&nbsp; ⌚ &nbsp;</span>
                            <span class="standardTextEllipses whiteSpaceBreakSpace">${timestamp}</span>
                        </p>
                        <p class="messageText">
                            <span class="standardTextEllipses whiteSpaceBreakSpace">${message.content}</span>
                        </p>
                    </div>
                </div>`
    })
    totalPostsVisible += messages.length
    return html
}