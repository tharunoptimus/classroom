



// Don't touch this. I don't know what it does. 
// But without this, the createClass Button in the home page goes down on modal close
$("#createClass").on("hidden.bs.modal", () =>
    $("#createClass").css
);


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
                    let classId = data.classId;
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