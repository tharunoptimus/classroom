$(document).ready(() => {
    console.log("common.js loaded");
    if(!userLoggedIn.ownerOf.includes(classObject._id)) {
        $(".cogIcon").remove();
    }
});


// Don't touch this. I don't know what it does. 
// But without this, the createClass Button in the home page goes down on modal close
$("#createClass").on("hidden.bs.modal", () =>
    $("#createClass").css
);

// Top Bar Navigation - I don't know why I did this instead of adding a href to the <a> but this looks good too
$(document).on('click', '#stream', function() {
    window.location.href = '/class/' + classObject._id;
});
$(document).on('click', '#assignments', function() {
    window.location.href = '/class/' + classObject._id + '/assignments';
});
$(document).on('click', '#people', function() {
    window.location.href = '/class/' + classObject._id + '/people';
});
$(document).on('click', '#tests', function() {
    window.location.href = '/class/' + classObject._id + '/tests';
});

$(document).on("click", "#confirmCreateClass", () => {
    let input = $("#createClassPromptModal").find("input");
    let value = input.val().trim();
    if (value === "") { 
        alert("Please enter a class name");
        $("#createClassPromptModal").modal("hide");
        return;
    }
    else {
        $.post("/api/class/create", { className: value }, (data, status, xhr) => {
            if (status === "success") {   
                $("#createClassPromptModal").modal("hide");
                
                location.reload();
            } 
            else {
                alert("Failed to create class");
                $("#createClassPromptModal").modal("hide");
            }
        })
    }
})

$(document).on("click", "#confirmJoinButton", () => {
    
    let input = $("#joinClassPromptModal").find("input");
    let value = input.val().trim();
    if (value === "") {   
        alert("Please enter a class name");
        $("#joinClassPromptModal").modal("hide");
        return;
    }
    else {
        $.ajax({
            url: "/api/class/join",
            type: "PUT",
            data: { classId: value },
            success: (data, status, xhr) => {
                if (status === "success") {
                    let classId = data._id;
                    location.href = `/class/${classId}`;
                }
                else {
                    alert("Failed to join class");
                    $("#joinClassPromptModal").modal("hide");
                }
            }
        })
    }
})


function timeDifference(current, previous) {
	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;

	var elapsed = current - previous;

	if (elapsed < msPerMinute) {
		if (elapsed / 1000 < 30) return "Just now";
		return Math.round(elapsed / 1000) + "s";
	} else if (elapsed < msPerHour) {
		return Math.round(elapsed / msPerMinute) + "m";
	} else if (elapsed < msPerDay) {
		return Math.round(elapsed / msPerHour) + "h";
	} else if (elapsed < msPerMonth) {
		return Math.round(elapsed / msPerDay) + "d";
	} else if (elapsed < msPerYear) {
		return Math.round(elapsed / msPerMonth) + "month";
	} else {
		return Math.round(elapsed / msPerYear) + "y";
	}
}