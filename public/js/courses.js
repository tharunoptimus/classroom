$(document).ready(function () {
    $.get("/api/class", function (data) {
        $(".cardsContainer").html(createClassCard(data));
    })
});

function createClassCard(data) {
    let html = ""

    data.forEach(element => {
        let ownerName = element.owners[0].firstName + " " + element.owners[0].lastName;
        html += `
        <div class="classCard">
            <a href="/class/${element._id}" style="text-decoration: none; color: black;">
                <div class="classCardHeader">
                    <span class="className">${element.className}</span>
                    <span class="classCode">${element.classId}</span>
                </div>
            </a>
            <div class="classCardBody">
                <div class="classCardBodyContent">
                    <span class="classOwner">${ownerName}</span>
                    <span class="classOwner">${element.students.length} Students</span>
                </div>
                <div class="classCardBodyIcons">
                    <div class="svgContainer">
                        <a href="/class/${element.classId}/people" aria-label="Link to the List of Students">
                            <div class="svgContainerDiv">
                                <svg class="svg-inline--fa fa-users fa-w-20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"> </path>
                                </svg>
                            </div>
                        </a>
                        <a href="/class/${element.classId}/assignments" aria-label="Link to the List of Assignments">
                            <div class="svgContainerDiv">
                                <svg class="svg-inline--fa fa-sticky-note fa-w-14" aria-hidden="true" focusable="false" data-prefix="far" data-icon="sticky-note" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M448 348.106V80c0-26.51-21.49-48-48-48H48C21.49 32 0 53.49 0 80v351.988c0 26.51 21.49 48 48 48h268.118a48 48 0 0 0 33.941-14.059l83.882-83.882A48 48 0 0 0 448 348.106zm-128 80v-76.118h76.118L320 428.106zM400 80v223.988H296c-13.255 0-24 10.745-24 24v104H48V80h352z"></path>
                                </svg>
                            </div>
                        </a>
                        <a href="/class/${element.classId}/tests" aria-label="Link to the Grades">
                            <div class="svgContainerDiv">
                                <svg class="svg-inline--fa fa-chart-line fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-line" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"></path>
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `
    })

    return html;
}