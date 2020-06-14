//scrape articles 

$(document).on("click", "#scrape-button", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    window.location.replace("/scrape");
});

//delete an article
$(document).on("click", ".delete-article", function () {
    let thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/saved/" + thisId
    }).then(function (data) {
        console.log(data);
        location.reload();
    });
});

//save an article
$(document).on("click", ".save-article", function () {
    let thisId = $(this).attr("data-id");
    $(this).hide();
    let data = {}
    data.title = $("#title-" + thisId).text();
    data.link = $("#link-" + thisId).text();
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "/api/saved",
        data: data
    })
});

//go to the notes page to retrieve a particular article
$(document).on("click", ".note-comment", function () {
    let thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    window.location.replace("/articles/" + thisId);
});

//Add a note
$(document).on("click", "#submit-note", function () {
    let thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("title-note").val(),
            body: $("#note-description").val()

        }
    }).then(function (data) {
        console.log(data);
        window.location.replace("/articles/" + data._id);
    });
    $("#title-note").val("");
    $("#note-description").val("");
});

//delete a note
$(document).on("click", ".delete-note", function () {
    let thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/articles/" + thisId
    }).then(function (data) {
        console.log(data);
        location.reload();
    });
});