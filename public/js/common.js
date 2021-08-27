



// Dont touch this. I don't know what it does. But without this, the createClass Button in the home page goes down on modal close
$("#createClass").on("hidden.bs.modal", () =>
    $("#createClass").css
);

// onclicking the button on the document, do something
$(document).on("click", "#confirmCreateClass", () => {
    // find the input field in this modal
    const input = $("#createClassPromptModal").find("input");
    // get the value of the input field
    const value = input.val().trim();
    // if the value is empty
    if (value === "") {
        // show alert box and close the modal
        alert("Please enter a class name");
        $("#createClassPromptModal").modal("hide");
        return;
    }
    // if the value is not empty
    else {
        // send an ajax post to the server at the api end point /api/class/create to with the body of the value as className
        $.post("/api/class/create", { className: value }, (data, status, xhr) => {
            // if the status is success
            if (status === "success") {
                // hide the modal
                $("#createClassPromptModal").modal("hide");
                // reload the page
                location.reload();
            }
            // if the status is not success
            else {
                // show alert box and close the modal
                alert("Failed to create class");
                $("#createClassPromptModal").modal("hide");
            }
        })
    }
})